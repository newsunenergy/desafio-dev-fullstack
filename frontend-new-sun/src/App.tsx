import { Box, ChakraProvider } from '@chakra-ui/react'
import {  RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {

  return (
    <ChakraProvider>
      <Box backgroundColor="#ffe0ba" height="100vh">
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  )
}

export default App
