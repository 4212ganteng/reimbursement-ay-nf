// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { DashboarRdManager } from '@/server/reimbursement'
import ReimbursementListApproveOrReject from '@/views/reimbursement/list/ApproveOrPending/ReimbursementListApproveOrReject'
import ProductCard from '@views/reimbursement/list/ProductCard'
import { reimbursementService } from '@/app/services/reimbursement.service'



const ReimbursementsRejectedList = async () => {
  const data = await DashboarRdManager()
  const dataReimbursement = await reimbursementService.getAllReimbustmen()

  console.log({ data })


  const dataStats = [
    {
      title: 'Total ',
      value: data.totPriceAll,
      icon: 'tabler-smart-home',
      desc: data.countAllReimbustmen,
      change: 5.7
    },
    {
      title: 'Pending ',
      value: data.totPricePending,
      icon: 'tabler-gift',
      desc: data.countPending
    },
    {
      title: 'Rejected ',
      value: data.totPriceRejected,
      icon: 'tabler-wallet',
      desc: data.countRejected,
      change: -3.5
    },
    {
      title: 'Approved ',
      value: data.totPriceApproved,
      icon: 'tabler-device-laptop',
      desc: data.countApproved,
      change: 12.4
    }

  ]



  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductCard data={dataStats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ReimbursementListApproveOrReject reimbusData={dataReimbursement} isReport={true} />
      </Grid>
    </Grid>
  )
}

export default ReimbursementsRejectedList
