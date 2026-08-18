import { Copy, ClipboardPaste, Trash2, Download } from "lucide-react";
import { find } from "linkifyjs";
import { useState, useEffect } from "react";
import { useSocketStore } from "../socket/store";



export default function ClipboardArea() {
  const btn_styles = 'p-2 text-slate-400 hover:bg-slate-800 rounded-full cursor-pointer transition-colors '
  const [links, setLinks] = useState<any[]>([])
  const [text, setText] = useState("")
  const texto = useSocketStore((s) => s.texto)
  const enviarTexto = useSocketStore((s) => s.enviarTexto)

  function cambiarText(txt: string) {
    setLinks(find(txt))
    enviarTexto(txt);
    setText(txt)
  }
  useEffect(()=>{
    setText(texto)
  },[])
  useEffect(() => {
    setText(texto)
  }, [texto])

  return (
    <div
      className="absolute text-lg flex-1 min-h-0 h-[75dvh] w-full max-w-4xl flex flex-col bg-slate-900 p-4 rounded-sm"
    >
      {
        links.map((i, index) => (
          <a className="text-purple-500" key={index} target="_blank" rel="noopener noreferrer" href={i.href}>{i.href}</a>
        ))
      }
      <textarea
        autoCorrect="off"
        spellCheck={false}
        value={text}
        onChange={(e) => (cambiarText(e.target.value))}
        placeholder="Escribe aqui..."
        className="flex-1 w-full pt-3 overflow-y-auto bg-transparent outline-none resize-none text-white"

      />

      <div className=" flex items-center justify-center gap-5 pt-3 border-t border-slate-800 ">
        <button className={btn_styles}
        onClick={async()=>{
          await navigator.clipboard.writeText(text)
        }}
        >
          <Copy size={30} />
        </button>

        <button onClick={async ()=>{
            const text_paste = await navigator.clipboard.readText();
            setText(text_paste)}} className={btn_styles}>
          <ClipboardPaste size={30} />
        </button>

        <button
          className={btn_styles}
          onClick={() => cambiarText('')}
        >
          <Trash2 size={30} />
        </button>

        <button className={btn_styles}>
          <Download size={30} />
        </button>


      </div>

    </div>
  )
}
