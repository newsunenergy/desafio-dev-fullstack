import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Container,
} from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { FormContent, Form, Inputs } from './Form'
import { ProvideSimulationContext } from './context'

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
              <Heading size="lg">Realize sua simulação aqui!</Heading>
            </CardHeader>
            <CardBody>
              <FormContent />
            </CardBody>
            <CardFooter justifyContent={'end'}>
              <Button type="submit" colorScheme="green">
                Enviar
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Container>
    </ProvideSimulationContext>
  )
}
