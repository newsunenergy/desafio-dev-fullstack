import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider
            toastOptions={{
                defaultOptions: {
                    duration: 5_000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        width: '90%',
                        maxWidth: '450px',
                    },
                },
            }}
        >
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
)
