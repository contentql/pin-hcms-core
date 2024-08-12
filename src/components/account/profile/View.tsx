import Sidebar from '../common/Sidebar'
import { User } from '@payload-types'

import ProfileForm from './ProfileForm'

interface Props {
  user: User
}

const ProfileView: React.FC<Props> = ({ user }) => {
  return (
    <div className='flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28'>
      <Sidebar />
      <main className='min-h-screen w-full py-1'>
        <ProfileForm user={user} />
      </main>
    </div>
  )
}

export default ProfileView
