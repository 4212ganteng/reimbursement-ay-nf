// MUI Imports
import { redirect } from 'next/navigation'


// Component Imports



import serverAuth from '@/libs/server-auth'
import AddReimbursementForm from '@/views/reimbursement/add/AddReimbursementForm'

const eCommerceProductsAdd = async () => {

  const user = await serverAuth()

  if (!user) {
    redirect('/[lang]/login')
  }

  console.log('user auth', user)

  return (

    <AddReimbursementForm authData={user} />

    // <Grid container spacing={6}>
    //   <Grid size={{ xs: 12 }}>
    //     <ProductAddHeader />
    //   </Grid>
    //   <Grid size={{ xs: 12, md: 8 }}>
    //     <Grid container spacing={6}>
    //       <Grid size={{ xs: 12 }}>
    //         <AddReimbursementForm />
    //       </Grid>
    //       <Grid size={{ xs: 12 }}>
    //         <ApplicantInformation />
    //       </Grid>
    //       <Grid size={{ xs: 12 }}>
    //         <ProductImage />
    //       </Grid>

    //     </Grid>
    //   </Grid>
    //   <Grid size={{ xs: 12, md: 4 }}>
    //     <Grid container spacing={6}>
    //       <Grid size={{ xs: 12 }}>
    //         <ProductPricing />
    //       </Grid>
    //       <Grid size={{ xs: 12 }}>
    //         <ProductOrganize />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  )
}

export default eCommerceProductsAdd
