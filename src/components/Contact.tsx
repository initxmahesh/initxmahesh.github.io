import { Github, Mail, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/initxmahesh", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/initxmahesh/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://x.com/initxmahesh",
    label: "X (Twitter)",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const Contact = () => {
  return (
    <footer>
      <section id="contact" aria-label="Contact" className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="section-number">04</span>
            <div className="h-px flex-1 bg-border" />
            <span className="code-tag">contact.json</span>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions. Feel free to reach out
              if you want to connect!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:initx.mahesh@gmail.com"
                aria-label="Send email to initx.mahesh@gmail.com"
                className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">initx.mahesh@gmail.com</div>
                </div>
              </a>

              <nav
                aria-label="Social media links"
                className="flex flex-wrap gap-4 pt-4"
              >
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-border">
            <div className="flex justify-end text-sm text-muted-foreground">
              <div className="font-mono">
                &copy; {new Date().getFullYear()} initxmahesh. All rights
                reserved.
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Contact;
