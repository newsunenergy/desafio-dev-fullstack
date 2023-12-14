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
import { Link } from 'react-router-dom'

export default function Simulate() {
    return (
        <ProvideSimulationContext>
            <Container
                minW={{
                    sm: 'full',
                    md: '4xl',
                }}
            >
                <Card>
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
                            <Link
                                to="/listagem"
                                style={{
                                    textDecoration: 'underline',
                                }}
                            >
                                Visualizar simulações
                            </Link>
                            <Submit />
                        </CardFooter>
                    </Form>
                </Card>
            </Container>
        </ProvideSimulationContext>
    )
}
