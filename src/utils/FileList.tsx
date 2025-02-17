// components/FileList.tsx
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import FilePreview from './FilePreview'
import type { FileProp } from '@/types/fileType'

type FileListProps = {
  files: FileProp[]
  onRemoveFile: (file: FileProp) => void
}

const FileList = ({ files, onRemoveFile }: FileListProps) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name} className='pis-4 plb-3'>
        <div className='file-details'>
          <div className='file-preview'>
            <FilePreview file={file} />
          </div>
          <div>
            <Typography className='file-name font-medium' color='text.primary'>
              {file.name}
            </Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => onRemoveFile(file)}>
          <i className='tabler-x text-xl' />
        </IconButton>
      </ListItem>
    ))}
  </List>
)

export default FileList
