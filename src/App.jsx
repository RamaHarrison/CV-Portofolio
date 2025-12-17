import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import ImageSlider from './components/ImageSlider'
import { FaLinkedin, FaInstagram, FaGithub, FaWhatsapp, FaLocationDot, FaEnvelope, FaFilePdf, FaBars, FaXmark } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import Magnetic from './components/Magnetic';
import SpotlightCard from './components/SpotlightCard';
import Lenis from 'lenis'
import './index.css'

function App() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lenis Smooth Scroll
    // Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    // Active Link Logic
    const [activeSection, setActiveSection] = useState('home');
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" } // Trigger when section crosses the middle of the screen
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }

    const title = "Rama Harrison";

    const organizations = [
        {
            id: 1,
            title: "Social Is Me'24",
            description: "The annual community service program of the Multimedia Nusantara University (UMN) Information Systems Student Association (HIMSI), which focuses on social activities and community empowerment through concrete actions, seminars, and education to create a better and more socially conscious society.",
            images: ["/images/SIM1.jpg", "/images/DSCF7810.jpg", "/images/sosialisme.JPG"]
        },
        {
            id: 2,
            title: "Disco'25",
            description: "UMN DISCO (D'Information System Community Outbound) is a mandatory annual program for new Information System students at Multimedia Nusantara University (UMN), organized by the Information System Student Association (HIMSI UMN) as an outbound event to build camaraderie, teamwork, and campus familiarity through various games and activities outside the campus area.",
            images: ["/images/Disco2.jpg", "/images/Disco1.jpg"]
        }
    ];

    return (
        <>
            <CustomCursor />
            <Background />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[1001]"
                style={{ scaleX, background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
            />

            <header className={isScrolled ? 'scrolled' : ''}>
                <nav>
                    <div className="logo">
                        <a href="#">RH.</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="nav-menu desktop-menu">
                        <ul>
                            <li><Magnetic><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></Magnetic></li>
                            <li><Magnetic><a href="#organizations" className={activeSection === 'organizations' ? 'active' : ''}>Organizations</a></Magnetic></li>
                            <li><Magnetic><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Projects</a></Magnetic></li>
                            <li><Magnetic><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></Magnetic></li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li onClick={() => setMobileMenuOpen(false)}><a href="#home">Home</a></li>
                            <li onClick={() => setMobileMenuOpen(false)}><a href="#organizations">Organizations</a></li>
                            <li onClick={() => setMobileMenuOpen(false)}><a href="#experience">Projects</a></li>
                            <li onClick={() => setMobileMenuOpen(false)}><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Home Section */}
            <section id="home">
                <motion.div
                    className="left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="content">
                        <motion.h2 variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            Hi, I'm <br />
                            <span className="stroke-text inline-block" style={{ fontSize: '0.8em', color: 'var(--primary)' }}>
                                <TypeAnimation
                                    sequence={[
                                        'Rama Harrison',
                                        1000,
                                        'A Web Developer',
                                        1000,
                                        'A Data Analyst',
                                        1000,
                                        'A UI/UX Designer',
                                        1000
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{ display: 'inline-block' }}
                                    repeat={Infinity}
                                />
                            </span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            5th semester Information Systems student from Multimedia Nusantara University (UMN). Focusing in Database, SQL Developer, SQL Administration, Data & Business Analysis, Machine Learning, And UI/UX.
                        </motion.p>
                        <Magnetic>
                            <motion.a
                                href="#contact"
                                className="btn"
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px var(--primary)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Interested?
                            </motion.a>
                        </Magnetic>
                    </div>
                </motion.div>
                <motion.div
                    className="right"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="image-container">
                        <div className="image-bg"></div>
                        <img src="/images/RamaHarrison.jpg" alt="Profile" />
                    </div>
                </motion.div>
            </section>

            {/* Organizations Section (Renamed from Projects) */}
            <section id="organizations">
                <motion.div
                    className="header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1>Organizations</h1>
                    <p>Here are some organizations that I have joined recently</p>
                </motion.div>
                <motion.div
                    className="projects-list"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {organizations.map((org) => (
                        <Tilt key={org.id} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05}>
                            <SpotlightCard className="h-full rounded-xl">
                                <motion.div
                                    className="project h-full bg-transparent border-none"
                                    variants={fadeInUp}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="project-image">
                                        <ImageSlider images={org.images} />
                                    </div>
                                    <div className="project-info">
                                        <h2 className="project-title">{org.title}</h2>
                                        <p className="project-desc">{org.description}</p>
                                        <div className="status">
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="view-more-btn">View Details &rarr;</a>
                                        </div>
                                    </div>
                                </motion.div>
                            </SpotlightCard>
                        </Tilt>
                    ))}
                </motion.div>
            </section>

            {/* Projects Section */}
            <section id="experience">
                <motion.div
                    className="header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1>Projects</h1>
                    <p>These are the projects I have completed.</p>
                </motion.div>
                <motion.div
                    className="experience-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[
                        { role: "UI/UX Project", company: "Anti-Bullying App For University & School", date: "2024", image: "/images/SafeCircle.jpg", link: "https://www.figma.com/design/AAdpp734KLry2IhADtUCO2/Project-UX?node-id=0-1&t=NhWEMUPsZfNcjfbm-1" },
                        { role: "Data Modelling Project", company: "Use GANs to create art - Will you be the next Monet?", date: "2024", image: "/images/Monet.jpg", link: "https://github.com/rendragonnn/CycleGAN-Monet-Inspired-Image" },
                        { role: "Object Oriented Programming Project", company: "Developed a console-based application for managing a simplified zoo environment.", date: "2023", image: "/images/kebunbinatang.jpg", link: "https://github.com/RamaHarrison/Object-Oriented-Programming" },
                        { role: "Machine Learning Project", company: "Health Data Analysis for Diabetes Prediction with Machine Learning", date: "2024", image: "/images/diabetes.jpg", link: "https://github.com/rendragonnn/Diabetes-Prediction-with-Random-Forest-" },
                        { role: "Probability and Statistics Project", company: "The Effect of Student Lectures on the Intensity of Visits to Fitness Centers", date: "2023", image: "/images/fitness.jpg", link: "https://github.com/RamaHarrison/Probability-and-Statistics" },
                        { role: "Web Design and Development Project", company: "Website Planning for 'libro' the UMN Cafeteria", date: "2024", image: "/images/libro.jpg", link: "https://github.com/RamaHarrison/Web-Design-and-Development" }
                    ].map((exp, index) => (
                        <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05}>
                            <SpotlightCard className="h-full rounded-xl">
                                <motion.div
                                    className="experience-item h-full bg-transparent border-none"
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <div className="project-card-image">
                                        <img src={exp.image} alt={exp.role} />
                                    </div>
                                    <div className="project-card-content">
                                        <div className="project-text-group">
                                            <div className="project-header-row">
                                                <h3>{exp.role}</h3>
                                                <span className="experience-date">{exp.date}</span>
                                            </div>
                                            <p className="company-name">{exp.company}</p>
                                        </div>
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="view-details-link">
                                            View Details <span>&rarr;</span>
                                        </a>
                                    </div>
                                </motion.div>
                            </SpotlightCard>
                        </Tilt>
                    ))}
                </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <motion.div
                    className="header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1>Contact Me</h1>
                    <p>Get in touch or download my CV below</p>
                </motion.div>
                <div className="contact-container">
                    <motion.div
                        className="contact-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Socials */}
                        <motion.a
                            href="https://www.linkedin.com/in/rama-harrison-59334028a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, backgroundColor: "#0077b5", color: "#fff" }}
                        >
                            <div className="icon"><FaLinkedin /></div>
                            <h3>LinkedIn</h3>
                            <p>Connect professionally</p>
                        </motion.a>

                        <motion.a
                            href="https://www.instagram.com/ramahrsn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, backgroundColor: "#E1306C", color: "#fff" }}
                        >
                            <div className="icon"><FaInstagram /></div>
                            <h3>Instagram</h3>
                            <p>Follow my daily updates</p>
                        </motion.a>

                        <motion.a
                            href="https://github.com/RamaHarrison"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, backgroundColor: "#333", color: "#fff" }}
                        >
                            <div className="icon"><FaGithub /></div>
                            <h3>GitHub</h3>
                            <p>Check out my repos</p>
                        </motion.a>

                        {/* Contact Info */}
                        <motion.a
                            href="https://maps.app.goo.gl/gQsBAeunynQhFNBa9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, borderColor: "var(--primary)" }}
                        >
                            <div className="icon" style={{ color: "var(--primary)" }}><FaLocationDot /></div>
                            <h3>Location</h3>
                            <p>Tangerang, Indonesia</p>
                        </motion.a>

                        <motion.a
                            href="mailto:Ramaliu2013@gmail.com"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, borderColor: "var(--primary)" }}
                        >
                            <div className="icon" style={{ color: "var(--primary)" }}><FaEnvelope /></div>
                            <h3>Email</h3>
                            <p>contact@ramaharrison.com</p>
                        </motion.a>

                        <motion.a
                            href="https://wa.me/6287788522510"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, backgroundColor: "#25D366", color: "#fff" }}
                        >
                            <div className="icon"><FaWhatsapp /></div>
                            <h3>WhatsApp</h3>
                            <p>+62 877 8852 2510</p>
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="cv-download"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <a href="/cv.pdf" download="Rama_Harrison_CV.pdf" className="btn btn-large">
                            <FaFilePdf style={{ marginRight: '10px' }} /> Download CV
                        </a>
                        <p className="cv-desc">Download my complete Curriculum Vitae in PDF format.</p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <p>
                        &copy; {new Date().getFullYear()} Portfolio. All Rights Reserved. <br />
                        <a href="https://github.com/RamaHarrison" target="_blank" rel="noopener noreferrer">Rama Harrison</a>
                    </p>
                </div>
            </footer>
        </>
    )
}


export default App
