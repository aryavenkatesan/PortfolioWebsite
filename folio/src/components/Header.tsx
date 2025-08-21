import { motion } from 'framer-motion';
import AV_logo from '/src/assets/AV_logo.png';

interface HeaderProps {
    scrollToSection: (sectionId: string) => void;
}

function Header({ scrollToSection }: HeaderProps) {
    return (
        <>
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.3 }}
                className="flex flex-row justify-between items-center px-6 pt-6 pb-4.5 text-white"
            >
                <motion.img
                    src={AV_logo}
                    alt="AV Logo"
                    className="h-8 cursor-pointer"
                    onClick={() => scrollToSection('home')}
                    whileHover={{ scale: 1.05 }}
                />
                <nav className="flex flex-col pr-4 text-right text-xs md:text-sm">
                    <motion.button
                        onClick={() => scrollToSection('home')}
                        className="hover:text-gray-300 transition-colors font-montserrat font-light cursor-pointer text-right"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        home
                    </motion.button>
                    <motion.button
                        onClick={() => scrollToSection('work')}
                        className="hover:text-gray-300 transition-colors font-montserrat font-light cursor-pointer text-right"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        work
                    </motion.button>
                    <motion.button
                        onClick={() => scrollToSection('about')}
                        className="hover:text-gray-300 transition-colors font-montserrat font-light cursor-pointer text-right"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        about
                    </motion.button>
                </nav>
            </motion.header>
        </>
    )
}

export default Header