import { notificar } from './notificaciones.js';
import { suscribirse } from './notificaciones.js';
// *****************************************************************|
//                          ServiceWorker
// *****************************************************************|
if ('ServiceWorker' in navigator) {
  navigator.serviceWorker.register('app/static/js/sw.js');
};
// Coneccion con SocketIo | o |

let socket = io();

let conectado = false;

document.addEventListener("DOMContentLoaded", () => {
  if (conectado == false) {
    socket.emit("conectado", { "msg": "Hola" });
    conectado = true
  }
});


// *****************************************************************|
//                      ELEMENTOS DEL DOM 
// *****************************************************************|
const codigo =
  document.querySelector("#codigo");

const txt_area =
  document.querySelector("#txt_area_paste");

const progress_barr =
  document.querySelector("#progress_barr");

const inp_file =
  document.querySelector('#input_file');

const contenedor_multimedia =
  document.querySelector('.contenedor_multimedia');

const btn_enviar =
  document.querySelector('.btn_enviar');

const mensaje =
  document.querySelector('.mensaje');

const btn_suscribirse =
  document.querySelector('.btn_suscribirse');

const btn_subir =
  document.querySelector('.btn_subir')

// ------------------------------------------------------------|

// *****************************************************************|
//                           FUNCIONES
// *****************************************************************|


function crear_elemento_media(tipo) {

  let elemento_multimedia;
  contenedor_multimedia.replaceChildren();

  if (tipo == 'video' || tipo == 'audio') {

    elemento_multimedia = document.createElement(`${tipo}`);

    elemento_multimedia.src = `/${tipo}`;

    elemento_multimedia.className = `media ${tipo}`;

    elemento_multimedia.controls = true;

    contenedor_multimedia.appendChild(elemento_multimedia);
  }


  else if (tipo == 'imagen') {
    elemento_multimedia = document.createElement('img');
    elemento_multimedia.src = '/imagen';
    elemento_multimedia.className = 'imagen';
    contenedor_multimedia.appendChild(elemento_multimedia);
  };


  let media = document.querySelector('.media');
  if (media && media.localName == 'video') {
    media.src = `/video?t=${Date.now()}`;
    media.load();
  };
};
// --------------------------------------------------------------------|

socket.on('cargar_archivo', (data) => {
  crear_elemento_media(data.tipo);
});


// --------------------------------------------------------------------|
let contenedores = {
  'portapapeles': document.querySelector('#contenedor_area_texto'),
  'archivo': document.querySelector('#contenedor_area_archivo'),
  'li_portapapeles': document.querySelector('.li_portapapeles'),
  'li_archivo': document.querySelector('.li_archivo')
};
contenedores['li_portapapeles'].addEventListener('click', () => { desactivar('archivo') });
contenedores['li_archivo'].addEventListener('click', () => { desactivar('portapapeles') });


function desactivar(elemento) {
  switch (elemento) {
    case 'portapapeles':
      contenedores['portapapeles'].classList.add('desactive');
      contenedores['archivo'].classList.remove('desactive');
      contenedores['li_archivo'].classList.add('active');
      contenedores['li_portapapeles'].classList.remove('active');
      break;
    case 'archivo':
      contenedores['archivo'].classList.add('desactive');
      contenedores['portapapeles'].classList.remove('desactive');
      contenedores['li_portapapeles'].classList.add('active');
      contenedores['li_archivo'].classList.remove('active');
  }
};

// --------------------------------------------------------------------|


btn_suscribirse.addEventListener('click', async () => {
  await suscribirse()
});


btn_enviar.addEventListener('click', async () => {
  await notificar(mensaje.value)
});


// --------------------------------------------------------------------|


inp_file.addEventListener('change', () => {
  document.querySelector('.input_file_txt').innerText = `${inp_file.files[0]?.name}`
});

// -----------------------------------------------------------------|


const copiar_btn = document.querySelector("#btn_copiar");
copiar_btn.addEventListener('click', () => {
  const texto = codigo.textContent;
  const temp = document.createElement('textarea');
  temp.value = texto;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
});

// -----------------------------------------------------------------|


txt_area.addEventListener("input", () => {
  socket.emit("txt_change", txt_area.value)
});

socket.on('txt_recive', (data) => {
  txt_area.value = data;
});
socket.on('txt_recive_code', (data) => {
  codigo.textContent = data;
  codigo.removeAttribute('data-highlighted');
  const result = hljs.highlightAuto(data);
  codigo.innerHTML = result.value;
});




socket.on('ult_archivo', (data) => {
  document.getElementById('txt_archivo').innerHTML = `<strong>Archivo disponible:</strong> ${data}`;
  socket.emit("verificar_archivo_disponible");
});

//SUBIR ARCHIVO --------------------------------------------------|
//const xhr = new XMLHttpRequest();
//xhr.upload.onprogress = function(e) {
//  const porcentaje = Math.round((e.loaded / e.total) * 100);
//  progress_barr.style.width = `${porcentaje}%`;
//  progress_barr.innerText = `${porcentaje}%`
//};

// ---------------------------------------------------------------|

btn_subir.addEventListener('click', () => { subir() });

async function subir() {
  const input_file = document.querySelector("#input_file");
  const file = input_file.files[0];
  if (!file) return;
  const TAMANO_CHUNK = 5 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / TAMANO_CHUNK);
  const uuidUnico = crypto.randomUUID();
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const inicio = chunkIndex * TAMANO_CHUNK;
    const fin = Math.min(inicio + TAMANO_CHUNK, file.size);

    const chunk = file.slice(inicio, fin);
    const formData = new FormData();
    formData.append('archivo_chunk', chunk);
    formData.append('filename', file.name);
    formData.append('chunkIndex', chunkIndex);
    formData.append('totalChunks', totalChunks);
    formData.append('uploadId', uuidUnico);

    await enviarChunk(formData);
    const porcentaje = Math.round(((chunkIndex + 1) / totalChunks) * 100);
    progress_barr.style.width = `${porcentaje}%`;
    progress_barr.innerText = `${porcentaje}%`;
  }
};

function enviarChunk(formData) {
  return fetch('/upload-chunk', {
    method: 'POST',
    body: formData
  })
};
// ---------------------------------------------------------------|

