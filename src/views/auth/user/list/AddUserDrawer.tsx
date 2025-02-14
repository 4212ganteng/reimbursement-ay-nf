// React Imports
import { useActionState, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UsersType } from '@/types/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { RegisterUserAction } from '@/app/[lang]/(dashboard)/apps/(auth)/user/action'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  onDataSubmit: (data: ProductForm) => Promise<void>
}

type FormValidateType = {
  fullName: string
  username: string
  email: string
  role: string
  password: string
  status: string
}

type FormNonValidateType = {
  company: string
  country: string
  contact: string
}

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const AddUserDrawer = (props: Props) => {

  const [state, formAction, pending] = useActionState(RegisterUserAction, null)

  console.log(state)

  // Props
  const { open, handleClose, userData, setData } = props

  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      role: '',
      password: '',
      status: ''
    }
  })

  // const onSubmit = (data: FormValidateType) => {
  //   const newUser: UsersType = {
  //     id: (userData?.length && userData?.length + 1) || 1,
  //     avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
  //     fullName: data.fullName,
  //     username: data.username,
  //     email: data.email,
  //     role: data.role,
  //     currentPlan: data.plan,
  //     status: data.status,
  //     company: formData.company,
  //     country: formData.country,
  //     contact: formData.contact,
  //     billing: userData?.[Math.floor(Math.random() * 50) + 1].billing ?? 'Auto Debit'
  //   }

  //   setData([...(userData ?? []), newUser])
  //   handleClose()
  //   setFormData(initialData)
  //   resetForm({ fullName: '', username: '', email: '', role: '', password: '', status: '' })
  // }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
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
          <Controller
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                {...(errors.fullName && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Username'
                placeholder='johndoe'
                {...(errors.username && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Password'
                placeholder='input password'
                {...(errors.username && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                label='Select Role'
                {...field}
                {...(errors.role && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-status'
                label='Select Status'
                {...field}
                {...(errors.status && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />


          <CustomTextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
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
