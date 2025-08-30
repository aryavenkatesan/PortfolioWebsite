import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function SingleWork({
    title,
    desc,
    image, // Add image prop
    path
}: {
    title: string;
    desc: string;
    image: string; // Add image type
    path: string
}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path); // Use the specific route instead of generic path
    };
    return (
        <div className='opacity-85'>
            <motion.div
                className="relative overflow-hidden group cursor-pointer bg-transparent"
                data-cursor-image={image} // Add image as data attribute
                data-cursor-hover="work" // Specific identifier for work items
                initial="initial"
                whileHover="hover"
                animate="initial"
                onClick={handleClick}
            >
                <motion.div
                    className="absolute inset-0 bg-[rgb(206,205,205)] mix-blend-difference pointer-events-none z-10 origin-bottom rounded-sm"
                    variants={{
                        initial: {
                            opacity: 0,
                            scaleY: 0,
                        },
                        hover: {
                            opacity: 0.75,
                            scaleY: 1,
                        }
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.05,
                    }}
                />

                <div className="flex flex-col md:flex-row justify-between items-center px-10 mt-16 md:my-10 gap-2 md:gap-8 relative">
                    <h1 className="font-montserrat font-extralight text-left text-gray-300 text-5xl md:text-[4.5rem] opacity-100">{title}</h1>

                    <div className="flex items-center relative">
                        <motion.p
                            className="font-montserrat font-extralight opacity-100 text-center md:text-right text-base md:text-[2rem] text-gray-300"
                            variants={{
                                initial: {
                                    x: 0,
                                },
                                hover: {
                                    x: -20, // Move left on larger screens
                                }
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        >
                            {desc}
                        </motion.p>

                        {/* Arrow that appears on hover - only on larger screens */}
                        <motion.div
                            className="hidden md:block absolute -right-8 pointer-events-none"
                            variants={{
                                initial: {
                                    opacity: 0,
                                    x: -10,
                                },
                                hover: {
                                    opacity: 1,
                                    x: 0,
                                }
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 32 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-300"
                            >
                                <path
                                    d="M2 12H26M26 12L20 6M26 12L20 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default SingleWork