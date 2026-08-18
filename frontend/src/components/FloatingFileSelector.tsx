import { UploadIcon , Paperclip} from "lucide-react";
import subir from "../scripts/subirArchivo";
import { useState } from "react";
import useUploadStore from "../hooks/useUploadStore";



function FloatingFileSelector(){
  const [archivoAct, setArchivoAct] = useState<File | null >(null)
  const porcentajeSubida = useUploadStore((s)=>s.progreso)
    return(
      <div className="rounded-full border border-slate-500 left-1/2 -translate-x-1/2 absolute fixed h-[50px] w-[90dvw] max-w-[800px] bg-slate-900 bottom-5 z-50">
      <section className="relative flex-1 flex justify-between gap-2 items-center">
        <input
          id="inputFile"
          type="file"
          name="inputFile"
          hidden
          onChange={(e)=> setArchivoAct(e.target!.files![0])}
        />
        <Paperclip size={40} className="p-1 text-slate-500"/>
      <label htmlFor="inputFile" className="overflow-hidden">
        <span style={{width: `${porcentajeSubida}%`}} className={`bg-[#0f01] left-0 top-0 rounded-full h-full absolute`}>
        </span>
        <div className="flex flex-col align-center justify-center h-full">
          <h2 className="text-center h-full font-bold">{archivoAct?.name ? archivoAct?.name : "Elegir archivo"}</h2>
        </div>
      </label>
      <button disabled={false} className="disabled:bg-black p-2 text-green-400 transition-transform duration-200 ease-out active:scale-95 active:duration-0
        hover:scale-105"
        onClick={()=> subir(archivoAct!)}
        >
          <UploadIcon size={ archivoAct?.name ? '40' : "30" }/>
      </button>

      </section>

      </div>
    )
  }

export default FloatingFileSelector
