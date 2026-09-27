# 07 — Configuração Docker

## Imagem multi-stage
O [Dockerfile](../Dockerfile) possui duas etapas:
```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
A primeira etapa instala as dependências a partir do lockfile e gera `dist/`. A segunda copia apenas o resultado para o diretório servido pelo Nginx; Node.js e as dependências de desenvolvimento não são necessários na imagem final.

`EXPOSE 80` descreve a porta do container. A publicação no host é definida pelo Compose. `daemon off;` mantém o Nginx em primeiro plano como processo principal.

## Compose local
O [docker-compose.yaml](../docker-compose.yaml) contém:
```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: devops-site
    ports:
      - "8080:80"
    restart: unless-stopped
```
Para reproduzir a execução local dessa configuração:
```bash
docker compose -f docker-compose.yaml up -d --build
```
A aplicação fica em http://localhost:8080. O build cria a distribuição estática; não é um servidor Vite com atualização automática. A publicação `8080:80` não restringe o bind ao loopback.

## Compose de produção
O [compose.prod.yaml](../compose.prod.yaml) contém:
```yaml
services:
  web:
    image: ${IMAGE_NAME}
    container_name: devops-site
    ports:
      - "127.0.0.1:8080:80"
    restart: unless-stopped
```
Em produção, o serviço usa uma imagem pronta do GHCR. O CD fornece `IMAGE_NAME` a cada comando. O bind `127.0.0.1` permite que o Nginx do host alcance a aplicação sem publicar a porta 8080 em todas as interfaces.

`restart: unless-stopped` permite reinicialização automática conforme a política Docker, mas preserva uma parada manual. Por isso, no teste de indisponibilidade, foi necessário iniciar o container novamente.

## Contexto de build
O `.dockerignore` exclui dependências locais, distribuição prévia, metadados Git e arquivos `.env`. A imagem compila a aplicação dentro da etapa Node.

## Evidências
![Dockerfile](evidencias/14-dockerfile.png)
![Compose local](evidencias/15-compose-local.png)
![Compose de produção](evidencias/16-compose-producao.png)
