import { Box, Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <Box height="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Heading size="2xl">Bem vindo ao simulador</Heading>
      <Box minW="350px" display="flex" justifyContent="space-between" marginTop={8}>
        <Button onClick={() => navigate('/simular')} colorScheme="orange">Criar Simulação</Button>
        <Button onClick={() => navigate('/listagem')} colorScheme="orange">Listar Simulações</Button>
      </Box>
    </Box>
  )
}