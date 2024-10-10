'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import { trpc } from '@/trpc/client'

const AnimatedText = ({ text }: { text: string }) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05 },
      }))
    }
  }, [controls, inView])

  return (
    <motion.h1
      ref={ref}
      className='mb-6 bg-gradient-to-r from-purple-400 to-pink-500  bg-clip-text text-2xl font-bold text-transparent md:text-7xl'>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}

const ParallaxBackground = () => {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full bg-white'
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

const GlowingButton = ({
  children,
  setOpen,
}: {
  children: React.ReactNode
  setOpen: Function
}) => (
  <motion.button
    onClick={setOpen(true)}
    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(236,72,153,0.7)' }}
    whileTap={{ scale: 0.95 }}
    className='inline-flex transform items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-lg font-bold text-white transition duration-300 ease-in-out'>
    {children}
  </motion.button>
)

function Welcome() {
  const [open, setOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const { mutate: runSeedMutation, isPending: isSeedLoading } =
    trpc.seed.runSeed.useMutation({
      onSuccess: () => {
        setOpen(false)
        window.location.reload()
      },
    })

  useEffect(() => {
    let timer: any
    if (isSeedLoading) {
      timer = setTimeout(() => {
        setShowPopup(true)
      }, 60000)
    } else {
      clearTimeout(timer)
      setShowPopup(false)
    }
    return () => clearTimeout(timer)
  }, [isSeedLoading])

  const handleSeedData = () => {
    runSeedMutation()
  }

  return (
    <div className='relative flex min-h-[calc(100vh-180px)] flex-col items-center justify-center overflow-hidden text-white'>
      <ParallaxBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className='absolute inset-0 '
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='relative z-10 text-center'>
        <AnimatedText text='Welcome to ContentQL' />

        <motion.p
          className='mx-auto mb-12 max-w-2xl text-xl text-gray-300 md:text-2xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}>
          Embark on a journey through digital realms, where innovation meets
          imagination.
        </motion.p>

        <GlowingButton setOpen={() => setOpen}>Load Demo Data</GlowingButton>
      </motion.div>
      <motion.div
        className='pointer-events-none absolute bottom-0 left-0 h-1/2 w-full'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}>
        <div className='h-full w-full ' />
      </motion.div>
      {open && (
        <div
          className='relative z-[100]'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal={false}>
          <div className='fixed inset-0 bg-base-100 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-[100] w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-rounded-box bg-base-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='min-w-96 bg-base-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  {showPopup && (
                    <div className='absolute left-2 right-2 top-2  pt-2  text-left'>
                      <div
                        className='flex w-full items-center justify-between rounded-lg bg-gray-800 p-2 text-sm text-purple-400'
                        role='alert'>
                        <div>
                          Seeding demo data is taking longer than expected.
                          Please wait...
                        </div>
                        <IoMdClose
                          className='cursor-pointer'
                          onClick={() => setShowPopup(false)}
                          size={24}
                        />
                      </div>
                    </div>
                  )}
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-base font-semibold leading-6 text-base-content'
                        id='modal-title'>
                        Load demo data
                      </h3>
                      <div className='mt-4'>
                        <p className='text-sm text-base-content/70'>
                          {isSeedLoading ? (
                            <div className=' flex min-w-96 flex-col items-center justify-center gap-y-4'>
                              <div className='mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600' />
                              <h4 className='text-2xl font-semibold'>
                                Loading Demo Data...
                              </h4>
                              <p>
                                Once done you&apos;ll be redirected to homepage.
                                Please do not exit this page.
                              </p>
                            </div>
                          ) : (
                            <div>
                              Load demo data to quickly explore the website’s
                              full range of features and functionalities. This
                              allows you to preview the site as it would appear
                              with sample content, giving you a comprehensive
                              look at its capabilities
                            </div>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-base-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    disabled={isSeedLoading}
                    onClick={() => handleSeedData()}
                    className='ring-none mt-3 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-base-100 shadow-sm sm:mt-0 sm:w-auto'>
                    {isSeedLoading
                      ? ' Loading demo data...'
                      : ' Load demo data'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Welcome
