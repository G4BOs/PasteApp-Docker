export type TipoArchivo = 'video' | 'imagen' | 'audio' | 'otro';

export interface ArchivoInfo {
  tipo: TipoArchivo;
  ruta: string;
  nombre: string;
}

export interface ServerToClientEvents {
  ult_archivo: (nombre: string) => void;
  txt_recive: (texto: string) => void;
  cargar_archivo: (info: ArchivoInfo) => void;
}

export interface ClientToServerEvents {
  conectado: (data: Record<string, never>) => void;
  txt_change: (texto: string) => void;
  verificar_archivo_disponible: () => void;
}
