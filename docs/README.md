# Documentação técnica — cloud-devops

O `cloud-devops` apresenta o ciclo de construção e entrega de uma aplicação React + Vite em uma VPS: preparação do servidor, acesso seguro, containers, automação, domínio, HTTPS, monitoramento e recuperação.

Os capítulos explicam tanto as decisões da implementação quanto os procedimentos de uso e manutenção. O encerramento reúne todo o ambiente em um único fluxo visual.

## Conteúdo

| Capítulo | O que você encontrará |
| --- | --- |
| [01 — Descrição da aplicação](01-descricao-da-aplicacao.md) | Objetivo, interface e execução do frontend |
| [02 — Arquitetura do ambiente](02-arquitetura-do-ambiente.md) | Visão dos componentes, conexões e portas |
| [03 — Tecnologias utilizadas](03-tecnologias-utilizadas.md) | Responsabilidade de cada ferramenta |
| [04 — Estrutura do projeto](04-estrutura-do-projeto.md) | Organização do repositório e diretórios de produção |
| [05 — Instalação, VPS e segurança](05-processo-de-instalacao.md) | Ambiente local, usuário deploy, senhas, chaves SSH e firewall |
| [06 — Deploy e GHCR](06-processo-de-deploy.md) | Onde a imagem fica armazenada e como chega à VPS |
| [07 — Configuração Docker](07-configuracao-docker.md) | Dockerfile multi-stage, imagens, containers e Compose |
| [08 — Configuração DNS](08-configuracao-dns.md) | Domínios, registros A e resolução de nomes |
| [09 — Nginx e HTTPS](09-configuracao-https.md) | Reverse proxy, caminho da requisição e certificados |
| [10 — Git, branches e CI/CD](10-processo-ci-cd.md) | Branches utilizadas, integração, gatilhos e automação |
| [11 — Monitoramento](11-monitoramento.md) | Uptime Kuma, consultas HTTP(s) e leitura dos indicadores |
| [12 — Indisponibilidade e recuperação](12-recuperacao.md) | Teste de parada, diagnóstico e retorno do serviço |
| [13 — Conclusão e fluxo geral](13-conclusao.md) | Resultado do projeto e diagrama completo da implementação |

## Como consultar

Para conhecer a implementação, siga a ordem dos capítulos. Para desenvolver localmente, consulte 05 e 07. Para publicar alterações, use 06 e 10. Para manter o ambiente, consulte 08, 09, 11 e 12.

## Evidências do projeto

O [catálogo de evidências](evidencias/README.md) reúne os registros da aplicação publicada, da infraestrutura, dos containers, dos certificados e do teste de recuperação. As imagens acompanham os capítulos correspondentes e apresentam os resultados obtidos durante a implementação.

[Voltar à apresentação do projeto](../README.md)
