# 13 — Conclusão e fluxo geral

## Resultado do projeto

O `cloud-devops` conecta desenvolvimento e operação em um ambiente funcional: a aplicação React + Vite é versionada, construída em imagem Docker, publicada pelo GitHub Actions e executada em uma VPS com domínio e HTTPS. O Uptime Kuma acompanha o serviço e registra sua disponibilidade.

As etapas se complementam. Git organiza as alterações; o CI verifica os builds; o CD distribui e aplica a imagem; a VPS sustenta a execução; DNS e Nginx conduzem o acesso; TLS protege a comunicação pública; o monitoramento permite observar o resultado em produção.

## Do desenvolvimento ao monitoramento

O fluxo abaixo reúne a implementação. Leia de cima para baixo: desenvolvimento, automação, servidor, acesso público e operação. Cada grupo reúne uma etapa e suas dependências; as setas tracejadas indicam configuração ou autorização. A chave privada permanece no cliente SSH. As branches aparecem na ordem das etapas; a validação automática representa o fluxo adotado após a implantação do CI/CD.

```mermaid
flowchart TB
    subgraph DEV["1. Desenvolvimento e versionamento"]
        direction LR
        App["React + Vite<br/>interface da aplicação"] --> Local["Node.js 22<br/>npm ci e npm run dev"]
        Local --> Teste["npm run build<br/>gera dist"]
        Teste --> ComposeLocal["Compose local<br/>build e porta 8080"]
        Local --> Git["Git<br/>commits e push"]
        Git --> Branches["Branches, em ordem<br/>feature/apresentação<br/>feature/docker-ci-cd<br/>feat/https-nginx"]
        Branches --> PR["PR para master<br/>revisão da alteração"]
    end

    subgraph AUTO["2. Integração, publicação e distribuição"]
        direction LR
        CI["CI do PR<br/>checkout e Node 22<br/>npm ci, build e Docker build"] --> Revisao["Conferir CI<br/>e integrar por merge"]
        Revisao --> Master["Push na master<br/>aciona workflows"]
        Master --> CIm["CI da master<br/>independente do CD"]
        Master --> CD["CD<br/>checkout e login no GHCR"]
        CD --> Build["Dockerfile multi-stage<br/>Node 22 Alpine compila<br/>Nginx Alpine recebe dist"]
        Build --> Registry["Push da imagem no GHCR<br/>ghcr.io/erikgdl/<br/>cloud-devops:latest"]
        Token["GITHUB_TOKEN<br/>autoriza acesso ao registro"] -.-> CD
    end

    subgraph VPS["3. Deploy na VPS KingHost — Ubuntu 24.04 — 177.153.20.8"]
        direction LR
        Secrets["Secrets: VPS_HOST,<br/>VPS_USER e VPS_SSH_KEY_B64"] --> Runner["Runner decodifica Base64<br/>e reconstrói a chave privada<br/>com permissão 600"]
        Runner --> SSH["SSH :22 como deploy<br/>authorized_keys na VPS<br/>contém as chaves públicas"]
        Pessoal["Operador<br/>chave privada pessoal<br/>fica no computador"] -->|"acesso administrativo"| SSH
        SSH --> Envio["SCP envia compose.prod.yaml<br/>para ~/devops-app/compose.yaml"]
        Envio --> Pull["Docker autentica no GHCR<br/>IMAGE_NAME definida<br/>compose pull baixa a imagem"]
        Pull --> Up["compose up -d<br/>cria ou atualiza devops-site<br/>restart: unless-stopped"]
        Up --> Prune["image prune -f<br/>limpa imagens pendentes<br/>que não estão em uso"]
    end

    subgraph WEB["4. Acesso público, DNS, Nginx e HTTPS"]
        direction LR
        Navegador["Navegador<br/>solicita devops.erikgdl.xyz"] --> DNS["Consulta DNS A<br/>retorna 177.153.20.8<br/>monitor usa o mesmo IP"]
        DNS --> Conexao["Navegador conecta à VPS<br/>HTTP :80 ou HTTPS :443<br/>UFW permite SSH/80/443"]
        Conexao --> Proxy["Nginx do host<br/>seleciona o domínio<br/>e termina TLS no HTTPS"]
        Cert["Certbot + Let's Encrypt<br/>certificados dos dois domínios<br/>teste renew --dry-run"] -.-> Proxy
        Proxy --> AppPort["Aplicação: HTTP interno<br/>127.0.0.1:8080 → container:80"]
        AppPort --> Container["devops-site<br/>Nginx serve arquivos de dist"]
        Container --> Resposta["Resposta volta pelo proxy<br/>HTTPS até o navegador<br/>React executa no cliente"]
        Proxy --> KumaPort["Monitor: HTTP interno<br/>127.0.0.1:3001 → container:3001<br/>monitor.erikgdl.xyz"]
    end

    subgraph MON["5. Monitoramento e recuperação"]
        direction LR
        Kuma["Uptime Kuma v2<br/>container uptime-kuma"] --> Consulta["Projeto DevOps<br/>consulta HTTPS da aplicação<br/>a cada 60 segundos"]
        Consulta --> Estado["200 OK<br/>painel registra status,<br/>latência e disponibilidade"]
        Estado --> Stop["Teste controlado<br/>operador executa<br/>docker stop devops-site"]
        Stop --> Falha["Nginx sem upstream<br/>resposta 502<br/>Kuma detecta a falha"]
        Falha --> Start["Recuperação manual<br/>operador executa<br/>docker start devops-site"]
        Start --> Recuperado["Nova consulta: 200 OK<br/>histórico preserva<br/>falha e recuperação"]
    end

    DEV -->|"código enviado para validação"| AUTO
    AUTO -->|"imagem publicada e deploy remoto"| VPS
    VPS -->|"aplicação em execução"| WEB
    WEB -->|"serviço acompanhado pelo domínio"| MON
```

## O que a implementação demonstrou

| Etapa | Resultado |
| --- | --- |
| Desenvolvimento | Interface React compilada em arquivos estáticos |
| Versionamento | Evolução organizada em branches e integrada à `master` |
| Containerização | Separação entre build Node e execução Nginx |
| Automação | Validação dos builds e deploy acionado pela atualização da `master` |
| Infraestrutura | Aplicação e monitor em containers na VPS, com acesso administrativo por chave |
| Publicação | Domínios atendidos pelo proxy e acesso HTTPS |
| Operação | Detecção de falha 502 e recuperação manual confirmada por resposta 200 |

## Limites operacionais

O ambiente concentra aplicação e monitor em uma VPS; uma falha completa do host afeta ambos. O teste realizado demonstra recuperação de um container parado, e não restauração integral do servidor. O fluxo também não oferece rollback automático ou garantia de atualização sem interrupção.

Esses limites orientam a manutenção: conferir cada publicação, acompanhar certificados e disponibilidade, proteger credenciais e preservar os dados do monitor. O projeto estabelece um ciclo de entrega e operação observável, com responsabilidades claras entre desenvolvimento, automação e infraestrutura.

[Índice](README.md) · [Apresentação do projeto](../README.md)
