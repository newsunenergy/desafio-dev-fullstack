import {
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    StackDivider,
    Button,
    Box,
    Flex,
    Grid,
    SimpleGrid,
    CardFooter
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate()

    return (
        <div>

            <Flex justifyContent={'center'}>
                <Card>
                    <CardHeader>
                        <Heading size='xl'>Menu Principal</Heading>
                    </CardHeader>
                </Card>
            </Flex>
            <Flex justifyContent={'center'}>

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardHeader>
                            <Heading size='md'>Visualizar usuários</Heading>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={() => { navigate('/listagem') }}>Visualizar</Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardHeader>
                            <Heading size='md'>Simular Lead</Heading>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={() => { navigate('/simular') }}>Simular</Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>

            </Flex>
        </div>
    )
}