const Sidebar: React.FC = () => {
  return (
    <aside className='hidden py-4 md:block md:w-1/3 lg:w-1/4'>
      <div className='sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-sm'>
        <h2 className='mb-4 pl-3 text-2xl font-semibold'>Settings</h2>

        <a
          href='/profile'
          className='flex items-center rounded-full border px-3 py-2.5 font-semibold'>
          Account Settings
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
