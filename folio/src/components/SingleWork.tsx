import { motion } from 'framer-motion';

function SingleWork({
    title,
    desc,
    image, // Add image prop
    onClick
}: {
    title: string;
    desc: string;
    image: string; // Add image type
    onClick?: () => void
}) {
    return (
        <div className='opacity-85'>
            <motion.div
                className="relative overflow-hidden group cursor-pointer bg-transparent"
                data-cursor-image={image} // Add image as data attribute
                data-cursor-hover="work" // Specific identifier for work items
                initial="initial"
                whileHover="hover"
                animate="initial"
                onClick={onClick}
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

                <div className="flex flex-row justify-between items-center px-20 my-10 gap-8 relative">
                    <h1 className="font-montserrat font-extralight text-left text-gray-300 text-[4.5rem] opacity-100">{title}</h1>
                    <p className="font-montserrat font-extralight opacity-100 text-right text-[2rem] text-gray-300">{desc}</p>
                </div>
            </motion.div>
        </div>
    )
}

export default SingleWork