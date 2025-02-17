'use client'

import { useActionState, useState } from "react"

import { Button, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { useDropzone } from "react-dropzone"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"

import CustomAvatar from "@/@core/components/mui/Avatar"
import CustomTextField from "@/@core/components/mui/TextField"
import Link from "@/components/Link"
import type { FileProp } from "@/types/fileType"
import Dropzone from "@/utils/Dropzone"
import { EditorToolbar } from "@/utils/EditorToolbar"
import FileList from "@/utils/FileList"
import { submitReimbursementAction } from "@/app/[lang]/(dashboard)/apps/reimbursement/add/action"


const AddReimbursementForm = () => {
  const [state, formAction, pending] = useActionState(submitReimbursementAction, null)
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    immediatelyRender: false
  })

  const handleSubmit = async (formData: FormData) => {
    // Append editor content if exists
    if (editor) {
      formData.append('description', editor.getHTML())
    }

    // Append files if any
    files.forEach(file => {
      formData.append('files', file)
    })

    // Call the server action
    return formAction(formData)
  }

  return (
    <form action={handleSubmit}>
      <Card>
        <CardHeader title='Applicant Information' />
        <CardContent>
          <Grid container spacing={6} className='mbe-6'>
            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                name="fullName"
                label='Full Name'
                placeholder='Jhon doe'
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                name="position"
                label='Position'
                placeholder='Staff'
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                name="contact"
                label='Contact'
                placeholder='0123-4567'
                required
              />
            </Grid>
          </Grid>
          <Typography className='mbe-1'>Description (Optional)</Typography>
          <Card className='p-0 border shadow-none'>
            <CardContent className='p-0'>
              <EditorToolbar editor={editor} />
              <Divider className='mli-6' />
              <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex' />
            </CardContent>
          </Card>

          <Dropzone>
            <CardHeader
              title='Product Image'
              action={
                <Typography component={Link} color='primary.main' className='font-medium'>
                  Add media from URL
                </Typography>
              }
              sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
            />
            <CardContent>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className='flex items-center flex-col gap-2 text-center'>
                  <CustomAvatar variant='rounded' skin='light' color='secondary'>
                    <i className='tabler-upload' />
                  </CustomAvatar>
                  <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
                  <Typography color='text.disabled'>or</Typography>
                  <Button variant='tonal' size='small'>
                    Browse Image
                  </Button>
                </div>
              </div>
              {files.length ? (
                <>
                  <FileList files={files} onRemoveFile={handleRemoveFile} />
                  <div className='buttons'>
                    <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Dropzone>

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
