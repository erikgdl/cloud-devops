# 08 — Configuração DNS

## Registros do ambiente

DNS associa os nomes dos serviços ao endereço da VPS. Um registro **A** aponta um nome para um endereço IPv4.

| Nome | Tipo | Destino |
| --- | --- | --- |
| `devops.erikgdl.xyz` | A | `177.153.20.8` |
| `monitor.erikgdl.xyz` | A | `177.153.20.8` |

Os dois serviços compartilham o mesmo IP. Depois da resolução, o navegador se conecta ao Nginx da VPS, que seleciona o serviço pelo domínio. DNS não escolhe a porta do container e não configura HTTPS.

Os dois domínios possuem certificados TLS próprios e são encaminhados pelo Nginx aos respectivos serviços.

## Verificação operacional

Em um computador com acesso à rede:

```bash
nslookup devops.erikgdl.xyz
nslookup monitor.erikgdl.xyz
```

Confira o IP retornado para o nome consultado. O endereço do servidor DNS mostrado por `nslookup` identifica o resolvedor utilizado, não a VPS da aplicação.

Após alterações na zona, respostas antigas podem permanecer em cache até expirar o TTL. Confira esse valor no provedor DNS. Se o IP da VPS mudar, atualize ambos os registros e revise a configuração de acesso usada no deploy.

## Relação com os demais serviços

Resolver o nome é uma condição necessária, mas não garante aplicação saudável. Com DNS correto, ainda podem ocorrer problemas no firewall, certificado, Nginx ou container. O [fluxo de requisição](09-configuracao-https.md) mostra essas camadas; a [recuperação](12-recuperacao.md) organiza o diagnóstico.

## Evidência

![Resolução do domínio da aplicação para o IP público da VPS](evidencias/05-dns.png)

[Índice](README.md) · [Nginx e HTTPS](10-processo-ci-cd.md)
