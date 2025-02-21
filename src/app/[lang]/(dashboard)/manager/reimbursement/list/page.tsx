// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ProductCard from '@views/reimbursement/list/ProductCard'
import ReimbursementList from '@/views/reimbursement/list/ReimbursementList'
import { reimbursementService } from '@/app/services/reimbursement.service'



const ReimbursementsList = async () => {
  const data = await reimbursementService.getPendingReimbustmen()



  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ReimbursementList reimbusData={data} />
      </Grid>
    </Grid>
  )
}

export default ReimbursementsList
