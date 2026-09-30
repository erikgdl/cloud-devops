# 06 — Deploy e GHCR

## Do código ao serviço publicado

Deploy é a aplicação de uma versão no ambiente em que ela será utilizada. No `cloud-devops`, o código é compilado e empacotado pelo GitHub Actions; a VPS baixa a imagem resultante e atualiza o container.

O gatilho é **push na `master`**, incluindo o push produzido pelo merge de um PR. Um commit apenas local, um push para feature branch ou a abertura de PR não publicam por esse gatilho. O trabalho com branches e a validação estão em [Git e CI/CD](10-processo-ci-cd.md).

## O que é o GHCR e por que ele faz parte do fluxo?

**GHCR** significa GitHub Container Registry. É um registro que armazena imagens de containers e permite publicá-las e baixá-las com autenticação e permissões de acesso. Neste projeto, ele é o ponto de distribuição entre o build do Actions e a execução na VPS. Referência: [registro de containers do GitHub](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

As três peças têm responsabilidades diferentes:

| Peça | O que contém ou executa |
| --- | --- |
| Repositório GitHub | Código-fonte, histórico, Dockerfile, Compose e workflows |
| GHCR | Imagem construída, pronta para ser baixada |
| Docker na VPS | Container criado a partir da imagem |

O GHCR não atende os visitantes do site. Ele guarda o artefato usado para iniciar a aplicação. A VPS recebe a imagem pronta e não precisa executar `npm ci` ou compilar o React para cada deploy.

## Endereço da imagem

```text
ghcr.io/erikgdl/cloud-devops:latest
│       │       │            └─ tag usada pelo deploy
│       │       └─ nome da imagem
│       └─ namespace do proprietário
└─ endereço do registro
```

`latest` é uma etiqueta que o workflow atualiza ao publicar. Ela não procura automaticamente a melhor versão nem guarda uma associação permanente com um commit. **Fazer push da imagem no GHCR ainda não atualiza o container:** a VPS precisa executar o pull e aplicar o Compose.

O pacote utiliza acesso autenticado. No CD, `GITHUB_TOKEN` autoriza as operações com o GHCR; a chave SSH autoriza a conexão à VPS. São credenciais diferentes para serviços diferentes.

## Etapas do deploy automático

1. **Obter o código:** o runner faz checkout da revisão acionada na `master`.
2. **Autenticar no registro:** o workflow faz login no GHCR.
3. **Construir e publicar:** o Dockerfile gera a imagem e o workflow faz push de `ghcr.io/erikgdl/cloud-devops:latest`.
4. **Preparar o SSH:** o runner reconstrói a chave de automação e configura seu uso.
5. **Enviar a configuração:** cria `~/devops-app` e copia `compose.prod.yaml` como `~/devops-app/compose.yaml`.
6. **Atualizar a aplicação:** conecta como `deploy`, autentica o Docker remoto no GHCR e executa `docker compose pull` e `docker compose up -d`, com `IMAGE_NAME` definida.
7. **Limpar imagens pendentes:** depois da atualização, executa `docker image prune -f`.

`pull` baixa a imagem; `up -d` aplica a configuração e recria o container quando necessário, mantendo-o em segundo plano. `docker restart`, por sua vez, reinicia o container existente e não o substitui por uma imagem recém-publicada.

## Atualização manual equivalente

Em uma intervenção de manutenção, conecte à VPS como `deploy`. O Compose de produção deve estar em `~/devops-app/compose.yaml`, e a conta deve ter autenticação vigente no GHCR:

```bash
cd ~/devops-app
export IMAGE_NAME=ghcr.io/erikgdl/cloud-devops:latest
docker compose config --quiet && docker compose pull && docker compose up -d
```

O exemplo utiliza Bash e valida o Compose antes de atualizar. A credencial utilizada em um job anterior pode ter expirado: se o pull for negado, confira autenticação e permissão de leitura do pacote. Na automação, o login usa `--password-stdin`, sem registrar o valor do token no comando.

## Conferir o resultado

Na mesma sessão:

```bash
docker compose ps
docker logs --tail 100 devops-site
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/
curl -sS -o /dev/null -w '%{http_code}\n' https://devops.erikgdl.xyz/
```

Para a página principal, espere o container ativo e resposta `200` nas consultas local e pública. Abra também a interface e acompanhe uma verificação saudável no Kuma. Essas verificações compõem a conferência operacional; não são etapas automáticas do CD atual.

## Comportamento e limites

CI e CD são independentes. No fluxo por PR, o CI deve ser conferido antes do merge; o CD disparado pelo push na `master` não espera o CI desse mesmo push.

O prune remove imagens sem tag que não estejam em uso; não é uma estratégia de rollback. A publicação usa uma tag mutável e não oferece rollback automático ou garantia de atualização sem interrupção. Se o job falhar depois de publicar e antes de atualizar, o registro e o container podem representar versões diferentes. Confira a etapa que falhou antes de repetir a operação.

## Evidência

![Imagem do GHCR executada pelo container devops-site na VPS](evidencias/03-docker-containers.png)
![Imagem cloud-devops publicada no GHCR com a tag latest](evidencias/10-ghcr-imagem.png)

[Índice](README.md) · [Configuração Docker](07-configuracao-docker.md)
