"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative w-full bg-surface/30">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Connect</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Get In Touch
            </h3>
            <p className="text-text-secondary mb-10 text-lg">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-muted font-mono uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:ibrahimabdullaziz55@gmail.com"
                    className="text-lg text-text-primary hover:text-accent transition-colors"
                  >
                    ibrahimabdullaziz55@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-muted font-mono uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:01024642180"
                    className="text-lg text-text-primary hover:text-accent transition-colors"
                  >
                    01024642180
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-muted font-mono uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-lg text-text-primary">
                    Kafr Elsheikh, Egypt
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface border border-border rounded-3xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-text-secondary ml-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-text-secondary ml-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-text-secondary ml-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-gradient-to-r from-accent to-[#4F46E5] text-white font-medium rounded-xl hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    Message Sent! ✓
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
