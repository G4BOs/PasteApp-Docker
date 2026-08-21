import './App.css'
import FloatingNavbar from './components/FloatingNavbar'
import ClipboardArea from './components/ClipboardArea'
import { motion, AnimatePresence } from 'framer-motion'
import FilesArea from './components/FilesArea'
import FloatingFileSelector from './components/FloatingFileSelector'
import { useTabStore } from './hooks/useTabStore'


function App() {
  const savedActiveItem = useTabStore((s)=>s.activeTab)
  const saveActiveItem = useTabStore((s)=>s.setActiveTab)



  return (
    <div className='font-[Arial] h-[100dvh] w-screen flex flex-col bg-[#001] text-white overflow-hidden p-4'>
      <FloatingNavbar activeItem={savedActiveItem} setActiveItem={saveActiveItem} />

      <main className='flex-1 relative flex flex-col items-center mt-20 h-full'>
        <AnimatePresence mode='wait'>
          {
            savedActiveItem === 'clipboard' && (
              <motion.div
                key={'clipboard'}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className='w-full flex justify-center'
              >
                <ClipboardArea />
              </motion.div>
            )}

          {
            savedActiveItem === 'files' && (
              <motion.div
                key={'files'}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className='w-full flex justify-center'
              >
                <FilesArea />

              </motion.div>
            )
          }

        </AnimatePresence>
      </main>
      { (savedActiveItem == 'files') && <FloatingFileSelector/>}
    </div>
  )
}

export default App
