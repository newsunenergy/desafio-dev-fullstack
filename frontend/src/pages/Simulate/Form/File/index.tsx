import { Input } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SimulationContext } from '../../context'
import { Controller } from 'react-hook-form'

export function File() {
  const { register, control } = useContext(SimulationContext)

  return (
    <>
      <Input
        id="files_input"
        type="file"
        accept=".pdf"
        multiple
        {...register('files')}
      />
      <label htmlFor="files_input">
        <Controller
          name="files"
          control={control}
          render={({ field: { value } }) => {
            const fileArray = value ? Object.values(value) : []

            if (fileArray.length == 0) return <FileInput />

            console.log(value)

            return (
              <>
                {fileArray.map((file, index) => (
                  <FilePreview key={file.name + index} name={file.name} />
                ))}
              </>
            )
          }}
        />
      </label>
    </>
  )
}

function FileInput() {
  return <>Selecione uma ou mais contas!</>
}

function FilePreview({ name }: FilePreviewProps) {
  return (
    <>
      Nome: {name} <br />
    </>
  )
}

type FilePreviewProps = {
  name: string
}
