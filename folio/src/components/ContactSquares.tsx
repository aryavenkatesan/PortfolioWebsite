import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import linkedin from '/src/assets/linkedinLogo.png';
import github from '/src/assets/githubLogo.png';
import email from '/src/assets/emailIcon.png';

type ContactSquaresProps = {
    onleft?: boolean; // optional
};

function ContactSquares({ onleft = true }: ContactSquaresProps) {
    const [copied, setCopied] = useState(false);

    const handleEmailClick = () => {
        const emailAddress = "ar6165@gmail.com";
        navigator.clipboard.writeText(emailAddress).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1300);
        });
    };

    const iconVariants = {
        initial: { opacity: 0.9, scale: 1 },
        hover: { opacity: 0.7, scale: 0.95 },
    };

    return (
        <div className="flex flex-col gap-2 relative z- opacity-95">
            {/* LinkedIn */}
            <motion.a
                href="https://www.linkedin.com/in/arya-venkatesan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center overflow-hidden cursor-pointer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.img
                    src={linkedin}
                    alt="LinkedIn"
                    className="w-full h-full object-contain"
                    variants={iconVariants}
                />
            </motion.a>

            {/* GitHub */}
            <motion.a
                href="https://github.com/aryavenkatesan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center overflow-hidden cursor-pointer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.img
                    src={github}
                    alt="GitHub"
                    className="w-full h-full object-contain"
                    variants={iconVariants}
                />
            </motion.a>

            {/* Email */}
            <motion.button
                onClick={handleEmailClick}
                className="w-8 h-8 flex items-center justify-center overflow-hidden cursor-pointer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.img
                    src={email}
                    alt="Email"
                    className="w-full h-full object-contain"
                    variants={iconVariants}
                />
            </motion.button>

            {/* Popup with fade-out animation */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`absolute ${onleft ? 'left-10' : 'right-10'} top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-3 pt-18 rounded shadow-lg font-montserrat font-light`}
                    >
                        Email copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ContactSquares;