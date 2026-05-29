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
curl -O {URL PENDIENTE}/docker-compose.yml
curl -O {URL PENDIENTE}/nginx.conf
```

**.env** (No need, future feature)
```
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_MAIL=
```

prueba.
