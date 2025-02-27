import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import Navbar from "../../components/NavBar";
import Logo from '../../assets/logo-new-sun-form.jpeg'
import TextInput from "../../components/Inputs/TextInput";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useState } from "react";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import PhoneInput from "../../components/Inputs/PhoneInput";
import MultipleFilesInput from "../../components/Inputs/MultipleFilesInput";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function Simulate() {
  const [loading, setLoading] = useState(false)
  const [bills, setBills] = useState<FileList | null>(null);
  const [billsError, setBillsError] = useState<string | null>(null);

  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    name: yup.string().trim().required("Informe o seu nome"),
    email: yup.string().email().trim().required("Informe o seu email"),
    phone: yup
      .string()
      .trim()
      .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido")
      .required("Informe seu telefone"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleBillsChange = (selectedBills: FileList | null) => {
    setBills(selectedBills);
    setBillsError(null);
  };

  const handleSimulate = async ({ name, email, phone }: FormData) => {


    if (!bills || bills.length === 0) {
      setBillsError("Envie pelo menos uma conta de energia");
      return;
    }

    const requestFormattedPhone = phone.replace(/\D/g, "");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", requestFormattedPhone);

    Array.from(bills).forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);
    try {
      await api.post("/lead", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const message = "Simulação realizada com sucesso!"
      toast.success(message, {
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
      navigate("/listagem")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      
      setLoading(false);

      const message = error?.response?.data?.error_description
        ? error?.response?.data?.error_description :
        "Não foi possível realizar a simulação. Tente novamente mais tarde"

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
    }
  }

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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(handleSimulate)();
                  }
                }}
                className="flex flex-col gap-4 items-center justify-center p-8 md:w-96 bg-black rounded-md border-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  alt="NewSun logo"
                  src={Logo}
                  width={70}
                  height={70}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <p className="text-xl text-gray-200 font-bold mt-4">Simulação</p>

                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <TextInput placeholder="Nome" value={field.value} onChange={field.onChange} />
                    </motion.div>
                  )}
                />
                {errors.name && (
                  <motion.p className="text-red-500 text-sm font-bold mt-[-24px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <TextInput placeholder="Email" value={field.value} onChange={field.onChange} />
                    </motion.div>
                  )}
                />
                {errors.email && (
                  <motion.p className="text-red-500 text-sm font-bold mt-[-24px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <PhoneInput placeholder="Telefone" value={field.value} onChange={field.onChange} />
                    </motion.div>
                  )}
                />
                {errors.phone && (
                  <motion.p className="text-red-500 text-sm font-bold mt-[-24px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.phone.message}
                  </motion.p>
                )}

                <MultipleFilesInput files={bills} onChange={handleBillsChange} />

                {billsError &&
                  <motion.p className="text-red-500 text-sm font-bold text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {billsError}
                  </motion.p>
                }

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button
                    label="Simular"
                    onClick={handleSubmit(handleSimulate)}
                    style={{ marginTop: 24 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

      </>
    </>
  );
}