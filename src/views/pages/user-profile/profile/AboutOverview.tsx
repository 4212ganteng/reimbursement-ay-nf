'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

import { useAtomValue } from 'jotai'

import { authUser } from '@/jotai/authUser'
import type { AuthPayload } from '@/libs/server-auth'
import type { ProfileCommonType } from '@/types/profileTypes'



const renderList = ({ propsData }: { propsData: ProfileCommonType }) => {
  return (

    <div className='flex items-center gap-2'>
      <i className={propsData.icon} />
      <div className='flex items-center flex-wrap gap-2'>
        <Typography className='font-medium'>
          {`${propsData.property.charAt(0).toUpperCase() + propsData.property.slice(1)}:`}
        </Typography>
        <Typography> {propsData.value}</Typography>
      </div>
    </div>

  )
}



const AboutOverview = () => {

  const user = useAtomValue(authUser) as AuthPayload

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                About
              </Typography>

              {/* fullname */}
              {user && renderList({ propsData: { icon: 'tabler-user', property: 'FullName', value: user.fullName } })}


              {/* status */}
              {user && renderList({ propsData: { icon: 'tabler-check', property: 'Status', value: user.status } })}

              {/* Role */}
              {user && renderList({ propsData: { icon: 'tabler-crown', property: 'Role', value: user.Role } })}

              {/* country */}
              {user && renderList({ propsData: { icon: 'tabler-flag', property: 'Country', value: 'Indonesia' } })}

            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                Contacts
              </Typography>



              {/* phone */}
              {user && renderList({ propsData: { icon: 'tabler-phone-call', property: 'Contact', value: user.contact } })}

              {/* country */}
              {user && renderList({ propsData: { icon: 'tabler-mail', property: 'Email', value: user.email } })}
            </div>

          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                Overview
              </Typography>
              {/* {data?.overview && renderList(data?.overview)} */}

              <p>OVERVIEW DATA SUBMISSION</p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
