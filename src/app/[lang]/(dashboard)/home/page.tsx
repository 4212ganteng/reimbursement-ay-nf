// MUI Imports
import Grid from '@mui/material/Grid2'

import CongratulationsJohn from '@/views/dashboard/Congratulations'
import BarChartRevenueGrowth from '@/views/dashboard/DonutChartGeneratedLeads'
import LineChartProfit from '@/views/dashboard/LineChartProfit'
import RadialBarChart from '@/views/dashboard/RadialBarChart'
import RevenueReport from '@/views/dashboard/RevenueReport'
import type { DataType } from '@/views/dashboard/StatisticsCard';
import StatisticsCard from '@/views/dashboard/StatisticsCard'
import { DashboarRdManager } from '@/server/reimbursement'




const HomeDashboard = async () => {
  // Vars
  const data = await DashboarRdManager()


  const dataStatisticCard: DataType[] = [
    {
      color: 'info',
      stats: data.totUser,
      title: 'Employee',
      icon: 'tabler-users'
    },
    {
      title: 'Pending',
      stats: data.pending.length,
      color: 'primary',
      icon: 'tabler-chart-pie-2'
    },

    {
      color: 'error',
      stats: data.rejected.length,
      title: 'Rejected',
      icon: 'tabler-shopping-cart'
    },
    {
      color: 'success',
      stats: data.approved.length,
      title: 'Approved',
      icon: 'tabler-currency-dollar'
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <CongratulationsJohn totPriceAll={data.totPriceAll} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <StatisticsCard data={dataStatisticCard} />
      </Grid>
      <Grid size={{ xs: 12, xl: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <LineChartProfit seriesData={data.seriesLine} percentRejected={data.rejectedPercent} totPriceRejected={data.totPriceRejected} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <RadialBarChart count={data.countPending} percent={data.pendingPercent} totPrice={data.totPricePending} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, xl: 12 }}>
            <BarChartRevenueGrowth seriesData={[data.countPending, data.countRejected, data.countApproved]} percentApproved={data.approvedPercent} totPriceApproved={data.totPriceApproved} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, xl: 8 }}>
        <RevenueReport lineSeries={data.seriesPerMonth} totPriceApproved={data.totPriceApproved} totPriceRejected={data.totPriceRejected} />
      </Grid>

    </Grid>
  )
}

export default HomeDashboard
