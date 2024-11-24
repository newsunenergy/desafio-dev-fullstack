'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { FileItem } from './file-item'
import { useFileInput } from './root'

export function FileList() {
  const { files } = useFileInput()
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className="mt-4 flex flex-col space-y-3">
      {files.map((file, i) => {
        return (
          <FileItem
            key={`${file.name}-${i}`}
            name={file.name}
            size={file.size}
            state="complete"
          />
        )
      })}
    </div>
  )
}
