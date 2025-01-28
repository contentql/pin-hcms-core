import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className='logo'>
      <Image
        src={'/logo.svg'}
        width={200}
        height={20}
        alt='ContentQL Logo'
        className='logo-image'
      />
    </div>
  )
}

export default Logo
