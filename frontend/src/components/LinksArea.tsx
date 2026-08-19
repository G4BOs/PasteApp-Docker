import { useReducer } from "react"
import { ArrowDown, ArrowUp } from "lucide-react";

const toggleValue = (state: boolean): boolean => !state;

function LinksArea({links}: {links:any[] }){
  const [isActive,toggle] = useReducer(toggleValue,false)

  return (
    (links.length > 0 ) &&
    <section className="p-1 flex flex-col gap-1">
      <button onClick={toggle} className={`w-full h-[40px] border border-slate-500 rounded-sm flex justify-between p-2`}>
         Links detectados: {links.length}  {isActive ? <ArrowDown className=""/> : (<ArrowUp/>)}
     </button>
     { isActive && <section className="border border-slate-500 rounded-sm w-full h-[150px] overflow-scroll">
       <ul className="p-2"> 
       {
        links.map((i, index) => (
          <li className="border-b border-slate-500"><a className="text-purple-500" key={index} target="_blank" rel="noopener noreferrer" href={i.href}>{i.href}</a></li>
        ))
        }
       </ul>
       </section>}
    </section>)

}

export default LinksArea
