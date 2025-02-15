// MUI Imports

// Type Imports
import { UserService } from '@/app/services/user.service'
import UserListTable from '@/views/auth/user/list/UserListTable'

// Component Imports

const UserListApp = async () => {

  const data = await UserService.getAllUsers()

  return <UserListTable tableData={data} />


}

export default UserListApp
