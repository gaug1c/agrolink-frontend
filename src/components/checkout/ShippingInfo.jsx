import React from 'react';
import { User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import Input, { Select, Textarea } from '../common/Input';

const ShippingInfo = ({ formData, errors, onChange }) => {
  const villesOptions = [
    { value: '', label: 'Sélectionner une ville' },
    { value: 'libreville', label: 'Libreville' },
    { value: 'port-gentil', label: 'Port-Gentil' },
    { value: 'franceville', label: 'Franceville' },
    { value: 'oyem', label: 'Oyem' },
    { value: 'moanda', label: 'Moanda' },
    { value: 'lambarene', label: 'Lambaréné' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Informations de livraison
      </h2>

      <div className="space-y-4">
        {/* Nom & Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={onChange}
            placeholder="Votre nom"
            icon={<User />}
            error={errors.nom}
            required
          />
          <Input
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={onChange}
            placeholder="Votre prénom"
            icon={<User />}
            error={errors.prenom}
            required
          />
        </div>

        {/* Email & Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="exemple@email.com"
            icon={<Mail />}
            error={errors.email}
            helperText="Pour la confirmation de commande"
            required
          />
          <Input
            label="Téléphone"
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={onChange}
            placeholder="+241 XX XX XX XX"
            icon={<Phone />}
            error={errors.telephone}
            helperText="Pour le suivi de livraison"
            required
          />
        </div>

        {/* Adresse */}
        <Input
          label="Adresse complète"
          name="adresse"
          value={formData.adresse}
          onChange={onChange}
          placeholder="Numéro, rue, quartier"
          icon={<MapPin />}
          error={errors.adresse}
          required
        />

        {/* Ville & Code Postal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Ville"
            name="ville"
            value={formData.ville}
            onChange={onChange}
            options={villesOptions}
            error={errors.ville}
            required
          />
          <Input
            label="Code postal (optionnel)"
            name="codePostal"
            value={formData.codePostal}
            onChange={onChange}
            placeholder="BP XXXX"
            error={errors.codePostal}
          />
        </div>

        {/* Instructions spéciales */}
        <Textarea
          label="Instructions de livraison (optionnel)"
          name="instructions"
          value={formData.instructions}
          onChange={onChange}
          placeholder="Ex: Appartement 3B, Sonner deux fois, etc."
          rows={3}
          helperText="Toute information utile pour le livreur"
        />

        {/* Delivery Options */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Options de livraison
          </h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="standard"
                defaultChecked
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-gray-800">Livraison standard (24-48h)</p>
                <p className="text-sm text-gray-600">Gratuite pour commandes > 10 000 FCFA</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="express"
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-gray-800">Livraison express (même jour)</p>
                <p className="text-sm text-gray-600">+ 3 000 FCFA (disponible à Libreville uniquement)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ Nous livrons du lundi au samedi de 8h à 18h
          </p>
          <p className="text-sm text-green-800 mt-1">
            ✓ Vous recevrez un SMS de confirmation avec le numéro de suivi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;