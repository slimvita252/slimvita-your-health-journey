import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { label: "Sobre Nós", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Parceiros", href: "/parceiros" },
    ],
    suporte: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Contato", href: "/contato" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Termos de Uso", href: "/termos" },
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Cookies", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/slimvita", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/slimvita", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/slimvita", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/slimvita", label: "Twitter" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-heading font-bold text-primary-foreground">
                  Slim<span className="text-primary">Vita</span>
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Transformando vidas através de planos personalizados de saúde e bem-estar. 
              Sua jornada para uma vida mais saudável começa aqui.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="mailto:contato@slimvita.com"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              contato@slimvita.com
            </a>
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              (11) 99999-9999
            </a>
          </div>
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} SlimVita. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
