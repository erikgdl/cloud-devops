# 06 — Processo de deploy

## Fluxo implementado
Um push em `master` dispara o workflow [cd.yml](../.github/workflows/cd.yml). O runner constrói a imagem, publica no GHCR, prepara o acesso SSH e atualiza o serviço na VPS.

A imagem é `ghcr.io/erikgdl/cloud-devops:latest`. No workflow, esse endereço é calculado a partir de `github.repository`.

## Publicação e transferência
Os comandos de construção e publicação usados pelo CD são:
```bash
IMAGE_NAME="ghcr.io/${{ github.repository }}:latest"
docker build -t "$IMAGE_NAME" .
docker push "$IMAGE_NAME"
```
As expressões `${{ ... }}` são interpoladas pelo GitHub Actions, não pelo terminal local.

O CD cria `~/devops-app` por SSH e envia:
```bash
scp compose.prod.yaml \
  ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }}:~/devops-app/compose.yaml
```
O arquivo remoto passa a se chamar `compose.yaml`, mas mantém a configuração do `compose.prod.yaml`.

## Atualização na VPS
O workflow autentica o Docker remoto no GHCR com `--password-stdin`, encaminhando o token pela entrada padrão da sessão SSH. Nenhum valor de token deve ser transcrito para a documentação.

O trecho remoto usa a variável de imagem em cada invocação do Compose. Equivalente com o endereço concreto, para uma sessão Bash já autenticada no GHCR:
```bash
cd ~/devops-app
IMAGE_NAME=ghcr.io/erikgdl/cloud-devops:latest docker compose pull
IMAGE_NAME=ghcr.io/erikgdl/cloud-devops:latest docker compose up -d
```
No workflow, esses comandos são encadeados com `&&`, e somente depois é executado `docker image prune -f`, removendo imagens pendentes sem tag que não estejam em uso.

O `pull` obtém a imagem publicada; o `up -d` aplica a configuração e recria o container quando necessário. Não é necessário compilar React na VPS.

## Validação e limites
A evidência usa `docker ps` para mostrar `devops-site` ativo. A aplicação é acessada por HTTPS e acompanhada pelo Kuma.

A tag `latest` é mutável. O fluxo atual não implementa rollback automático, teste HTTP após o deploy ou garantia de ausência de interrupção durante a recriação. O CI e o CD também não estão encadeados entre si.

## Evidências
![CD concluído](evidencias/09-cd-sucesso.png)
![Imagem no GHCR](evidencias/10-ghcr-imagem.png)
![Container em execução](evidencias/03-docker-containers.png)
