# Cloud Devops

Aplicação web que apresenta, de forma interativa, as etapas de um projeto DevOps. Desenvolvida com React e Vite, é distribuída como imagem Docker e publicada em uma VPS Ubuntu 24.04 na KingHost.

- [Aplicação](https://devops.erikgdl.xyz)
- [Monitoramento](https://monitor.erikgdl.xyz)
- [Documentação técnica completa](docs/README.md)
- [Repositório](https://github.com/erikgdl/cloud-devops)

## Arquitetura
```text
GitHub → GitHub Actions CD → GHCR → Docker na VPS
Navegador → DNS → Nginx/HTTPS da VPS → Nginx do container → React
Uptime Kuma → consultas HTTPS → histórico de disponibilidade
```
O CI valida o build da aplicação e da imagem. O CD publica a imagem e atualiza o container por SSH em pushes na master. Os dois workflows são independentes.

## Tecnologias
React 19, Vite 8, Node.js 22, Docker multi-stage, Docker Compose, Nginx, GitHub Actions, GHCR, Ubuntu 24.04 LTS, SSH, UFW, Certbot/Let's Encrypt e Uptime Kuma v2.

## Executar localmente
Com Node.js 22 e npm, na raiz:
```bash
npm ci
npm run dev
```
Ou, com Docker e Compose:
```bash
docker compose -f docker-compose.yaml up -d --build
```
A versão em container fica em http://localhost:8080.

## Produção e validações
A imagem usa Node.js para compilar e Nginx para servir o resultado. Em produção, a porta da aplicação é publicada somente em `127.0.0.1:8080`, atrás do reverse proxy da VPS.

As evidências documentam CI/CD concluídos, publicação no GHCR, DNS, certificados, teste de renovação e monitoramento. O teste de recuperação registra a sequência `200 OK → 502 → 200 OK`.

Consulte o [índice técnico](docs/README.md) para instalação, deploy, Docker, DNS, HTTPS, CI/CD, monitoramento e recuperação. Os prints estão em `docs/evidencias/`; representam o momento da coleta.
