import { motion, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Magnetic = ({ children }) => {
    const ref = useRef(null);

    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX * 0.35);
        y.set(middleY * 0.35);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ position: 'relative', display: 'inline-block' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            <motion.div style={{ x, y }}>
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Magnetic;
