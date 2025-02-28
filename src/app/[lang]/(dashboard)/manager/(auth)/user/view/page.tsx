// React Imports

// Next Imports
import dynamic from 'next/dynamic'

// Type Imports


// Component Imports
import type { User } from '@prisma/client'

import { UserService } from '@/app/services/user.service'
import UserProfile from '@views/pages/user-profile'

// Data Imports
// import { getProfileData } from '@/app/server/actions'

const ProfileTab = dynamic(() => import('@views/pages/user-profile/profile'))

const ConnectionsTab = dynamic(() => import('@views/pages/user-profile/connections'))

// Vars
const tabContentList = (data: User[]) => ({
  profile: <ProfileTab />,
  teams: <ConnectionsTab data={data} />
})



const ProfilePage = async () => {
  // Vars
  const data = await UserService.getAllUsers()


  return <UserProfile tabContentList={tabContentList(data)} />
}

export default ProfilePage
