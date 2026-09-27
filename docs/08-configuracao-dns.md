# 08 — Configuração DNS

## Objetivo
Associar nomes legíveis ao IPv4 público da VPS. DNS resolve o endereço; o Nginx decide qual serviço atende cada domínio.

| Nome | Tipo | Destino do ambiente |
| --- | --- | --- |
| devops.erikgdl.xyz | A | 177.153.20.8 |
| monitor.erikgdl.xyz | A | 177.153.20.8 |

O domínio base é `erikgdl.xyz`. Os dois subdomínios compartilham a VPS, com encaminhamento separado para aplicação e monitoramento.

```text
Nome de domínio → resolução DNS → 177.153.20.8
→ Nginx da VPS → serviço correspondente
```

## Validação registrada
```bash
nslookup devops.erikgdl.xyz
```
O print registra a resolução do subdomínio da aplicação. O endereço do monitor faz parte do ambiente informado e consta no certificado emitido; não há um print separado de consulta DNS do monitor neste conjunto.

Após alteração de registros, caches DNS podem manter respostas anteriores até expirar o TTL. O TTL e o painel de gestão da zona não foram recuperados nos arquivos consultados.

## Relação com HTTPS
A resolução correta permite que navegador e validação de domínio cheguem ao servidor. O registro A não configura certificado nem reverse proxy: essas etapas são descritas em [HTTPS](09-configuracao-https.md).

## Evidência
![Consulta DNS da aplicação](evidencias/05-dns.png)
