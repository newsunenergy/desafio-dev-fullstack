import Navbar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { LeadWithUnitsDTO, UnitWithConsumptionsDTO } from "../../DTOs/lead-DTOs";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { motion } from 'framer-motion'
import FilterModal from "./components/FilterModal";
import UnitTable from "./components/UnitsTabel";
import LeadTable from "./components/LeadsTable";


interface FilterData {
  name?: string;
  email?: string;
  phone?: string;
  consumerUnitCode?: string;
}

export default function Listing() {
  const [loading, setLoading] = useState(true);
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-[800px] md:h-[600px] w-[320px] h-[215px] bg-box rounded-xl border border-textInput overflow-auto">
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
                  <LeadTable
                    leadsWithUnits={leadsWithUnits}
                    fetchLeadById={fetchLeadById}
                    getTextWithoutLeads={getTextWithoutLeads}
                    navigate={navigate}
                    setFilterModalOpen={setFilterModalOpen}
                  />
                )}
              </motion.div>
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