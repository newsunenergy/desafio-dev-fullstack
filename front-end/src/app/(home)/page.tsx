import type { Lead } from "@/interfaces/lead";
import { Leads } from "./components/leads";

const fetchLeads = async (): Promise<Lead[]> => {
	const response = await fetch("http://localhost:3333/lead");
	const leads = await response.json();
	return leads;
};

export default async function Home() {
	const leads = await fetchLeads();

	return (
		<div className="py-5 mx-auto max-w-[90%] md:max-w-2xl">
			<Leads leads={leads} />
		</div>
	);
}
