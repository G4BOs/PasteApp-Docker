import { useState } from 'react'
import './App.css'
import FloatingNavbar from './components/FloatingNavbar'
import ClipboardArea from './components/ClipboardArea'
import { motion, AnimatePresence } from 'framer-motion'
import FilesArea from './components/FilesArea'
import FloatingFileSelector from './components/FloatingFileSelector'

function App() {
  const [activeItem, setActiveItem] = useState('clipboard')


  return (
    <div className='font-[Arial] h-[100dvh] w-screen flex flex-col bg-[#001] text-white overflow-hidden p-4'>
      <FloatingNavbar activeItem={activeItem} setActiveItem={setActiveItem} />

      <main className='flex-1 relative flex flex-col items-center mt-20 h-full'>
        <AnimatePresence mode='wait'>
          {
            activeItem === 'clipboard' && (
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
            activeItem === 'files' && (
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
      { (activeItem == 'files') && <FloatingFileSelector/>}
    </div>
  )
}

export default App
