// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports


import ApplicantInformation from '@/views/reimbursement/add/ApplicantInformation'
import ProductAddHeader from '@views/reimbursement/add/ProductAddHeader'
import ProductImage from '@views/reimbursement/add/ProductImage'

import serverAuth from '@/libs/server-auth'
import ProductOrganize from '@views/reimbursement/add/ProductOrganize'
import ProductPricing from '@views/reimbursement/add/ProductPricing'
import AddReimbursementForm from '@/views/reimbursement/add/AddReimbursementForm'

const eCommerceProductsAdd = async () => {

  const user = await serverAuth()

  console.log('user auth', user)

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductAddHeader />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <AddReimbursementForm />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ApplicantInformation />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductImage />
          </Grid>

        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductPricing />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductOrganize />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsAdd
