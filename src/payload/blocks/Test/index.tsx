'use client'

import { TestType } from '@payload-types'
import Link from 'next/link'

export const Test = (data: TestType) => {
  return (
    <section id='home' className='hero-area-three pt-250 rpt-115 rel z-1'>
      <div className='rel z-1 container'>
        <div className='row pt-35'>
          <div className='col-lg-8'>
            <div className='hero-three-content wow fadeInLeft delay-0-2s'>
              <h1>
                Design &amp; <i>creativity</i>
              </h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptat
                emey accusantium doloremque laudantium totam aperiam
              </p>
              <Link legacyBehavior href='/contact'>
                <a className='read-more'>
                  Get Stated <i className='far fa-arrow-right' />
                </a>
              </Link>
            </div>
          </div>
          <div className='col-xl-3 col-lg-4 mx-lg-auto'>
            <div className='hero-three-image mt-50 wow fadeInRight delay-0-2s'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src='assets/images/hero/hero-three.jpg' alt='Hero' />
            </div>
          </div>
        </div>
        <div className='hero-three-shape'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='assets/images/hero/hero-three-shape.png' alt='Shape' />
        </div>
      </div>
    </section>
  )
}
