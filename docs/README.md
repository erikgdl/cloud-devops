# Documentação técnica — cloud-devops

O projeto publica uma aplicação React/Vite em uma VPS Ubuntu 24.04 na KingHost, com Docker, entrega pelo GitHub Actions, HTTPS e monitoramento Uptime Kuma v2.

## Conteúdo

- [01 — Descrição da aplicação](./01-descricao-da-aplicacao.md)
- [02 — Arquitetura do ambiente](./02-arquitetura-do-ambiente.md)
- [03 — Tecnologias utilizadas](./03-tecnologias-utilizadas.md)
- [04 — Estrutura do projeto](./04-estrutura-do-projeto.md)
- [05 — Processo de instalação](./05-processo-de-instalacao.md)
- [06 — Processo de deploy](./06-processo-de-deploy.md)
- [07 — Configuração Docker](./07-configuracao-docker.md)
- [08 — Configuração DNS](./08-configuracao-dns.md)
- [09 — HTTPS e reverse proxy](./09-configuracao-https.md)
- [10 — Processo de CI/CD](./10-processo-ci-cd.md)
- [11 — Monitoramento](./11-monitoramento.md)
- [12 — Indisponibilidade e recuperação](./12-recuperacao.md)

## Evidências e origem das informações

Os 17 prints em `evidencias/` mantêm os nomes organizados no projeto e são referenciados nos capítulos correspondentes. A documentação foi conferida com o código, os workflows, os arquivos Compose, as anotações de preparação e os prints disponíveis em 27/09/2026.

Comandos extraídos dos workflows ou registrados no histórico são identificados no contexto. Comandos adicionais de reprodução ou diagnóstico são apresentados como tais. Configurações do host não recuperadas, como o arquivo completo do Nginx e o volume do Kuma, são explicitamente delimitadas.

As imagens registram resultados históricos; não representam uma checagem atual do ambiente. O print `02-vps-cloud.png` ainda contém dados de conta na lateral: recorte essa área antes de divulgação pública. Não publique arquivos de chave, valores de Secrets ou tokens.

[Voltar à apresentação do projeto](../README.md)
