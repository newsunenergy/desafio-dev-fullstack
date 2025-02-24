import { Card } from "@/components/ui/card";
import type { Lead } from "@/interfaces/lead";

interface LeadCardProps {
	lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
	return (
		<Card className="p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
			<div className="flex justify-between items-start mb-4">
				<div className="space-y-2">
					<h3 className="text-2xl font-semibold mb-1">{lead.fullName}</h3>
					<p className="text-sm ">{lead.email}</p>
					<p className="text-sm ">{lead.phoneNumber}</p>
				</div>
			</div>

			<div className="space-y-4">
				{lead.units.map((unit) => (
					<div
						key={unit.id}
						className="dark:bg-zinc-800 bg-zinc-200 p-4 rounded-lg shadow-sm"
					>
						<div className="flex justify-between items-center mb-2">
							<div>
								<p className="text-sm font-medium">Unidade:</p>
								<p className="text-lg font-semibold text-blue-600">
									{unit.consumerUnitCode}
								</p>
							</div>
						</div>

						<p className="text-sm">
							Modelo de Fase:{" "}
							<span className="font-semibold">{unit.phaseModel}</span>
						</p>
						<p className="text-sm">
							Modelo de Carga:{" "}
							<span className="font-semibold">{unit.chargingModel}</span>
						</p>

						<div className="mt-4">
							<h4 className="text-lg font-semibold mb-2">
								Histórico de Consumo:
							</h4>
							<div className="space-y-2">
								{unit.consumptionHistory.map((history) => (
									<div
										key={history.id}
										className="flex justify-between text-sm"
									>
										<span>{history.consumptionMonth}</span>
										<span className="font-semibold">
											{history.offPeakConsumptionInKWh} kWh
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
