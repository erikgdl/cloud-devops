# 04 — Estrutura do projeto

```text
cloud-devops/
├── .github/workflows/
│   ├── ci.yml
│   └── cd.yml
├── docs/
│   ├── README.md
│   ├── 01-descricao-da-aplicacao.md ... 12-recuperacao.md
│   └── evidencias/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── sections/
│   ├── styles/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yaml
├── compose.prod.yaml
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Responsabilidades
- `components/`: cabeçalho, ícones e controles da apresentação.
- `sections/`: conteúdo das quatro seções da interface.
- `hooks/`: comportamento da navegação horizontal.
- `data/`: dados e endereço do repositório usados pela interface.
- `styles/` e `index.css`: apresentação visual.
- `main.jsx`: inicialização do React; `App.jsx`: composição da tela.
- `public/`: arquivos estáticos que podem ser copiados pelo Vite.
- `.github/workflows/`: validação e entrega automática.
- `Dockerfile`: construção da imagem.
- `docker-compose.yaml`: build e execução local.
- `compose.prod.yaml`: execução da imagem publicada em produção.
- `docs/`: explicações técnicas e evidências.

`node_modules/` contém dependências instaladas; `dist/` é gerado pelo build. Ambos são excluídos do contexto Docker. O `.dockerignore` também exclui `.git`, `.env` e `.env.*`.

## Estrutura na VPS
O CD cria `~/devops-app` na conta de deploy e copia `compose.prod.yaml` como `~/devops-app/compose.yaml`. Assim, o Compose remoto descobre o arquivo pelo nome padrão. O código-fonte não precisa ser clonado na VPS para esse fluxo.

## Evidência
![Estrutura real do projeto](evidencias/17-estrutura-projeto.png)
