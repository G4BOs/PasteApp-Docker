#!/bin/sh

if [ -z "$VAPID_PUBLIC_KEY" ]; then
    echo "ERROR: VAPID_PUBLIC_KEY no está definida"
    exit 1
fi

if [ -z "$VAPID_PRIVATE_KEY" ]; then
    echo "ERROR: VAPID_PRIVATE_KEY no está definida"
    exit 1
fi

if [ -z "$VAPID_MAIL" ]; then
    echo "ERROR: VAPID_MAIL no está definida"
    exit 1
fi

mkdir -p app/uploads

exec uvicorn app.main:combined_asgi_app --host 0.0.0.0 --port 8000
