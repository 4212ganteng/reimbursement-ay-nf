// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { reimbursementService } from '@/app/services/reimbursement.service'
import ReimbursementList from '@/views/reimbursement/list/ReimbursementList'



const ReimbursementsList = async () => {
  const data = await reimbursementService.getPendingReimbustmen()



  return (
    <Grid container spacing={6}>
      {/* <Grid size={{ xs: 12 }}>
        <ProductCard />
      </Grid> */}
      <Grid size={{ xs: 12 }}>
        <ReimbursementList reimbusData={data} />
      </Grid>
    </Grid>
  )
}

export default ReimbursementsList
