import { create } from "zustand";

interface UploadState {
  progreso: number;
  isSubiendo: boolean;
  error: string | null;
  setProgreso: (valor: number) => void;
  setSubiendo: (valor: boolean)=> void;
  setError: (valor: string | null)=> void;
  reset: ()=> void;
}

const useUploadStore = create<UploadState>((set)=>({
  progreso: 0,
  isSubiendo: false,
  error: null,
  setProgreso: (valor) => set({progreso: valor}),
  setSubiendo: (valor)=> set({isSubiendo: valor}),
  setError: (valor)=> set({error: valor}),
  reset: ()=> set({progreso: 0, isSubiendo: false, error: null, })
}))

export default useUploadStore
