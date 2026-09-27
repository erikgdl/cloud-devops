# 11 — Monitoramento

## Implementação
O ambiente utiliza Uptime Kuma v2, executado no container `uptime-kuma` com a imagem `louislam/uptime-kuma:2`. A evidência de Docker mostra estado `healthy` e publicação em `127.0.0.1:3001`.

A interface é acessada em https://monitor.erikgdl.xyz pelo Nginx da VPS. O monitor `Projeto DevOps` consulta https://devops.erikgdl.xyz/ a cada 60 segundos.

## Indicadores
O painel mostra estado atual, latência, médias, percentuais de disponibilidade, vencimento do certificado e histórico de eventos. Na evidência inicial, o monitor estava `Ligado`, com `200 - OK`.

Os 100% exibidos representam as verificações disponíveis naquele momento. Não demonstram um ano inteiro de operação, mesmo quando o painel apresenta uma coluna de um ano.

## O que está sendo verificado
A consulta HTTP(s) acompanha o caminho publicado pelo domínio e a resposta do servidor. Um 200 indica resposta HTTP bem-sucedida; não é um teste funcional de todos os componentes da interface React.

O teste seguinte interrompeu somente o container da aplicação. O Kuma permaneceu ativo e registrou 502; depois identificou a volta para 200. Veja [Recuperação](12-recuperacao.md).

## Limites e persistência
O Compose da aplicação contém apenas o serviço `web`. A configuração de criação e o volume de dados do Kuma não estão versionados nos arquivos consultados. Por isso, não se atribui um nome de volume ou comando de instalação não confirmado.

O monitor compartilha o host com a aplicação. Não há evidência de monitor externo, notificações configuradas ou recuperação automática disparada pelo Kuma.

## Evidências
![Container Uptime Kuma v2](evidencias/03-docker-containers.png)
![Aplicação saudável no painel](evidencias/11-monitoramento-online.png)
