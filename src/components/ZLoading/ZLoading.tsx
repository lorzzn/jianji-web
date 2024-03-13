import { FC } from "react";
import { motion } from 'framer-motion'
import { RiLoader4Fill } from "@remixicon/react";

const ZLoading:FC = () => {
  return <motion.div
    initial={{ rotate: '0deg' }}
    animate={{ rotate: '360deg' }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <RiLoader4Fill />
  </motion.div>
}

export default ZLoading
