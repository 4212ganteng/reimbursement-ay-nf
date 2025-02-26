// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { reimbursementService } from '@/app/services/reimbursement.service'
import ReimbursementListApproveOrReject from '@/views/reimbursement/list/ApproveOrPending/ReimbursementListApproveOrReject'
import ProductCard from '@views/reimbursement/list/ProductCard'



const ReimbursementsRejectedList = async () => {
  const data = await reimbursementService.getAllReimbustmen()

  console.log({ data })

  const accumulatedData = data.reduce(
    (acc, item) => {
      if (item.status === 'PENDING') {
        acc.pending += item.price;
      } else if (item.status === 'REJECTED') {
        acc.rejected += item.price;
      } else if (item.status === 'APPROVED') {
        acc.approved += item.price;
      }


      return acc;
    },
    { pending: 0, rejected: 0, approved: 0 }
  );

  const counts = data.reduce(
    (acc, item) => {
      if (item.status === 'PENDING') {
        acc.pending += 1;
      } else if (item.status === 'REJECTED') {
        acc.rejected += 1;
      } else if (item.status === 'APPROVED') {
        acc.approved += 1;
      }


      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 }
  );

  const dataStats = [
    {
      title: 'Total ',
      value: accumulatedData.approved + accumulatedData.rejected + accumulatedData.pending,
      icon: 'tabler-smart-home',
      desc: counts.approved + counts.rejected + counts.pending,
      change: 5.7
    },
    {
      title: 'Approved ',
      value: accumulatedData.approved,
      icon: 'tabler-device-laptop',
      desc: counts.approved,
      change: 12.4
    },
    {
      title: 'Pending ',
      value: accumulatedData.pending,
      icon: 'tabler-gift',
      desc: counts.pending
    },
    {
      title: 'Rejected ',
      value: accumulatedData.rejected,
      icon: 'tabler-wallet',
      desc: counts.rejected,
      change: -3.5
    }
  ]



  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductCard data={dataStats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ReimbursementListApproveOrReject reimbusData={data} />
      </Grid>
    </Grid>
  )
}

export default ReimbursementsRejectedList
