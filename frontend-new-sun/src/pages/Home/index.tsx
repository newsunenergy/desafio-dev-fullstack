import { Box, Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <Box height="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Box backgroundColor="#ffffff" borderRadius={8} padding={100} display="flex" flexDir="column" alignItems="center">
        <Heading size="2xl" textAlign="center">Bem vindo ao simulador</Heading>
        <Box minW="350px" display="flex" justifyContent="space-between" marginTop={8}>
          <Button onClick={() => navigate('/simular')} colorScheme="blue">Criar Simulação</Button>
          <Button onClick={() => navigate('/listagem')} colorScheme="blue">Listar Simulações</Button>
        </Box>
      </Box>
    </Box>
  )
}