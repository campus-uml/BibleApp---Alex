import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center space-y-6">
        <motion.span
          className="h-20 w-20 border-4 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.p
          className="text-slate-900 text-2xl font-semibold animate-pulse"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Cargando...
        </motion.p>
      </div>
    </div>
  );
};
