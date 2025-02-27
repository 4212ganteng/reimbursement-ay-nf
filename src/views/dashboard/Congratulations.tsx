'use client'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

import { useAtomValue } from 'jotai'

import { authUser } from '@/jotai/authUser'
import type { AuthPayload } from '@/libs/server-auth'

const CongratulationsJohn = ({ totPriceAll }: { totPriceAll: number }) => {
  const user = useAtomValue(authUser) as AuthPayload


  return (
    <Card>
      <Grid container>
        <Grid size={{ xs: 8 }}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.5'>
              Welcome {user.fullName} 🎉
            </Typography>
            <Typography variant='subtitle1' className='mbe-2'>
              Reimursement Tracking App
            </Typography>
            <Typography variant='h4' color='primary.main' className='mbe-1'>
              {totPriceAll}
            </Typography>
            <Button variant='contained' color='primary'>
              View Report
            </Button>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <div className='relative bs-full is-full'>
            <img
              alt='Congratulations John'
              src='/images/illustrations/characters/8.png'
              className='max-bs-[150px] absolute block-end-0 inline-end-6 max-is-full'
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CongratulationsJohn
