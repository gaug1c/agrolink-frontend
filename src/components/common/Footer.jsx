import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-2xl">
                🅰
              </div>
              <div>
                <div className="font-bold text-lg">AGRO</div>
                <div className="text-xs text-green-300">LINK GABON</div>
              </div>
            </div>
            <p className="text-green-200 text-sm mb-4">
              Connectons producteurs et consommateurs pour une agriculture gabonaise plus forte et durable.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-green-200">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="hover:text-white transition">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link to="/producteurs" className="hover:text-white transition">
                  Nos Producteurs
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-white transition">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-green-200">
              <li>
                <Link to="/devenir-producteur" className="hover:text-white transition">
                  Devenir Producteur
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="hover:text-white transition">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/commandes" className="hover:text-white transition">
                  Suivi de Commande
                </Link>
              </li>
              <li>
                <Link to="/aide" className="hover:text-white transition">
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className="hover:text-white transition">
                  Nos Partenaires
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contactez-nous</h3>
            <ul className="space-y-3 text-green-200 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                <span>
                  Libreville, Gabon<br />
                  Quartier: Centre-ville<br />
                  BP: 1234
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-green-400" />
                <a href="tel:+24100000000" className="hover:text-white transition">
                  +241 074 22 54 06
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-green-400" />
                <a href="mailto:contact@agrolink.ga" className="hover:text-white transition">
                  menguegauthier30@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="mt-4">
              <p className="text-green-300 text-sm mb-2">
                Horaires d'ouverture:
              </p>
              <p className="text-green-200 text-sm">
                Lun - Ven: 8h00 - 18h00<br />
                Sam: 8h00 - 14h00<br />
                Dim: Fermé
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-green-700 mt-8 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-bold text-xl mb-2">
              Abonnez-vous à notre Newsletter
            </h3>
            <p className="text-green-200 mb-4">
              Recevez les dernières nouvelles et offres spéciales
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-lg font-semibold transition whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-300">
            <p>
              © {currentYear} Agrolink Gabon. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/conditions" className="hover:text-white transition">
                Conditions d'utilisation
              </Link>
              <span className="hidden md:inline">|</span>
              <Link to="/confidentialite" className="hover:text-white transition">
                Politique de confidentialité
              </Link>
              <span className="hidden md:inline">|</span>
              <Link to="/cookies" className="hover:text-white transition">
                Cookies
              </Link>
              <span className="hidden md:inline">|</span>
              <Link to="/mentions-legales" className="hover:text-white transition">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;