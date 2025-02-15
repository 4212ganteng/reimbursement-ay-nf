// React Imports
import { useActionState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Types Imports
import { toast } from 'react-toastify'


// Component Imports
import { RegisterUserAction } from '@/app/[lang]/(dashboard)/apps/(auth)/user/action'
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  onDataSubmit: () => void
}

type FormValidateType = {
  fullName: string
  username: string
  email: string
  role: string
  password: string
  status: string
}

// type FormNonValidateType = {
//   company: string
//   country: string
//   contact: string
// }

// Vars
// const initialData = {
//   company: '',
//   country: '',
//   contact: ''
// }

const roleOption = ['MANAGER', 'STAFF', 'FINANCE']

const AddUserDrawer = (props: Props) => {

  const [state, formAction, pending] = useActionState(RegisterUserAction, null)

  console.log(state)

  // Props
  const { open, handleClose, onDataSubmit } = props

  // States
  // const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,

    // handleSubmit,
    // formState: { errors }
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



  useEffect(() => {
    if (state?.status === 'success') {
      onDataSubmit()
      resetForm()
    } else {
      toast.error(state?.message)
      console.log(state?.message)
    }
  }, [state, onDataSubmit, resetForm])

  const handleReset = () => {
    handleClose()
    resetForm()
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
                defaultValue={state?.data?.fullName}
                {...field}
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                {...(state?.errors?.fullName && { error: true, helperText: state?.errors?.fullName })}
              />
            )}
          />
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                defaultValue={state?.data?.username}
                {...field}
                fullWidth
                label='Username'
                placeholder='johndoe'
                {...(state?.errors?.username && { error: true, helperText: state?.errors?.username })}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                defaultValue={state?.data?.password}
                type='password'
                {...field}
                fullWidth
                label='Password'
                placeholder='input password'
                {...(state?.errors?.password && { error: true, helperText: state?.errors?.password })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                defaultValue={state?.data?.email}
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                {...(state?.errors?.email && { error: true, helperText: state?.errors?.email })}
              />
            )}
          />
          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                defaultValue={state?.data?.role}
                select
                fullWidth
                id='select-role'
                label='Select Role'
                {...field}
                {...(state?.errors?.role && { error: true, helperText: state?.errors?.role })}
              >

                {roleOption.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>

                ))}

              </CustomTextField>
            )}
          />

          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                defaultValue={state?.data?.status}
                select
                fullWidth
                id='select-status'
                label='Select Status'
                {...field}
                {...(state?.errors?.status && { error: true, helperText: state?.errors?.status })}
              >
                <MenuItem value='ACTIVE'>Active</MenuItem>
                <MenuItem value='PENDING'>Pending</MenuItem>
                <MenuItem value='INACTIVE'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />


          <CustomTextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            defaultValue={state?.data?.contact}

          // {...(state?.errors?.contact && { error: true, helperText: state?.errors?.contact })}
          />

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
