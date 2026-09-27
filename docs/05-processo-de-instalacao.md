# 05 — Processo de instalação

## Objetivo e escopo
Preparar o computador para desenvolvimento e a VPS Ubuntu 24.04 para receber a aplicação. Os comandos de preparação abaixo constam nas anotações do projeto; são um registro do procedimento e não devem ser repetidos indiscriminadamente em uma VPS já configurada.

## Aplicação local
Na raiz do projeto, com Node.js 22:
```bash
npm ci
npm run build
```
O CI usa esses mesmos comandos. Para desenvolvimento interativo, `npm run dev`; para execução em container, consulte [Docker](07-configuracao-docker.md).

## Sistema e usuário de deploy
Na sessão administrativa inicial:
```bash
apt update && apt upgrade -y
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
sudo cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```
A cópia de `authorized_keys` foi usada na preparação inicial para autorizar a chave já existente. Não sobrescrever esse arquivo em manutenção: ele pode conter outras chaves autorizadas.

A chave pessoal foi gerada com `ssh-keygen -t ed25519`. A chave pública fica em `authorized_keys`; a privada permanece no ambiente do operador. O acesso cotidiano passa a ser:
```bash
ssh deploy@177.153.20.8
```
A chave de automação é separada da pessoal; veja [CI/CD](10-processo-ci-cd.md).

## Firewall
A liberação do SSH precedeu a ativação do UFW:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## Docker e Compose
Foi configurado o repositório oficial do Docker:
```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl status docker
sudo docker run hello-world
```

O CD executa Docker como `deploy`, sem `sudo`, portanto essa conta precisa ter acesso ao daemon. O comando específico usado para conceder esse acesso não está nos registros consultados. A evidência de `docker ps` confirma seu uso pela conta. Acesso ao daemon Docker representa privilégio elevado sobre o host.

## Serviços adicionais
O ambiente inclui Nginx, Certbot e Uptime Kuma v2. Os arquivos de instalação desses serviços na VPS não estão versionados no repositório. Seus papéis, endereços e validações comprovadas estão em [HTTPS](09-configuracao-https.md) e [Monitoramento](11-monitoramento.md); não se atribui ao histórico um comando de instalação que não foi recuperado.

## Evidências
![VPS Ubuntu](evidencias/02-vps-cloud.png)
![Regras UFW](evidencias/04-firewall-ufw.png)
![Docker executado pelo usuário deploy](evidencias/03-docker-containers.png)
