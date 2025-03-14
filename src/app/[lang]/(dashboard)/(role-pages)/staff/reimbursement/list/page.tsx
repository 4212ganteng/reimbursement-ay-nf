// MUI Imports
import { redirect } from 'next/navigation'

import Grid from '@mui/material/Grid2'

// Component Imports
import { reimbursementService } from '@/app/services/reimbursement.service'
import ReimbursementListApproveOrReject from '@/views/reimbursement/list/ApproveOrPending/ReimbursementListApproveOrReject'
import serverAuth from '@/libs/server-auth'



const ReimbursementsList = async () => {
  const user = await serverAuth()

  if (!user) {
    redirect('/login')
  }

  const data = await reimbursementService.getAllReimbustmenByUser(user.id)



  return (
    <Grid container spacing={6}>
      {/* <Grid size={{ xs: 12 }}>
        <ProductCard />
      </Grid> */}
      <Grid size={{ xs: 12 }}>
        <ReimbursementListApproveOrReject reimbusData={data} />
      </Grid>
    </Grid>
  )
}

export default ReimbursementsList
