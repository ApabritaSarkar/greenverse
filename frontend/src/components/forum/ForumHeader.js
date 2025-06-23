import { motion } from 'framer-motion';

const ForumHeader = () => (
  <motion.h1
    className="text-4xl md:text-5xl font-bold text-center text-eco-green mb-10 font-inter"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    GreenVerse Community Forum
  </motion.h1>
);

export default ForumHeader;
