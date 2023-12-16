import { Box, Card, CardFooter, Input } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SimulationContext } from '../../context'
import { Controller } from 'react-hook-form'
import { FaFilePdf } from 'react-icons/fa6'
import { IoMdCloudUpload } from 'react-icons/io'

export function File() {
    const {
        control,
        register,
        formState: { isSubmitting },
    } = useContext(SimulationContext)

    return (
        <>
            <Input
                id="files_input"
                type="file"
                accept=".pdf"
                multiple
                isDisabled={isSubmitting}
                style={{
                    opacity: 0,
                    position: 'fixed',
                    top: '100%',
                }}
                {...register('files', {
                    required: true,
                })}
            />
            <label
                htmlFor="files_input"
                style={{
                    cursor: 'pointer',
                }}
            >
                <Controller
                    name="files"
                    control={control}
                    render={({ field: { value } }) => {
                        const fileArray = value ? Object.values(value) : []

                        if (fileArray.length == 0) return <FileInput />

                        return (
                            <Card>
                                <CardFooter
                                    display="flex"
                                    padding="10px"
                                    flexDirection="row"
                                    justifyContent="space-evenly"
                                    flexWrap="wrap"
                                >
                                    {fileArray.map((file, index) => (
                                        <FilePreview
                                            key={file.name + index}
                                            name={file.name}
                                        />
                                    ))}
                                </CardFooter>
                            </Card>
                        )
                    }}
                />
            </label>
        </>
    )
}

function FileInput() {
    return (
        <Card>
            <CardFooter display="flex" justifyContent="center" padding="10px">
                <IoMdCloudUpload size="40px" />
            </CardFooter>
        </Card>
    )
}

function FilePreview({ name }: FilePreviewProps) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
        >
            <FaFilePdf size="40px" />
            <span>{name}</span>
        </Box>
    )
}

type FilePreviewProps = {
    name: string
}
