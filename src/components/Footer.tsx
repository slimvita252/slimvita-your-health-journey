import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t("footer.about"), href: "/about" },
      { label: t("footer.blog"), href: "/blog" },
      { label: t("footer.careers"), href: "/careers" },
      { label: t("footer.partners"), href: "/partners" },
    ],
    support: [
      { label: t("footer.helpCenter"), href: "/help" },
      { label: t("footer.contact"), href: "/contact" },
      { label: t("footer.faq"), href: "/faq" },
    ],
    legal: [
      { label: t("footer.terms"), href: "/terms" },
      { label: t("footer.privacy"), href: "/privacy" },
      { label: t("footer.cookies"), href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/slimvita", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/slimvita", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/slimvita", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/slimvita", label: "Twitter" },
  ];

  return (
    <footer id="support" className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-2">Stay Updated</h3>
              <p className="text-background/60">{t("footer.description")}</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-80 px-5 py-3 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-primary"
              />
              <Button className="rounded-full px-6 bg-primary hover:bg-primary-dark">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-heading font-bold">
                Slim<span className="text-primary">Vita</span>
              </span>
            </Link>
            <p className="text-background/60 mb-6 max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-background/60 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t("footer.support")}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-background/60 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-background/60 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-background/60">
            <a href="mailto:support@slimvita.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              support@slimvita.com
            </a>
            <a href="tel:+18005551234" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              1-800-555-1234
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Austin, TX
            </span>
          </div>
          <p className="text-background/40 text-sm">
            © {currentYear} SlimVita. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
