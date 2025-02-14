// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { UsersType } from '@/types/userTypes'

// Component Imports
import UserListTable from './UserListTable'

const UserList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        {/* <UserListCards /> */}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <UserListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
