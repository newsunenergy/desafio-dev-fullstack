import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLeads } from "../hooks/useLeads";
import { ILead } from "../types/leads";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { useDebounce } from "../hooks/useDebounce";

export default function LeadsListPage() {
  const navigate = useNavigate();
  const { getLeads, deleteLead } = useLeads();
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLeads({ name: debouncedSearch, email: debouncedSearch });
      setLeads(response.data);
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
      alert("Erro ao buscar leads, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [getLeads, debouncedSearch]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Erro ao excluir lead", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>
      <Input
        placeholder="Buscar leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Carregando...</TableCell>
            </TableRow>
          ) : leads.length > 0 ? (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/listagem/${lead.id}`)}>
                    Detalhes
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(lead.id)} className="ml-2">
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Nenhum lead encontrado</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}