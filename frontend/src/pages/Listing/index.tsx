import Navbar from "../../components/NavBar";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { LeadWithUnitsDTO, UnitWithConsumptionsDTO } from "../../DTOs/lead-DTOs";
import { formatPhone } from "../../utils/formatPhone";
import Loader from "../../components/Loader";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import FilterModal from "./components/FilterModal";
import UnitTable from "./components/UnitsTabel";


interface FilterData {
  name?: string;
  email?: string;
  phone?: string;
  consumerUnitCode?: string;
}

export default function Listing() {
  const [loading, setLoading] = useState(false)
  const [leadsWithUnits, setLeadsWithUnits] = useState<LeadWithUnitsDTO[]>([]);
  const [unitsDetails, setUnitsDetails] = useState<UnitWithConsumptionsDTO[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    name: undefined,
    email: undefined,
    phone: undefined,
    consumerUnitCode: undefined
  });

  const navigate = useNavigate();

  const getTextWithoutLeads =
    filters.name || filters.email || filters.phone || filters.consumerUnitCode
    ? "Você ainda não possui simulações para os filtros informados"
    : "Você ainda não possui simulações. Que tal simular agora?"
  

  const fetchLeads = async ({ name, email, phone, consumerUnitCode }: FilterData) => {

    setLoading(true);
    try {

      const requestFormattedPhone = typeof phone === "string" ? phone.replace(/\D/g, "") : undefined;


      const queryParams = new URLSearchParams(
        Object.entries({ name, email, phone: requestFormattedPhone, consumerUnitCode })
          .filter(([, value]) => value !== undefined && value.trim() !== "")
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value as string }), {})
      );

      const response = await api.get(`/lead?${queryParams.toString()}`);

      const { leads } = response.data;

      setLeadsWithUnits(leads);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      const message = error?.response?.data?.error_description
        ? error?.response?.data?.error_description :
        "Não foi possível buscar as simulações. Tente novamente mais tarde"

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500)
    }
  }

  const fetchLeadById = async (leadId: string) => {
    setLoading(true);
    try {

      const response = await api.get(`/lead/${leadId}`);

      const { units } = response.data

      setUnitsDetails(units);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      const message = error?.response?.data?.error_description
        ? error?.response?.data?.error_description :
        "Não foi possível buscar os detalhes das unidades. Tente novamente mais tarde"

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500)
    }
  }

  useEffect(() => {
    fetchLeads(filters);
  }, [filters])

  return (
    <>
      <>
        <div className="min-h-screen flex flex-col bg-gray-900 overflow-y-auto">
          <Navbar />
          <div className="flex rounded-md flex-col items-center justify-center flex-grow md:flex-row">
            {loading ? (
              <Loader />
            ) : (
              <div className="md:w-[900px] md:h-[600px] w-[500px] h-[400px] bg-box rounded-xl border border-textInput overflow-auto">
                {unitsDetails.length > 0 ? (
                  <UnitTable 
                    units={unitsDetails} 
                    onBack={() => {
                      setUnitsDetails([]);
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 500);
                    }}
                  />
                ) : (
                  <>
                    <div className="p-4 flex justify-end items-center border-b border-gray-400">
                      <Button
                        label="Filtros"
                        onClick={() => setFilterModalOpen(true)}
                      />
                    </div>

                    <div className="relative w-full overflow-auto">
                      <table
                        className="w-full caption-bottom text-sm"
                      >
                        <thead className="[&_tr]:border-b">
                          <th
                            className=
                            "h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7"
                          >
                            Nome
                          </th>
                          <th
                            className=
                            "h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7"
                          >
                            Email
                          </th>
                          <th
                            className=
                            "h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7"
                          >
                            Telefone
                          </th>
                          <th
                            className=
                            "h-12 text-left align-middle text-gray-400 font-bold py-[10px] px-7"
                          >
                            Unidades
                          </th>
                        </thead>
                        <tbody
                          className="[&_tr:last-child]:border-0"
                        >
                          {leadsWithUnits.map((lead) => (
                            <tr
                              key={lead.lead.id}
                              className="border-b transition-colors font-bold text-white hover:bg-amber-600 cursor-pointer"
                              onClick={() => fetchLeadById(lead.lead.id)}
                            >
                              <td
                                className="p-4 align-middle font-bold py-[10px] px-7 capitalize"
                              >
                                {lead.lead.fullName}
                              </td>

                              <td
                                className="p-4 align-middle text-left py-[10px] px-7"
                              >
                                {lead.lead.email}
                              </td>

                              <td
                                className="p-4 align-middle text-left py-[10px] px-7"
                              >
                                {formatPhone(lead.lead.phone)}
                              </td>

                              <td
                                className="p-4 align-middle font-medium py-[10px] px-7 capitalize"
                              >
                                <p className="bg-amber-600 max-w-7 p-1 text-center rounded-lg">
                                  {lead.units.length}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {leadsWithUnits?.length === 0 && (
                      <div className="flex flex-col gap-4 font-bold text-white justify-center items-center w-full h-[80%]">
                        {getTextWithoutLeads}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Button
                            label="Simular agora"
                            onClick={() => navigate('/simular')}
                          />
                        </motion.div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <FilterModal
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApplyFilters={(newFilters: FilterData) => {
            setFilters(newFilters);
            setFilterModalOpen(false);
          }}
        />
      </>
    </>
  );
}