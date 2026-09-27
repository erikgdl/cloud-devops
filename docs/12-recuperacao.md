# 12 — Indisponibilidade e recuperação

## Objetivo
Demonstrar que uma interrupção da aplicação é detectada e que o serviço pode ser restaurado. O teste registrado mantém Nginx e Uptime Kuma ativos e interrompe apenas `devops-site`.

## Procedimento do teste
Na sessão SSH da VPS, a sequência de parada e retorno descrita no histórico foi:
```bash
docker ps
docker stop devops-site
```
A parada é deliberada e torna a aplicação indisponível. Depois do próximo ciclo de monitoramento, o painel passa a `Desligado`, com erro 502.

Para restaurar o mesmo container:
```bash
docker start devops-site
docker ps
```
Após a retomada, a aplicação volta a responder e o Kuma registra `200 - OK`. A política `unless-stopped` não desfaz uma parada manual; o retorno deste teste depende da ação do operador.

## Por que ocorreu 502?
O Nginx público permaneceu acessível, mas não conseguiu obter resposta do serviço interno em `127.0.0.1:8080`. Isso resulta em Bad Gateway. Quando o container retorna, o proxy volta a receber resposta da aplicação.

## Resultado observado
| Horário mostrado no painel | Estado | Resposta |
| --- | --- | --- |
| 27/09/2026 00:19:07 | Ligado | 200 - OK |
| 27/09/2026 00:22:07 | Desligado | Request failed with status code 502 |
| 27/09/2026 00:24:07 | Ligado | 200 - OK |

Os horários são os exibidos na evidência. O intervalo entre os registros de falha e retorno é de dois minutos; não determina o instante exato dos comandos, pois o monitor faz consultas periódicas.

O percentual de disponibilidade após a recuperação continua refletindo a falha registrada. Voltar a `Ligado` não apaga o histórico.

## Se o container não retornar
Como sequência adicional de diagnóstico, e não como comandos comprovadamente executados no teste:
```bash
docker ps -a
docker logs --tail 100 devops-site
curl -I http://127.0.0.1:8080
sudo nginx -t
curl -I https://devops.erikgdl.xyz
```
Se o container tiver sido removido, `docker start` não o recria. Nesse caso, reaplicar o Compose de produção com `IMAGE_NAME`, conforme [Deploy](06-processo-de-deploy.md), exige imagem disponível e autenticação válida no GHCR.

Esta recuperação reinicia o serviço existente. Não é restauração de backup nem rollback de versão; essas automações não estão implementadas no workflow documentado.

## Evidências
![Estado saudável antes da interrupção](evidencias/11-monitoramento-online.png)
![Falha 502 detectada](evidencias/12-monitoramento-desligado.png)
![Histórico 200, 502 e retorno a 200](evidencias/13-monitoramento-recuperacao.png)
