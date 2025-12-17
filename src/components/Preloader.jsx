import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
    const [counter, setCounter] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    // Looping system text effect
    useEffect(() => {
        const texts = ["INITIALIZING CORE...", "LOADING ASSETS...", "CONNECTING SERVER...", "SYSTEM READY"];
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 600);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prev) => {
                const next = prev + 1;
                if (next > 100) {
                    clearInterval(timer);
                    setTimeout(finishLoading, 500);
                    return 100;
                }
                return next;
            });
        }, 20);

        return () => clearInterval(timer);
    }, [finishLoading]);

    const slideUp = {
        initial: { y: 0 },
        exit: {
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    }

    const opacity = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 0.5, delay: 0.2 }
        }
    }

    const primaryColor = '#0ea5e9'; // Cyan
    const secondaryColor = '#8b5cf6'; // Violet

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#020617',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace' // Tech font feel
            }}
        >
            <motion.div variants={opacity} initial="initial" exit="exit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Tech Container */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px' }}>

                    {/* Ring 1: Fast Thin Solid */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderTop: `2px solid ${primaryColor}`,
                            borderBottom: `2px solid ${primaryColor}`,
                            borderRadius: '50%',
                            boxSizing: 'border-box',
                            boxShadow: `0 0 15px ${primaryColor}`
                        }}
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Ring 2: Dashed Tech Ring */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            width: '80%',
                            height: '80%',
                            border: `2px dashed ${secondaryColor}`,
                            borderRadius: '50%',
                            boxSizing: 'border-box',
                            opacity: 0.7
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Ring 3: Center Glow */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            width: '50%',
                            height: '50%',
                            backgroundColor: primaryColor,
                            borderRadius: '50%',
                            opacity: 0.1,
                            filter: 'blur(10px)'
                        }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Center Text */}
                    <div style={{ position: 'absolute', zIndex: 10 }}>
                        <span style={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '0.1em',
                            textShadow: `0 0 10px ${primaryColor}`
                        }}>RH.</span>
                    </div>
                </div>

                {/* Counter with Progress Bar Look */}
                <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        fontSize: '3.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: `0 0 20px ${secondaryColor}`
                    }}>
                        {counter}
                        <span style={{ fontSize: '1rem', marginLeft: '5px', color: primaryColor }}>%</span>
                    </div>
                </div>

                {/* Changing System Text */}
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.9rem',
                    color: primaryColor,
                    letterSpacing: '0.2em',
                    minHeight: '20px'
                }}>
                    [{["INITIALIZING", "LOADING ASSETS", "SYSTEM READY"][Math.floor((counter / 101) * 3)]}...]
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                    style={{
                        marginTop: '20px',
                        height: '2px',
                        backgroundColor: secondaryColor,
                        boxShadow: `0 0 10px ${secondaryColor}`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: '200px' }}
                    transition={{ duration: 2 }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
