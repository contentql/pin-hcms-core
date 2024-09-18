import type { SiteSetting } from '@payload-types'
import Image from 'next/image'
import { HiChevronDown } from 'react-icons/hi'

import { generateMenuLinks } from '@/utils/generateMenuLinks'

const Navbar = ({ metadata }: { metadata: SiteSetting }) => {
  const { navbar } = metadata
  const { logo, menuLinks } = navbar

  let logoDetails = {
    url: '',
    alt: '',
  }

  if (Object.keys(logo).length && logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl !== 'string') {
    logoDetails = {
      url: logo.imageUrl.sizes?.blogImageSize2?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  return (
    <header className='fixed left-0 top-0 z-10 w-full bg-slate-700/50 backdrop-blur-lg'>
      <div className='container flex h-14 items-center justify-between'>
        {logoDetails.url && (
          <Image
            src={logoDetails.url}
            alt={logoDetails.alt}
            width={40}
            height={40}
          />
        )}

        {navLinks?.length > 0 && (
          <nav>
            <ul className='flex gap-8'>
              {navLinks.map(({ label, children, href, newTab, type }) => (
                <li className='flex list-none items-center gap-1' key={label}>
                  {label}{' '}
                  {children && (
                    <HiChevronDown className='size-4 text-slate-100' />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
