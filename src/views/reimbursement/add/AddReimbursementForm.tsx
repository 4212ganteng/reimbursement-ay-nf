'use client'

import { useActionState, useState } from "react"

import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { useDropzone } from "react-dropzone"

import CustomTextField from "@/@core/components/mui/TextField"
import { submitReimbursementAction } from "@/app/[lang]/(dashboard)/apps/reimbursement/add/action"
import type { AuthPayload } from "@/libs/server-auth"
import AppReactDatepicker from "@/libs/styles/AppReactDatepicker"
import type { FileProp } from "@/types/fileType"


const AddReimbursementForm = ({ authData }: { authData: AuthPayload }) => {
  const [state, formAction, pending] = useActionState(submitReimbursementAction, null)
  const [reimbursementImage, setReimbursement] = useState<File[]>([])
  const [date, setDate] = useState<Date | null | undefined>(new Date())

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setReimbursement(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })


  console.log({ state })

  // const handleRemoveFile = (file: FileProp) => {
  //   const filtered = reimbursementImage.filter((i: FileProp) => i.name !== file.name)

  //   setReimbursement([...filtered])
  // }

  // const handleRemoveAllFiles = () => {
  //   setReimbursement([])
  // }



  const handleSubmit = async (formData: FormData) => {

    // Append files if any
    reimbursementImage.forEach(fileReimbust => {
      formData.append('reimbursementImage', fileReimbust)
    })



    // Call the server action
    return formAction(formData)
  }

  const img = reimbursementImage.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))


  return (
    <form action={formAction}>
      <Card>
        <CardHeader title='Applicant Information' />
        <CardContent>
          <Grid container spacing={6} className='mbe-6'>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                name="fullName"
                value={authData.fullName ?? null}
                label='Full Name'

                // placeholder='Jhon doe'
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                name="position"
                value={authData.Role ?? null}
                label='Position'

                // placeholder='Jhon doe'
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppReactDatepicker
                selected={date}
                name="date"
                id='basic-input'
                onChange={(date: Date | null) => setDate(date)}
                placeholderText='Click to select a date'
                customInput={<CustomTextField label='Date' fullWidth />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                name="price"
                label='Price'
                placeholder='0123-4567'
                type="number"
                required
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField

              rows={8}
              multiline
              fullWidth
              name="description"
              label='Description'
              placeholder='Write something here...'

            />
          </Grid>

          <CardHeader
            title='Product Image'

            // action={
            //   <Typography component={Link} color='primary.main' className='font-medium'>
            //     Add media from URL
            //   </Typography>
            // }
            sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
          />
          <CardContent>
            <Box {...getRootProps({ className: 'dropzone', })} {...(reimbursementImage.length && { sx: { height: 450 } })}>
              <input {...getInputProps()} name="reimbursementImage" />
              {reimbursementImage.length ? (
                img
              ) : (
                <div className='flex items-center flex-col'>
                  <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                    <i className='tabler-upload' />
                  </Avatar>
                  <Typography variant='h4' className='mbe-2.5'>
                    Drop files here or click to upload.
                  </Typography>
                  <Typography>
                    Drop files here or click{' '}

                    thorough your machine
                  </Typography>
                </div>
              )}
            </Box>
          </CardContent>


          {state?.message && (
            <Typography color="error" className="mt-2">
              {state.message}
            </Typography>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={pending}
            >
              {pending ? 'Submitting...' : 'Submit Reimbursement'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddReimbursementForm
