"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateSimulateFormData {
	fullName: string;
	email: string;
	phoneNumber: string;
	files: FileList;
}

export function CreateSimulateForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateSimulateFormData>();

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const onSubmit = async (data: CreateSimulateFormData) => {
		const formData = new FormData();

		formData.append("fullName", data.fullName);
		formData.append("email", data.email);
		formData.append("phoneNumber", data.phoneNumber);

		if (data.files?.length) {
			for (const file of data.files) {
				formData.append("files", file);
			}
		}

		try {
			setIsLoading(true);

			const response = await fetch("http://localhost:3333/lead/create", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Erro ao enviar dados: ${response.statusText}`);
			}

			await response.json();
			reset();
			router.push("/");
		} catch (error) {
			console.error("Erro ao enviar formulário:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-1">
				<Label htmlFor="name">Nome completo</Label>
				<Input
					id="name"
					type="text"
					{...register("fullName", { required: true })}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">E-mail</Label>
				<Input
					id="email"
					type="email"
					{...register("email", { required: true })}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="phone">Telefone</Label>
				<Input
					id="phone"
					type="tel"
					{...register("phoneNumber", { required: true })}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="file">Conta de Energia</Label>
				<Input
					id="file"
					type="file"
					accept=".pdf"
					multiple
					className={`${errors.files && "border-red-500"}`}
					{...register("files", { required: true })}
				/>
			</div>

			<div>
				<Button type="submit" className="w-full mt-4">
					{isLoading ? "Carregando..." : "Enviar simulação"}
				</Button>
			</div>
		</form>
	);
}
