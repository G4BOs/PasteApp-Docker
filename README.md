# PASTEAPP LAN | Docker #

## Install ##

**Dir structure**  
```
mkdir -p ~/pasteapp/certs && cd ~/pasteapp
```

**HTTPS CERTS**  
```
sudo apt install mkcert
mkcert -install
mkcert -key-file certs/key.pem -cert-file certs/cert.pem YOUR_IP_HERE
cp $(mkcert -CAROOT)/rootCA.pem certs/myrootCA.pem
```

**Docker Compose and Nginx config**  

```
curl -O https://raw.githubusercontent.com/G4BOs/PasteApp-Docker/refs/heads/master/docker-compose.yml
curl -O https://raw.githubusercontent.com/G4BOs/PasteApp-Docker/refs/heads/master/nginx.conf
```


**COMPOSE**
```
docker compose up -d
```

**Access:**  
*YOUR_IP_HERE:8000* 

**.env** (No need, future feature)
```
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_MAIL=
```

