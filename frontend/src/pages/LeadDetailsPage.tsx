import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../hooks/useLeads";
import { ILead } from "../types/leads";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLead } = useLeads();
  const [lead, setLead] = useState<ILead | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchLeadDetails(id);
  }, [id]);

  const fetchLeadDetails = async (leadId: string) => {
    setLoading(true);
    try {
      const data = await getLead(leadId);
      setLead(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do lead", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Carregando detalhes...</p>;
  }

  if (!lead) {
    return <p className="text-center">Nenhum lead encontrado.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mt-4">Unidades</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código da Unidade</TableHead>
            <TableHead>Modelo Fásico</TableHead>
            <TableHead>Enquadramento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lead.units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{unit.ConsumerUnitCode}</TableCell>
              <TableCell>{unit.modelPhasic}</TableCell>
              <TableCell>{unit.framing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-xl font-semibold mt-4">Histórico de Consumo</h2>
      {lead.units.map((unit) => (
        <div key={unit.id} className="mt-4">
          <h3 className="text-lg font-medium">Unidade: {unit.ConsumerUnitCode}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês do Consumo</TableHead>
                <TableHead>Consumo Fora Ponta (kWh)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unit.consumptionhistory.map((con, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(con.monthOfConsumption).toLocaleDateString()}</TableCell>
                  <TableCell>{con.OffTipInKWH} kWh</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      <Button variant="secondary" onClick={() => navigate(-1)}>Voltar</Button>
    </div>
  );
}
