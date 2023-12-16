import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Container,
} from '@chakra-ui/react'
import { FormContent, Form } from './Form'
import { ProvideSimulationContext } from './context'
import { Submit } from './Form/SubmitButton'
import { Link } from '../../components/Link'

export default function Simulate() {
    return (
        <ProvideSimulationContext>
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
                    <Form>
                        <CardHeader>
                            <Heading size="lg">Realize sua simulação!</Heading>
                        </CardHeader>
                        <CardBody>
                            <FormContent />
                        </CardBody>
                        <CardFooter
                            justifyContent={'space-between'}
                            alignItems={'end'}
                        >
                            <Link to="/listagem">Visualizar simulações</Link>
                            <Submit />
                        </CardFooter>
                    </Form>
                </Card>
            </Container>
        </ProvideSimulationContext>
    )
}
