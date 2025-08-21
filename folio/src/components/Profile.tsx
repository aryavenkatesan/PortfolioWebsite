import { motion } from 'framer-motion';
import ContactSquares from './ContactSquares';
import headshot from '/src/assets/HeadshotCropped.png';

function Profile() {
    return (
        <div className="relative bg-black min-h-screen w-full flex flex-col justify-center -mt-100 lg:-mt-50 lg:pr-10 xl:pr-20">
            {/* Fixed Headshot bottom-left */}
            <img
                src={headshot}
                className="
                    absolute bottom-0 left-0 
                    h-[25vh] sm:h-[35vh] lg:h-[56vh] hl:h-[69vh] xl:h-[78vh]
                    object-contain
                "
                alt="Headshot"
            />

            {/* Fixed ContactSquares bottom-right */}
            <div
                className="
                    absolute bottom-0 right-0
                    pr-6 pb-4 sm:p-10 
                "
            >
                <ContactSquares onleft={false} />
            </div>

            {/* Text Content */}
            <motion.div
                className="
                    mx-auto text-center 
                    max-w-2xl px-6
                    lg:ml-auto lg:max-w-3xl lg:text-right lg:text-white lg:mr-0
                    font-montserrat font-extralight text-white
                "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
            >
                <div>
                    <h1 className="tracking-tight text-3xl sm:text-4xl lg:text-6xl xl:text-7xl pb-3">
                        Nice to meet you!
                    </h1>
                    <h2 className="opacity-80 text-base sm:text-lg lg:text-xl xl:text-2xl">
                        Thanks for scrolling all the way down here :)
                    </h2>
                    <div className="mt-6 sm:mt-10" />

                    <motion.p
                        className="
        text-sm md:text-base xl:text-lg 
        mx-3 text-center
        lg:mx-0 lg:ml-auto lg:text-right 
        lg:max-w-xl xl:max-w-2xl
        tracking-[0.045rem]
    "
                    >
                        <span className="block leading-snug">
                            I'm a CS student at UNC Chapel Hill bit by the entreprenurial bug.
                        </span>
                        <span className="block leading-snug mt-2">
                            I find purpose in making a difference in people's lives, whether that's helping people find their next meal (Swipeshare) or devloping the autonomous vehicles of the future (Scenic).
                        </span>
                        <span className="block leading-snug mt-2">
                            In my free time I like to play drums - available for gigs :) - and practice taekwondo (current treasurer of UNC TKD).
                        </span>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}

export default Profile;