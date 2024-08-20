'use client'

import Image from 'next/image'

const Icon: React.FC = () => {
  return (
    <div className='logo'>
      <Image
        src='/images/favicon.ico'
        width={28}
        height={28}
        alt='ContentQL Favicon'
      />
    </div>
  )
}

export default Icon
