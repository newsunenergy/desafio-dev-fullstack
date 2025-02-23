"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface CreateSimulateFormData {
	name: string;
	email: string;
	phone: string;
	files: FileList;
}

export function CreateSimulateForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateSimulateFormData>();

	const onSubmit = async (data: CreateSimulateFormData) => {
		const formData = new FormData();

		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("phone", data.phone);

		if (data.files?.length) {
			for (const file of data.files) {
				formData.append("files", file);
			}
		}
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-1">
				<Label htmlFor="name">Nome completo</Label>
				<Input
					id="name"
					type="text"
					{...register("name", { required: true })}
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
					{...register("phone", { required: true })}
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
					Enviar simulação
				</Button>
			</div>
		</form>
	);
}
