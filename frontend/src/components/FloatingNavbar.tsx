import { ClipboardList, FolderClosed, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingNavbarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    id: 'clipboard', label: 'Portapapeles', icon: ClipboardList
  },
  {
    id: 'files', label: 'Files', icon: FolderClosed
  },
]

export default function FloatingNavbar({ activeItem, setActiveItem }: FloatingNavbarProps) {
  return (
    <nav className="fixed left-1/2 top-5 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 p-2 rounded-full shadow-lg border-slate-800">
      {
        navItems.map((i) => {
          const isActive = (i.id === activeItem);
          const Icon = i.icon;
          return (
            <button
              className={"relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors "}
              key={i.id}
              onClick={() => setActiveItem(i.id)}>
              {
                isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )
              }
              <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`} >
                <Icon />
                <span>{i.label}</span>
              </span>

            </button>
          )
        })
      }
    </nav>
  )
}

