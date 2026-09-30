# 03 — Tecnologias utilizadas

| Tecnologia | Responsabilidade no projeto |
| --- | --- |
| React | Interface baseada em componentes, executada no navegador |
| Vite | Desenvolvimento local e geração dos arquivos estáticos |
| Node.js 22 e npm | Instalação de dependências e build |
| Git e GitHub | Commits, branches, pull requests e hospedagem do código |
| Docker | Construção de imagens e execução de containers |
| Docker Compose | Definição do serviço da aplicação nos ambientes local e de produção |
| Nginx no container | Entrega de `dist/` por HTTP |
| Nginx no host | Reverse proxy e terminação TLS |
| Ubuntu 24.04 LTS / KingHost | Sistema operacional e infraestrutura da VPS |
| SSH | Administração e deploy remoto com autenticação por chave |
| UFW | Administração das regras de firewall do host |
| GitHub Actions | Automação de CI e CD |
| GHCR | Registro de imagens Docker associado ao GitHub |
| GitHub Secrets | Armazenamento dos valores sensíveis usados pela automação |
| Certbot / Let's Encrypt | Gerenciamento e emissão dos certificados TLS |
| Uptime Kuma v2 | Monitor HTTP(s) e histórico de disponibilidade |

## Versões e dependências

O Dockerfile usa `node:22-alpine` no build e `nginx:alpine` na imagem final. A evidência de execução mostra `louislam/uptime-kuma:2` para o monitor. Essas tags não fixam um digest imutável; reconstruções ou atualizações podem obter revisões diferentes.

As versões exatas de React, Vite e dependências devem ser consultadas no `package.json` e no `package-lock.json` do código-fonte. `npm ci` instala a árvore definida pelo lockfile e exige sua compatibilidade com o manifesto.

## Conceitos usados na operação

- **Imagem e container:** a imagem empacota os arquivos e a configuração; o container é uma instância criada a partir dela. Publicar uma imagem no GHCR não atualiza sozinho o container da VPS.
- **Reverse proxy:** o Nginx recebe a conexão pública e faz outra requisição ao serviço interno. Isso centraliza o acesso por domínio e o HTTPS.
- **CI e CD:** o CI valida a construção do projeto; o CD publica a imagem e aplica a atualização em produção. Os gatilhos e limites estão em [CI/CD](10-processo-ci-cd.md).

[Índice](README.md) · [Estrutura do projeto](04-estrutura-do-projeto.md)
