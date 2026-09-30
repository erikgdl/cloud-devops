# 01 — Descrição da aplicação

## Objetivo

O `cloud-devops` demonstra a entrega de uma aplicação web em nuvem: desenvolvimento, versionamento, build, empacotamento, publicação, HTTPS e acompanhamento da disponibilidade. A interface serve como apresentação do projeto; esta documentação registra sua implementação e operação.

## Funcionamento

A aplicação usa React e Vite. O código é organizado em componentes, seções, dados, estilos e hooks. A interface apresenta o projeto e suas etapas; a estrutura contém `App.jsx` e `main.jsx` como pontos centrais da composição e inicialização.

O comando `npm run build` gera a distribuição estática em `dist/`. Em produção, esses arquivos são servidos pelo Nginx do container `devops-site`; o JavaScript da interface executa no navegador. O servidor de desenvolvimento do Vite e o Node.js de build não atendem as requisições de produção.

A aplicação é um frontend estático. O Uptime Kuma é um serviço de monitoramento separado.

## Acesso e uso

| Recurso | Endereço |
| --- | --- |
| Aplicação | [devops.erikgdl.xyz](https://devops.erikgdl.xyz) |
| Monitoramento | [monitor.erikgdl.xyz](https://monitor.erikgdl.xyz) |
| Código-fonte | [erikgdl/cloud-devops](https://github.com/erikgdl/cloud-devops) |

Para desenvolver e compilar, consulte [instalação](05-processo-de-instalacao.md). Para executar a distribuição em container, consulte [Docker](07-configuracao-docker.md). O acesso ao repositório e ao painel depende das permissões configuradas nesses serviços.

## Evidência

![Aplicação publicada, com conexão HTTPS reconhecida pelo navegador](evidencias/01-aplicacao-online.png)

A aplicação publicada apresenta o projeto e suas etapas pelo domínio com HTTPS.

[Índice](README.md) · [Arquitetura do ambiente](02-arquitetura-do-ambiente.md)
