# ------------------------------------------------------------------\
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse, FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import socketio
import os
from dotenv import load_dotenv
load_dotenv()
from .moduls import wp_modul
# ------------------------------------------------------------------/

app = FastAPI()
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)
templates = Jinja2Templates(directory="app/templates")

# ------------------------------------------------------------------|

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
combined_asgi_app = socketio.ASGIApp(sio,app)

# ------------------------------------------------------------------|
texto = ''
archivo_name = ''

# ******************************************************************|
#                           FUNCTIONS
# ******************************************************************|
def cargar_nombre():
    global archivo_name
    try:
        with open("app/uploads/info.txt", "r") as f:
            archivo_name = f.read()
    except FileNotFoundError:
        archivo_name = ''
        with open("app/uploads/info.txt", "w") as f:
            f.write("Aun no hay archivos aqui")
cargar_nombre()


def tipo_de_archivo(archivo):
    formats = {
            'video': ['mp4','avi','webm'],
            'imagen': ['png', 'jpg', 'jepg'],
            'audio': ['mp3']
            }
    for types in formats: # Itera sobre todos los tipos de archivos
        for frmts in formats[types]: # itera por cada formato
            if frmts in archivo: # Si un formato coincide con alguno
                return types # retorna el tipo
    return 'otro'


# ******************************************************************|
#                            ROUTES
# ******************************************************************|


# INDEX
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """
    Ruta principal para cargar página de inicio
    """
    return templates.TemplateResponse(
        name="index.html",
        context={"saludo": "Hola"},
        request=request
    )


@app.get("/obt_publicKey")
async def obt_publickey():
    public_key = os.getenv("VAPID_PUBLIC_KEY")
    return {"public_key": public_key}



@app.post("/suscribir")
async def suscribir(request: Request):
    data = await request.json()
    wp_modul.suscribir(data)

@app.post("/notificar")
async def notificar(request: Request):
    data = await request.json()
    mensaje = data["mensaje"]
    wp_modul.notificar(mensaje)



@app.post("/upload")
async def upload(archivo: UploadFile = File(...) ):
    with open("app/uploads/archivo", "wb") as f:
        f.write(await archivo.read())
    with open("app/uploads/info.txt", "w") as f:
        f.write(archivo.filename or "noname")
    cargar_nombre()
    await sio.emit("ult_archivo", archivo_name)

@app.get("/download")
async def download():
    def iterar():
        with open("app/uploads/archivo", "rb") as f:
            while chunk := f.read(2048*2048):
                yield chunk
    headers = {"Content-Disposition": f"attachment; filename={archivo_name}"}
    return StreamingResponse(iterar(), headers=headers)



@app.get("/video")
async def get_video():
    def iterar():
        with open("app/uploads/archivo", "rb") as f:
            while chunk := f.read(1024*1024):
                yield chunk
    return StreamingResponse(iterar(),media_type="video/mp4")



@app.get("/audio")
async def get_audio():
    def iterar():
        with open("app/uploads/archivo", "rb") as f:
            while chunk := f.read(1024*1024):
                yield chunk
    return StreamingResponse(iterar(),media_type="audio/mpeg")


@app.get("/imagen")
def get_imagen():
    return FileResponse("app/uploads/archivo", filename=archivo_name)

# ******************************************************************|
#                           SOCKET EVENTS
# ******************************************************************|

@sio.event
async def connect(sid, environ):
    print(f"ID: {sid}")
    await sio.emit("bienvenida", {"mensaje": "Conexión establecida con FastApi"}, room=sid)

@sio.event
async def disconnect(sid):
    print(f"Cliente desconectado: {sid}")

@sio.on("txt_change") # type: ignore
async def handle_txt_change(sid,data):
    global texto
    texto = data
    await sio.emit("txt_recive_code", data)
    await sio.emit("txt_recive", data, skip_sid=sid)
    print(data)

@sio.on("conectado") # type: ignore
async def handle_conectado(sid,data):
    print(data,"="*20)
    await sio.emit("ult_archivo", archivo_name)
    await sio.emit("txt_recive", texto)
    tipo = tipo_de_archivo(archivo_name)
    await sio.emit(
            'cargar_archivo',{
                'tipo': tipo,
                'ruta': f'/{tipo}'
                },to=sid)

@sio.on('verificar_archivo_disponible') # type: ignore
async def handle_verificar_archivo_disponible(sid):
    print("Enviando archivo desde endpoint verificar_archivo_disponible")
    tipo = tipo_de_archivo(archivo_name)
    await sio.emit(
            'cargar_archivo',{
                'tipo': tipo,
                'ruta': f'/{tipo}'
                },to=sid)
