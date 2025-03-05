// MUI Imports
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

// Type Imports


// Component Imports
import type { User } from '@prisma/client'

import CustomIconButton from '@core/components/mui/IconButton'
import OptionMenu from '@core/components/option-menu'

const url = `${process.env.R2_PUBLIC_URL}/reimbursement-ayu-nur-fadillah/reimbust`


const Connections = ({ data }: { data?: User[] }) => {
  return (
    <Grid container spacing={6}>
      {data &&
        data.map((item, index) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card className='relative'>
                <OptionMenu
                  iconClassName='text-textDisabled'
                  options={[
                    'Share Connection',
                    'Block Connection',
                    { divider: true },
                    {
                      text: 'Delete',
                      menuItemProps: { className: 'text-error hover:bg-[var(--mui-palette-error-lightOpacity)]' }
                    }
                  ]}
                  iconButtonProps={{ className: 'absolute top-6 end-5 text-textDisabled' }}
                />
                <CardContent className='flex items-center flex-col gap-6'>
                  <Avatar src={`${url}/${item.id}/${item.avatarUrl}`} className='!mbs-5 bs-[100px] is-[100px]' />
                  <div className='flex flex-col items-center'>
                    <Typography variant='h5'>{item.fullName}</Typography>
                    <Typography>{item.role}</Typography>
                  </div>


                  <div className='flex items-center gap-4'>
                    <Button
                      variant='contained'
                      startIcon={<i className='tabler-phone-call' />}
                    >
                      Telephone
                    </Button>
                    <CustomIconButton variant='tonal' color='secondary'>
                      <i className='tabler-mail' />
                    </CustomIconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Connections
