// MUI Imports
import Grid from '@mui/material/Grid2'

import CongratulationsJohn from '@/views/dashboard/Congratulations'
import BarChartRevenueGrowth from '@/views/dashboard/DonutChartGeneratedLeads'
import LineChartProfit from '@/views/dashboard/LineChartProfit'
import RadialBarChart from '@/views/dashboard/RadialBarChart'
import RevenueReport from '@/views/dashboard/RevenueReport'
import StatisticsCard from '@/views/dashboard/StatisticsCard'
import { DashboarRdManager } from '@/server/reimbursement'




const EcommerceDashboard = async () => {
  // Vars
  const data = await DashboarRdManager()

  console.log({ data })


  const dataStatisticCard = [
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
        <CongratulationsJohn />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <StatisticsCard data={dataStatisticCard} />
      </Grid>
      <Grid size={{ xs: 12, xl: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <LineChartProfit />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, xl: 6 }}>
            <RadialBarChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6, xl: 12 }}>
            <BarChartRevenueGrowth />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, xl: 8 }}>
        <RevenueReport />
      </Grid>

    </Grid>
  )
}

export default EcommerceDashboard
