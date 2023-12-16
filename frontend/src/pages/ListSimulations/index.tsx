import React from 'react'
import {
    Card,
    Heading,
    CardBody,
    Container,
    CardHeader,
    Box,
} from '@chakra-ui/react'
import { Link } from '../../components/Link'
import { ProvideSimulationsContext } from './context'
import { CardTable } from './Table'
import { ResetFilterButton } from './ResetFilterButton'

export default function Simulate() {
    return (
        <ProvideSimulationsContext>
            <Container
                minW={{
                    sm: 'full',
                    md: '4xl',
                }}
                height={'100vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Card width={'100%'}>
                    <CardHeader>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Heading size="lg">Simulações realizadas</Heading>
                            <ResetFilterButton />
                        </Box>
                        <Link to="/simular">Realizar uma nova simulação</Link>
                    </CardHeader>
                    <CardBody>
                        <CardTable />
                    </CardBody>
                </Card>
            </Container>
        </ProvideSimulationsContext>
    )
}
