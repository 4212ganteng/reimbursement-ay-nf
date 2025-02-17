// components/FilePreview.tsx

import type { FileProp } from "@/types/fileType"

const FilePreview = ({ file }: { file: FileProp }) => {
  if (file.type.startsWith('image')) {
    return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
  } else {
    return <i className='tabler-file-description' />
  }
}

export default FilePreview
