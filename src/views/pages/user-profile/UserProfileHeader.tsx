'use client'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { useAtomValue } from 'jotai'

import { authUser } from '@/jotai/authUser'
import type { AuthPayload } from '@/libs/server-auth'

// Env Imports

const url = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/reimbursement-ayu-nur-fadillah/reimbust`


const UserProfileHeader = () => {

  const user = useAtomValue(authUser) as AuthPayload


  return (
    <Card>
      <CardMedia image='/images/pages/profile-banner.png' className='bs-[250px]' />
      <CardContent className='flex gap-5 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-bs-md mbs-[-40px] border-[5px] mis-[-5px] border-be-0  border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={user.avatarUrl ? `${url}/${user?.id}/${user?.avatarUrl}` : '/images/avatars/1.png'} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full justify-start self-end flex-col items-center gap-6 sm-gap-0 sm:flex-row sm:justify-between sm:items-end '>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>{user?.fullName}</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                <i className='tabler-mail' />
                <Typography className='font-medium'>{user?.email}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='tabler-phone-call' />
                <Typography className='font-medium'>{user?.contact}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='tabler-map-pin' />
                <Typography className='font-medium'>Indonesia</Typography>
              </div>
            </div>
          </div>
          <Button variant='contained' className='flex gap-2'>
            <i className='tabler-user-check !text-base'></i>
            <span>{user.Role}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
