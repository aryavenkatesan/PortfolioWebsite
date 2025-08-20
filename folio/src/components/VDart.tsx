import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};


function VDart() {
    const navigate = useNavigate();

    return (
        <motion.div className="min-h-screen bg-black text-white" variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <button onClick={() => navigate('/', { state: { backfromwork: true } })} className="fixed top-8 left-8 z-50">← Back</button>

            <div className="flex items-center justify-center min-h-screen px-8">
                <motion.div
                    layoutId="work-image-project-alpha"
                    className="relative"
                    transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.8 }}
                >
                    <img src="/src/assets/HeadshotCropped.png" className="max-w-4xl max-h-[70vh] object-contain rounded-lg shadow-2xl" />
                </motion.div>
            </div>

            {/* Custom content for Project Alpha */}
            <div className="container mx-auto px-8 pb-16">
                <h1 className="text-6xl font-light mb-8 text-center">Project Alpha</h1>
                <p className="text-xl font-light leading-relaxed max-w-4xl mx-auto text-center">
                    Specific details about Project Alpha...
                </p>
            </div>
        </motion.div>
    );
}

export default VDart