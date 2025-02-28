'use client'

import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Component Imports
import { InputAdornment } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'



type Props = {
  open: boolean
  handleClose: () => void
  formAction: (payload: FormData) => void
  state: any,
  pending: boolean
}

const roleOption = ['MANAGER', 'STAFF', 'FINANCE']



const AddUserDrawer = (props: Props) => {
  // Props
  const { open, handleClose, formAction, state, pending } = props


  const [fileName, setFileName] = useState('')

  // hooks
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreatePreviewName = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]

    console.log({ file })
    setFileName(file.name)
  }

  console.log({ fileName })

  const handleReset = () => {
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        {/* <form  onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'> */}
        <form action={formAction} className='flex flex-col gap-6 p-6'>

          <CustomTextField
            defaultValue={state?.data?.fullName}
            name='fullName'
            fullWidth
            label='Full Name'
            placeholder='John Doe'
            {...(state?.errors?.fullName && { error: true, helperText: state?.errors?.fullName })}
          />



          <CustomTextField
            defaultValue={state?.data?.username}
            name='username'
            fullWidth
            label='Username'
            placeholder='johndoe'
            {...(state?.errors?.username && { error: true, helperText: state?.errors?.username })}
          />


          <CustomTextField
            defaultValue={state?.data?.password}
            type='password'
            name='password'
            fullWidth
            label='Password'
            placeholder='input password'
            {...(state?.errors?.password && { error: true, helperText: state?.errors?.password })}
          />


          <CustomTextField
            defaultValue={state?.data?.email}
            name='email'
            fullWidth
            type='email'
            label='Email'
            placeholder='johndoe@gmail.com'
            {...(state?.errors?.email && { error: true, helperText: state?.errors?.email })}
          />

          <CustomTextField
            defaultValue={state?.data?.role ?? "MANAGER"}

            // value={'MANAGER'}
            name='role'
            select
            fullWidth
            id='select-role'
            label='Select Role'
            {...(state?.errors?.role && { error: true, helperText: state?.errors?.role })}
          >
            {roleOption.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            defaultValue={state?.data?.status ?? "ACTIVE"}

            // value={'PENDING'}
            select
            fullWidth
            id='select-status'
            label='Select Status'
            name='status'
            {...(state?.errors?.status && { error: true, helperText: state?.errors?.status })}
          >
            <MenuItem value='ACTIVE'>Active</MenuItem>
            <MenuItem value='PENDING'>Pending</MenuItem>
            <MenuItem value='INACTIVE'>Inactive</MenuItem>
          </CustomTextField>




          <CustomTextField
            label='Contact'
            name='contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            defaultValue={state?.data?.contact}


          />

          <div className='flex items-end gap-4'>
            <CustomTextField
              label='Attachment'
              placeholder='No file chosen'
              value={fileName}
              className='flex-auto'
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: fileName ? (
                    <InputAdornment position='end'>
                      <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                        <i className='tabler-x' />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              }}
            />
            <Button component='label' variant='tonal' htmlFor='contained-button-file' className='min-is-fit'>
              Choose
              <input hidden id='contained-button-file' type='file' name='avatarUrl' onChange={handleCreatePreviewName} ref={fileInputRef} />
            </Button>
          </div>

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={pending}>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
