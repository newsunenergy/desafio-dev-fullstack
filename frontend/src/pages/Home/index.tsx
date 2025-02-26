import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../../components/NavBar';
import Button from '../../components/Button';

export default function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 overflow-y-auto">
      <Navbar />

      <div className="p-4">
        <motion.p
          className="text-2xl md:text-4xl text-center mt-16 text-gray-200 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Bem vindo ao seu sistema de gestão de contas de energia!
        </motion.p>

        <motion.p
          className="md:text-xl text-center mt-4 mb-16 text-gray-400 font-bold opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          Realize sua simulação para um plano de compensação energética em poucos passos!
        </motion.p>

        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              label="Simular agora"
              onClick={() => navigate('/simular')}
              size="large"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}