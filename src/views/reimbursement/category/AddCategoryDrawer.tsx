// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Type Imports
import type { categoryType } from './ProductCategoryTable'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  categoryData: categoryType[]
  setData: (data: categoryType[]) => void
}

type FormValues = {
  title: string
  description: string
}

const AddCategoryDrawer = (props: Props) => {
  // Props
  const { open, handleClose, categoryData, setData } = props

  // States
  const [fileName, setFileName] = useState('')
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')


  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  // Handle Form Submit
  const handleFormSubmit = (data: FormValues) => {
    const newData = {
      id: categoryData.length + 1,
      categoryTitle: data.title,
      description: data.description,
      totalProduct: Math.floor(Math.random() * 9000) + 1000,
      totalEarning: Math.floor(Math.random() * 90000) + 10000,
      image: `/images/apps/ecommerce/product-${Math.floor(Math.random() * 20) + 1}.png`
    }

    setData([...categoryData, newData])
    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm({ title: '', description: '' })
    setFileName('')
    setCategory('')
    setComment('')
    setStatus('')
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
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add Organize</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
          <Controller
            name='vendor'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Title'
                placeholder='Fashion'
                {...(errors.title && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <CustomTextField
            select
            fullWidth
            label='Parent Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value='HouseHold'>HouseHold</MenuItem>
            <MenuItem value='Management'>Management</MenuItem>
            <MenuItem value='Electronics'>Electronics</MenuItem>
            <MenuItem value='Office'>Office</MenuItem>
            <MenuItem value='Accessories'>Accessories</MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            label='Unit'
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value='Published'>Published</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
            <MenuItem value='Scheduled'>Scheduled</MenuItem>
          </CustomTextField>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Discard
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCategoryDrawer
