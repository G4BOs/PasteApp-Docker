import useUploadStore from "../hooks/useUploadStore";
import { useSocketStore } from "../socket/store";

const verificarArchivo = useSocketStore((s)=> s.verificarArchivo)

function enviarChunk(formData: FormData) {
      return fetch('/upload-chunk', {
      method: 'POST',
      body: formData})}

  async function subir(file: File) {
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
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('uploadId', uuidUnico);

      await enviarChunk(formData);
      const porcentaje = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      useUploadStore.getState().setProgreso(porcentaje);
      if (porcentaje == 100) {verificarArchivo()}
      
  }};

export default subir
