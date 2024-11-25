"use client";

import React, { useState } from "react";

const Simular = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        email: "",
        telefone: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    // Função para capturar as mudanças nos inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para enviar os dados via fetch
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/simular", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`Simulação registrada com sucesso: ${JSON.stringify(data)}`);
            } else {
                setResponseMessage("Erro ao registrar simulação.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setResponseMessage("Erro na conexão com o servidor.");
        }
    };

    return (
        <div>
            <h1>Simular Consumo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Simular;


