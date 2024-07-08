'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactJson from 'react-json-view'

import { cn } from '@/utils/cn'

const tabVariant = {
  active: {
    width: '55%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
  inactive: {
    width: '15%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
}

const tabTextVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.1,
    },
    transitionEnd: { display: 'none' },
  },
}

const TabComponent = ({
  tabs,
  defaultIndex = 0,
}: {
  tabs: any
  defaultIndex?: number
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--active-color',
      tabs[activeTabIndex].color,
    )
  }, [activeTabIndex, tabs])

  // Default to a tab based on the URL hash value
  useEffect(() => {
    const tabFromHash = tabs.findIndex(
      (tab: any) => `#${tab.id}` === window.location.hash,
    )
    setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex)
  }, [tabs, defaultIndex])

  const onTabClick = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <div className='container'>
      <div className='m-auto max-w-7xl'>
        <ul className='tab-links mx-auto mt-[40px]' role='tablist'>
          {tabs.map((tab: any, index: number) => (
            <motion.li
              key={tab.id}
              className={cn('tab', { active: activeTabIndex === index })}
              role='presentation'
              variants={tabVariant}
              animate={activeTabIndex === index ? 'active' : 'inactive'}>
              <a href={`#${tab.id}`} onClick={() => onTabClick(index)}>
                {tab.icon}
                <motion.span variants={tabTextVariant}>{tab.title}</motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
        {tabs.map((tab: any, index: number) => (
          <tab.content
            key={tab.id}
            id={`${tab.id}-content`}
            active={activeTabIndex === index}
            data={tab?.data}
          />
        ))}
      </div>
    </div>
  )
}

export default TabComponent

const tabContentVariant = {
  active: {
    display: 'block',
    transition: {
      staggerChildren: 0.2,
    },
  },
  inactive: {
    display: 'none',
  },
}

export const TabContent = ({
  id,
  active,
  data,
}: {
  id: any
  active: any
  data: any
}) => {
  const isValidJson = data && typeof data === 'object'
  return (
    <motion.div
      role='tabpanel'
      id={id}
      className='codeContainer mx-auto mt-10 h-screen w-full overflow-scroll rounded-2xl bg-zinc-800 p-4 md:h-[500px] lg:max-w-4xl'
      variants={tabContentVariant}
      animate={active ? 'active' : 'inactive'}
      initial='inactive'>
      {isValidJson ? (
        <ReactJson src={data} theme='eighties' collapsed={false} />
      ) : (
        <div className='text-white'>Data not available</div>
      )}
    </motion.div>
  )
}
