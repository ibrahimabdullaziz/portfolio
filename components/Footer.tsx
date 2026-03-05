import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 mt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <p className="text-xl font-bold tracking-tight text-primary">
            Ibrahim<span className="text-accent">.</span>
          </p>
          <p className="text-text-muted mt-2 text-sm">
            Building high-performance web experiences.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/ibrahimabdullaziz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/ibrahim-abdullaziz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:ibrahimabdullaziz55@gmail.com"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-8 pt-8 border-t border-border flex flex-col items-center">
        <p className="text-text-muted text-sm text-center">
          © {new Date().getFullYear()} Ibrahim Abdullaziz Elgamal. Built with
          React & Next.js.
        </p>
      </div>
    </footer>
  );
}
