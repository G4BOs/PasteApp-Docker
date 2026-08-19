import { DownloadIcon } from "lucide-react";
import { useSocketStore } from "../socket/store";

function UploadFileArea() {
  const ultimoArchivo = useSocketStore((s) => s.ultArchivo);
  const archivoInfo = useSocketStore((s) => s.archivoInfo);
  //const tipoArchivo = useSocketStore((s) => s.archivoInfo?.tipo)


  const URL = ''//'https://192.168.88.221:8000'



  function Multimedia() {
    let contenido;
    switch (archivoInfo?.tipo) {
      case "video":
        contenido = <video className="w-[60%]" src={`${URL}/video`} controls></video>;
        break
      case "imagen":
        contenido = <img className="w-[50%] h-auto block m-auto" src={`${URL}/imagen`} />;
        break
      case "audio":
        contenido = <audio className="inline-block max-h-[70]" src={`${URL}/audio`} controls />
        break
      default:
        contenido = <div className="w-[50%] h-[200px]"></div>
    }
    return (<div className="h-[400px] content-center w-full overflow-auto">{contenido}</div>)
  }

  return (
    <div className="flex h-full flex-col">

            <section className="flex flex-col font-bold items-center  gap-2 flex h-full ">

        {Multimedia()}

        <h1>{ultimoArchivo}</h1>
        <a href={`{URL}/download`}>
        <DownloadIcon className="h-10 w-30 border rounded-full"/>
      </a>
      </section> 
    </div>

  )
}

export default UploadFileArea
