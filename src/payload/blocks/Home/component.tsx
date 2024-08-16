import { Params } from '../types'
import { HomeType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

interface HomeProps extends HomeType {
  params: Params
}

const Home: React.FC<HomeProps> = ({ params, ...block }) => {
  return (
    <div className='mx-auto max-w-7xl'>
      <section className='relative flex min-h-screen flex-col items-center justify-between py-10'>
        <div className=' hidden w-full items-center justify-between md:flex'>
          <p className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
            Get Started with src/payload/blocks
          </p>
          <p className='inline-flex items-center gap-x-2 text-lg font-semibold'>
            By
            <Image src='/favicon.ico' alt='icon' width={32} height={32} />
            Analytica
          </p>
        </div>
        <div className='sticky top-0 flex w-full justify-center bg-transparent py-4 md:hidden'>
          Get Started with src/payload/blocks
        </div>
        <div>
          <div className='absolute left-[50%] top-[40%] h-[10%] w-[20%] -translate-x-1/2 rounded-full bg-primary blur-[110px]'></div>
          <h1 className='w-full max-w-2xl text-center text-3xl font-bold text-base-content md:text-4xl lg:text-7xl'>
            {block?.heading}
          </h1>
          <h1 className='mt-3 w-full max-w-2xl text-center text-3xl font-bold text-base-content md:text-4xl lg:text-7xl'>
            {block?.sub_heading}
          </h1>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <Link
            href='/sign-in'
            className='group w-full cursor-pointer space-y-4 rounded-rounded-box px-2  py-4 transition-all duration-300 hover:bg-base-content/10 md:w-1/5'>
            <h1 className='inline-flex items-center gap-x-4 text-2xl font-bold transition-all duration-300'>
              Sign In
              <span className='group-hover:translate-x-2'>
                <FaArrowRight />
              </span>
            </h1>
            <p className='text-base-content/70'>
              Welcome! Please sign in to your account to access all your
              features, and services.
            </p>
          </Link>
          <Link
            href='/authors'
            className='group w-full cursor-pointer space-y-4 rounded-rounded-box px-2  py-4 transition-all duration-300 hover:bg-base-content/10 md:w-1/5'>
            <h1 className='inline-flex items-center gap-x-4 text-2xl font-bold transition-all duration-300'>
              Authors
              <span className='group-hover:translate-x-2'>
                <FaArrowRight />
              </span>
            </h1>
            <p className='text-base-content/70'>
              Meet the creative minds behind our compelling blogs, where each
              author brings expertise.
            </p>
          </Link>
          <Link
            href='/blogs'
            className='group w-full cursor-pointer space-y-4 rounded-rounded-box px-2  py-4 transition-all duration-300 hover:bg-base-content/10 md:w-1/5'>
            <h1 className='inline-flex items-center gap-x-4 text-2xl font-bold transition-all duration-300'>
              Blogs
              <span className='group-hover:translate-x-2'>
                <FaArrowRight />
              </span>
            </h1>
            <p className='text-base-content/70'>
              Discover a wealth of knowledge and inspiration in our insightful
              blog collection.
            </p>
          </Link>
          <Link
            href='/tags'
            className='group w-full cursor-pointer space-y-4 rounded-rounded-box px-2  py-4 transition-all duration-300 hover:bg-base-content/10 md:w-1/5'>
            <h1 className='inline-flex items-center gap-x-4 text-2xl font-bold transition-all duration-300'>
              Tags
              <span className='group-hover:translate-x-2'>
                <FaArrowRight />
              </span>
            </h1>
            <p className='text-base-content/70'>
              Dive deeper into our blog topics using our convenient tags page.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
