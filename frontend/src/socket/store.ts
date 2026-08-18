import { create } from "zustand";
import { socket } from "./socket";
import type { ArchivoInfo } from "./types";

interface SocketState {
  texto: string;
  ultArchivo: string;
  archivoInfo: ArchivoInfo | null;
  enviarTexto: (texto: string) => void;
}

export const useSocketStore = create<SocketState>((set) => {
  socket.on("txt_recive", (texto) => {
    set({ texto });
    console.log(texto)
  });

  socket.on("ult_archivo", (nombre) => {
    set({ ultArchivo: nombre });
    socket.emit("verificar_archivo_disponible")
  });

  socket.on("cargar_archivo", (info) => {
    set({ archivoInfo: info })
  });

  socket.emit("conectado",{});

  return {
    texto: "",
    ultArchivo: "",
    archivoInfo: null,
    enviarTexto: (texto) => {
      socket.emit("txt_change", texto)
    }
  }
})
