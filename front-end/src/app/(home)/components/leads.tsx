"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Lead } from "@/interfaces/lead";
import { LeadCard } from "./lead-card";
import { useState } from "react";

interface LeadsProps {
	leads: Lead[];
}

export function Leads({ leads }: LeadsProps) {
	const [search, setSearch] = useState<string>("");

	const filteredLeads = leads.filter((lead) =>
		lead.fullName.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div>
			<div className="mb-6 space-y-1">
				<Label htmlFor="search">Pesquisar por nome:</Label>
				<Input
					id="search"
					type="text"
					placeholder="Digite o nome"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<div className="space-y-4">
				{filteredLeads.length === 0 ? (
					<p>Nenhuma simulação encontrada.</p>
				) : (
					filteredLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
				)}
			</div>
		</div>
	);
}
