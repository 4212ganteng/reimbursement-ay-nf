// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { reimbursementService } from '@/app/services/reimbursement.service'
import ReimbursementListApproveOrReject from '@/views/reimbursement/list/ApproveOrPending/ReimbursementListApproveOrReject'



const ReimbursementsRejectedList = async () => {
  const data = await reimbursementService.getRejectedReimbustmen()



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

export default ReimbursementsRejectedList
