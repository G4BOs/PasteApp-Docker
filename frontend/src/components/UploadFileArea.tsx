import { DownloadIcon } from "lucide-react";
import { useSocketStore } from "../socket/store";

function UploadFileArea() {
  const ultimoArchivo = useSocketStore((s) => s.ultArchivo);
  //const archivoInfo = useSocketStore((s) => s.archivoInfo);
  const tipoArchivo = useSocketStore((s) => s.archivoInfo?.tipo)





  function Multimedia() {
    let contenido;
    switch (tipoArchivo) {
      case "video":
        contenido = <video className="w-[60%]" src={`/video`} controls></video>;
        break
      case "imagen":
        contenido = <img className="w-[50%]" src={`/imagen`} />;
        break
      case "audio":
        contenido = <audio className="max-h-[70]" src="/audio" controls />
        break
      default:
        contenido = <div className="w-[50%] h-[200px]"></div>
    }
    return contenido
  }

  return (
    <div className="flex h-full flex-col">

            <section className="flex flex-col font-bold items-center  gap-4 flex h-full ">

        {Multimedia()}

        <h1>{ultimoArchivo}</h1>
        <a href="/download">
        <DownloadIcon className="h-10 w-30 border rounded-full"/>
      </a>
      </section> 
    </div>

  )
}

export default UploadFileArea
