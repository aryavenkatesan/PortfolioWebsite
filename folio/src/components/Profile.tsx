import { motion } from 'framer-motion';
import ContactSquares from './ContactSquares';
import headshot from '/src/assets/HeadshotCropped.png';

function Profile() {
    return (
        <div className='flex flex-row justify-between bg-black'>
            <img src={headshot} className="h-[80vh] object-contain mr-15" />

            <motion.div
                className='flex flex-col justify-between font-montserrat font-extralight text-white'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
            >
                <div className='mr-50 text-right'>
                    <h1 className='tracking-tight text-7xl pb-3'>Nice to meet you!</h1>
                    <h2 className='opacity-78 text-2xl'>Thanks for scrolling all the way down here :)</h2>
                    <div className='mt-15' />
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1.3, ease: "easeOut", delay: 0.5 }}
                    >
                        I'm a CS student with an entrepreneurial vision. <br></br>
                        I specialize in making things go brr. <br></br>
                        Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. <br></br>
                        Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae.
                    </motion.p>
                </div>
                <div className='flex justify-end pr-10 pb-10'>
                    <ContactSquares onleft={false} />
                </div>
            </motion.div>
        </div>
    )
}

export default Profile;