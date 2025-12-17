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

    // "Warp Speed" Exit Animation
    const exitAnimation = {
        initial: { opacity: 1, scale: 1 },
        exit: {
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    }

    const opacity = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    }

    const primaryColor = '#0ea5e9'; // Cyan
    const secondaryColor = '#8b5cf6'; // Violet

    return (
        <motion.div
            variants={exitAnimation}
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
                fontFamily: 'monospace'
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

                    {/* Center Text - Updated with Gradient */}
                    <div style={{ position: 'absolute', zIndex: 10 }}>
                        <div style={{ display: 'inline-block' }}>
                            <span style={{
                                fontSize: '3rem',
                                fontWeight: 900,
                                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '0.1em',
                                filter: `drop-shadow(0 0 10px ${primaryColor})`
                            }}>R</span>
                        </div>
                    </div>
                </div>


            </motion.div>
        </motion.div>
    );
};

export default Preloader;
