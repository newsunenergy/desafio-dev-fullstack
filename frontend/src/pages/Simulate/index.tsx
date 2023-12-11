import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Container,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form, { Inputs } from "./Form";

export default function Simulate() {
  const { register, handleSubmit } = useForm<Inputs>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/simulate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <Container
      minW={{
        sm: "full",
        md: "4xl",
      }}
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <Heading size="lg">Realize sua simulação aqui!</Heading>
          </CardHeader>
          <CardBody>
            <Form register={register} />
          </CardBody>
          <CardFooter justifyContent={"end"}>
            <Button type="submit" colorScheme="green">
              Enviar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
}
