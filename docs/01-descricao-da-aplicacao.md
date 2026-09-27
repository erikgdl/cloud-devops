# 01 — Descrição da aplicação

## Objetivo
O cloud-devops demonstra o ciclo de entrega de uma aplicação web: desenvolvimento, versionamento, construção de imagem, publicação em cloud, HTTPS e monitoramento.

## Implementação
A aplicação é uma interface React com Vite, organizada como uma apresentação horizontal de quatro seções: abertura, visão geral, jornada e fases do projeto. O componente `App.jsx` combina as seções, o cabeçalho e os controles; o hook `useHorizontalDeck` gerencia a navegação.

O build gera arquivos estáticos em `dist/`. Em produção, o Nginx dentro do container entrega esses arquivos. Não há backend ou banco de dados da aplicação definido neste repositório.

- Aplicação: https://devops.erikgdl.xyz
- Monitoramento: https://monitor.erikgdl.xyz
- Repositório: https://github.com/erikgdl/cloud-devops

## Execução local
Na raiz, com Node.js 22 e npm disponíveis:
```bash
npm ci
npm run dev
```
Para gerar a distribuição, o comando usado pelo Dockerfile e pelo CI é:
```bash
npm run build
```
O endereço do servidor de desenvolvimento aparece no terminal. Para executar a imagem em localhost:8080, consulte [Docker](07-configuracao-docker.md).

## Evidência e resultado
![Aplicação online](evidencias/01-aplicacao-online.png)

A evidência registra a aplicação publicada. Os prints representam o momento da coleta, não uma consulta em tempo real.
