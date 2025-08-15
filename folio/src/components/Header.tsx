import { motion } from 'framer-motion';
import AV_logo from '/src/assets/AV_logo.png';

function Header() {
    return (
        <>
            <motion.header initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.7 }} className="flex flex-row justify-between items-center px-6 pt-6 pb-4.5  text-white">
                <img
                    src={AV_logo}
                    alt="AV Logo"
                    className="h-8" />
                <nav className="flex flex-col pr-4 text-right">
                    <a href="#home" className="hover:text-gray-300 transition-colors font-montserrat font-light">home</a>
                    <a href="#work" className="hover:text-gray-300 transition-colors font-montserrat font-light">work</a>
                    <a href="#about" className="hover:text-gray-300 transition-colors font-montserrat font-light">about</a>
                </nav>
            </motion.header>
        </>
    )
}

export default Header