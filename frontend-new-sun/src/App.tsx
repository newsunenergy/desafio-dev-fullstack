import { Box, ChakraProvider } from '@chakra-ui/react'
import {  RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <ChakraProvider>
      <Box backgroundColor="#f5f5f5" height="100vh">
        <ToastContainer />
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  )
}

export default App
