import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact">
      <h2>Let’s Build Something Great Together</h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        I’m excited to contribute to meaningful projects and grow alongside
        experienced development teams. Let’s connect!
      </motion.p>

      <motion.a
        href="mailto:tivva91@gmail.com"
        className="contact-btn"
        whileHover={{ scale: 1.05 }}
      >
        Get in Touch
      </motion.a>
    </section>
  );
}