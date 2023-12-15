import React from 'react'
import { Card, Box } from '@chakra-ui/react'
import { Link } from '../../components/Link'

function App() {
    return (
        <Box
            gap={5}
            height={'100vh'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
        >
            <Card
                padding={5}
                width={'90%'}
                maxWidth={'400px'}
                textAlign={'center'}
            >
                <Link to="/simular">Realizar uma simulação</Link>
            </Card>
            <Card
                padding={5}
                width={'90%'}
                maxWidth={'400px'}
                textAlign={'center'}
            >
                <Link
                    to="/listagem"
                    style={{
                        textDecoration: 'underline',
                    }}
                >
                    Visualizar simulações criadas
                </Link>
            </Card>
        </Box>
    )
}

export default App
