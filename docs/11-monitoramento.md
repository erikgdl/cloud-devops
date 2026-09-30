# 11 — Monitoramento

## Configuração do monitor

| Item | Valor |
| --- | --- |
| Ferramenta | Uptime Kuma v2 |
| Container | `uptime-kuma` |
| Imagem | `louislam/uptime-kuma:2` |
| Publicação no host | `127.0.0.1:3001 → 3001` |
| Interface | [monitor.erikgdl.xyz](https://monitor.erikgdl.xyz) |
| Monitor | `Projeto DevOps`, do tipo HTTP(s) |
| Alvo | `https://devops.erikgdl.xyz/` |
| Intervalo exibido | 60 segundos |

O Nginx do host encaminha o domínio do monitor para a porta local 3001. A captura de `docker ps` mostra o container do Kuma em estado `healthy`; esse estado diz respeito ao próprio monitor, não comprova que a aplicação monitorada está disponível.

## Leitura dos indicadores

O painel apresenta estado, latência, percentuais de disponibilidade, expiração de certificado e histórico de eventos. No primeiro registro, a aplicação respondeu `200 - OK` e o monitor apareceu como `Ligado`.

Um HTTP 200 confirma que a consulta recebeu uma resposta considerada bem-sucedida; não verifica todos os componentes React, navegação ou comportamento no navegador. O percentual de disponibilidade corresponde às verificações registradas. Exibir 100% numa coluna anual não comprova um ano inteiro de observação.

No teste controlado, o Kuma permaneceu ativo enquanto `devops-site` foi parado. Ele registrou 502 e, após a retomada manual, 200. O [capítulo de recuperação](12-recuperacao.md) contém a sequência e os horários.

## Operação e limites

Para verificar o processo do monitor na VPS, como referência operacional:

```bash
docker ps --filter name=uptime-kuma
docker logs --tail 100 uptime-kuma
```

O Compose da aplicação contém somente `web`; o Kuma é administrado separadamente. Antes de recriar ou atualizar o monitor, identifique seu armazenamento persistente e preserve os dados de configuração e histórico.

Aplicação e monitor compartilham a VPS: uma falha total do host interrompe os dois. O monitoramento descrito consulta a aplicação e registra os eventos; a recuperação apresentada neste projeto é manual. A interface administrativa do Kuma deve ter acesso controlado e não deve ser confundida com uma página de status pública.

## Evidências

![Uptime Kuma e aplicação em execução, com portas locais](evidencias/03-docker-containers.png)

![Monitor HTTP(s) em estado saudável e intervalo de 60 segundos](evidencias/11-monitoramento-online.png)

[Índice](README.md) · [Indisponibilidade e recuperação](12-recuperacao.md)
