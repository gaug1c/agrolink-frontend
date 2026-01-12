import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Briefcase, Upload, Leaf, Package } from 'lucide-react';
import Button from '../components/common/Button';
import Input, { Select, Checkbox } from '../components/common/Input';
import UserTypeSelector from '../components/auth/UserTypeSelector';
import { useAuth } from '../hooks/useAuth';
import Alert from '../components/common/Alert';

const RegisterForm = ({ onSuccess, redirectTo }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userType: 'consommateur',
    // Champs communs
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    
    // Champs consommateur
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    ville: '',
    
    // Champs producteur
    nomResponsable: '',
    nomStructure: '',
    typesProduction: [],
    autreProduction: '',
    province: '',
    villeProduction: '',
    villageProduction: '',
    surfaceCultivee: '',
    uniteSurface: 'hectare',
    quantiteDisponible: '',
    telephoneProducteur: '',
    isWhatsApp: false,
    emailProducteur: '',
    possibiliteLivraison: '',
    pieceIdentite: null,
  });

  const [errors, setErrors] = useState({});

  // Options pour consommateurs
  const villesOptions = [
    { value: '', label: 'Sélectionner une ville' },
    { value: 'libreville', label: 'Libreville' },
    { value: 'port-gentil', label: 'Port-Gentil' },
    { value: 'franceville', label: 'Franceville' },
    { value: 'oyem', label: 'Oyem' },
    { value: 'moanda', label: 'Moanda' },
  ];

  // Options pour producteurs
  const provincesOptions = [
    { value: '', label: 'Sélectionner une province' },
    { value: 'estuaire', label: 'Estuaire' },
    { value: 'haut-ogooue', label: 'Haut-Ogooué' },
    { value: 'moyen-ogooue', label: 'Moyen-Ogooué' },
    { value: 'ngounie', label: 'Ngounié' },
    { value: 'nyanga', label: 'Nyanga' },
    { value: 'ogooue-ivindo', label: 'Ogooué-Ivindo' },
    { value: 'ogooue-lolo', label: 'Ogooué-Lolo' },
    { value: 'ogooue-maritime', label: 'Ogooué-Maritime' },
    { value: 'woleu-ntem', label: 'Woleu-Ntem' },
  ];

  const villesParProvince = {
    'estuaire': ['Libreville', 'Owendo', 'Akanda', 'Ntoum', 'Kango'],
    'haut-ogooue': ['Franceville', 'Moanda', 'Mounana', 'Okondja', 'Lékoni'],
    'moyen-ogooue': ['Lambaréné', 'Ndjolé', 'Bifoun'],
    'ngounie': ['Mouila', 'Ndendé', 'Mimongo', 'Mbigou', 'Lebamba'],
    'nyanga': ['Tchibanga', 'Mayumba', 'Moabi'],
    'ogooue-ivindo': ['Makokou', 'Mékambo', 'Booué', 'Ovan'],
    'ogooue-lolo': ['Koulamoutou', 'Lastoursville', 'Pana'],
    'ogooue-maritime': ['Port-Gentil', 'Omboué', 'Gamba'],
    'woleu-ntem': ['Oyem', 'Bitam', 'Mitzic', 'Minvoul'],
  };

  const typesProductionOptions = [
    { value: 'banane', label: 'Banane' },
    { value: 'manioc', label: 'Manioc' },
    { value: 'tomate', label: 'Tomate' },
    { value: 'aubergine', label: 'Aubergine' },
    { value: 'piment', label: 'Piment' },
    { value: 'maïs', label: 'Maïs' },
    { value: 'arachide', label: 'Arachide' },
    { value: 'poisson', label: 'Poisson' },
    { value: 'poulet', label: 'Poulet' },
    { value: 'porc', label: 'Porc' },
    { value: 'œufs', label: 'Œufs' },
    { value: 'légumes', label: 'Légumes' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProductionTypeChange = (value) => {
    setFormData(prev => {
      const typesProduction = prev.typesProduction.includes(value)
        ? prev.typesProduction.filter(t => t !== value)
        : [...prev.typesProduction, value];
      return { ...prev, typesProduction };
    });
    if (errors.typesProduction) {
      setErrors(prev => ({ ...prev, typesProduction: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, pieceIdentite: 'Le fichier ne doit pas dépasser 5 MB' }));
        return;
      }
      // Vérifier le type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, pieceIdentite: 'Format non accepté. Utilisez JPG, PNG ou PDF' }));
        return;
      }
      setFormData(prev => ({ ...prev, pieceIdentite: file }));
      setErrors(prev => ({ ...prev, pieceIdentite: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (formData.userType === 'consommateur') {
      // Validation consommateur
      if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
      if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
      
      if (!formData.email) {
        newErrors.email = 'Email requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }

      if (!formData.telephone) {
        newErrors.telephone = 'Téléphone requis';
      } else if (!/^(\+241)?[0-9]{8,}$/.test(formData.telephone.replace(/\s/g, ''))) {
        newErrors.telephone = 'Numéro invalide';
      }

      if (!formData.ville) newErrors.ville = 'Ville requise';

    } else if (formData.userType === 'producteur') {
      // Validation producteur
      if (!formData.nomResponsable.trim()) {
        newErrors.nomResponsable = 'Nom du responsable requis';
      }

      if (formData.typesProduction.length === 0 && !formData.autreProduction.trim()) {
        newErrors.typesProduction = 'Sélectionnez au moins un type de production';
      }

      if (!formData.province) {
        newErrors.province = 'Province requise';
      }

      if (!formData.villeProduction && !formData.villageProduction) {
        newErrors.villeProduction = 'Ville ou village requis';
      }

      if (!formData.telephoneProducteur) {
        newErrors.telephoneProducteur = 'Numéro de téléphone requis';
      } else if (!/^(\+241)?[0-9]{8,}$/.test(formData.telephoneProducteur.replace(/\s/g, ''))) {
        newErrors.telephoneProducteur = 'Numéro invalide';
      }

      if (formData.emailProducteur && !/\S+@\S+\.\S+/.test(formData.emailProducteur)) {
        newErrors.emailProducteur = 'Email invalide';
      }

      if (!formData.pieceIdentite) {
        newErrors.pieceIdentite = 'Pièce d\'identité requise';
      }
    }

    // Validation commune
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  if (!validate()) return;

  setLoading(true);

  try {
    const submitData = new FormData();

    if (formData.userType === 'producteur') {
      Object.keys(formData).forEach(key => {
        if (key === 'typesProduction') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (key === 'pieceIdentite' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });
    } else {
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });
    }

    const response = await register(submitData);

    // Vérifier que l'inscription a réussi côté backend
    if (!response?.data?.user || !response?.data?.token) {
      throw new Error(response?.data?.message || "Impossible de créer le compte");
    }

    // Succès
    setSuccess(true);

    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        const userType = response.data.user.userType || formData.userType;
        if (userType === 'producteur' || userType === 'producer') {
          navigate('/producteur/dashboard');
        } else {
          navigate('/');
        }
      }
    }, 2000);

  } catch (err) {
      console.error('Erreur inscription:', err);
      console.log('Données de l’erreur:', err.response?.data);
  setError(err.response?.data?.message || err.message || "Une erreur est survenue");
} finally {
    setLoading(false);
  }
};


  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h3>
        <p className="text-gray-600 mb-4">
          {formData.userType === 'producteur' 
            ? 'Votre compte producteur a été créé avec succès. Redirection vers votre dashboard...' 
            : 'Votre compte a été créé avec succès. Redirection...'}
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <Alert
          type="error"
          message={error}
          dismissible
          onDismiss={() => setError('')}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selector */}
        <UserTypeSelector
          selected={formData.userType}
          onChange={(type) => setFormData(prev => ({ ...prev, userType: type }))}
        />

        {/* CHAMPS CONSOMMATEUR */}
        {formData.userType === 'consommateur' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Jean"
                icon={<User />}
                error={errors.prenom}
                required
              />
              <Input
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Dupont"
                icon={<User />}
                error={errors.nom}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              icon={<Mail />}
              error={errors.email}
              required
            />

            <Input
              label="Téléphone"
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+241 XX XX XX XX"
              icon={<Phone />}
              error={errors.telephone}
              required
            />

            <Input
              label="Adresse (optionnel)"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              icon={<MapPin />}
            />

            <Select
              label="Ville"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              options={villesOptions}
              error={errors.ville}
              required
            />
          </>
        )}

        {/* CHAMPS PRODUCTEUR */}
        {formData.userType === 'producteur' && (
          <>
            {/* Nom du responsable */}
            <Input
              label="Nom complet du responsable"
              name="nomResponsable"
              value={formData.nomResponsable}
              onChange={handleChange}
              placeholder="Ex: Jean Dupont"
              icon={<User />}
              error={errors.nomResponsable}
              required
            />

            {/* Nom de la structure */}
            <Input
              label="Nom de la structure (optionnel)"
              name="nomStructure"
              value={formData.nomStructure}
              onChange={handleChange}
              placeholder="Ex: Ferme Bio du Gabon"
              icon={<Briefcase />}
            />

            {/* Types de production */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Types de production <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {typesProductionOptions.map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center p-3 rounded-lg border-2 cursor-pointer transition
                      ${formData.typesProduction.includes(option.value)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={formData.typesProduction.includes(option.value)}
                      onChange={() => handleProductionTypeChange(option.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.typesProduction && (
                <p className="text-red-500 text-sm mt-1">{errors.typesProduction}</p>
              )}
            </div>

            {/* Autre production */}
            <Input
              label="Autre type de production"
              name="autreProduction"
              value={formData.autreProduction}
              onChange={handleChange}
              placeholder="Si autre, précisez..."
              icon={<Leaf />}
            />

            {/* Localisation */}
            <div>
              <Select
                label="Province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                options={provincesOptions}
                error={errors.province}
                required
              />

              {formData.province && villesParProvince[formData.province] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Ville"
                    name="villeProduction"
                    value={formData.villeProduction}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Sélectionner une ville' },
                      ...villesParProvince[formData.province].map(v => ({ value: v, label: v }))
                    ]}
                    error={errors.villeProduction}
                  />
                  <Input
                    label="Village (optionnel)"
                    name="villageProduction"
                    value={formData.villageProduction}
                    onChange={handleChange}
                    placeholder="Nom du village"
                    icon={<MapPin />}
                  />
                </div>
              )}
            </div>

            {/* Surface cultivée / Capacité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Surface cultivée / Capacité (optionnel)"
                name="surfaceCultivee"
                type="number"
                value={formData.surfaceCultivee}
                onChange={handleChange}
                placeholder="Ex: 5"
                icon={<Package />}
              />
              <Select
                label="Unité"
                name="uniteSurface"
                value={formData.uniteSurface}
                onChange={handleChange}
                options={[
                  { value: 'hectare', label: 'Hectare (ha)' },
                  { value: 'metre-carre', label: 'Mètre carré (m²)' },
                ]}
              />
            </div>

            {/* Quantité disponible */}
            <Input
              label="Quantité disponible (optionnel)"
              name="quantiteDisponible"
              value={formData.quantiteDisponible}
              onChange={handleChange}
              placeholder="Ex: 500 kg, 100 unités..."
              icon={<Package />}
            />

            {/* Téléphone producteur */}
            <div>
              <Input
                label="Numéro de téléphone"
                type="tel"
                name="telephoneProducteur"
                value={formData.telephoneProducteur}
                onChange={handleChange}
                placeholder="+241 XX XX XX XX"
                icon={<Phone />}
                error={errors.telephoneProducteur}
                required
              />
              <div className="mt-2">
                <Checkbox
                  name="isWhatsApp"
                  checked={formData.isWhatsApp}
                  onChange={handleChange}
                  label="Ce numéro est aussi sur WhatsApp"
                />
              </div>
            </div>

            {/* Email producteur */}
            <Input
              label="Adresse email (optionnel)"
              type="email"
              name="emailProducteur"
              value={formData.emailProducteur}
              onChange={handleChange}
              placeholder="exemple@email.com"
              icon={<Mail />}
              error={errors.emailProducteur}
            />

            {/* Possibilité de livraison */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Possibilité de livraison (optionnel)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="possibiliteLivraison"
                    value="oui"
                    checked={formData.possibiliteLivraison === 'oui'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Oui</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="possibiliteLivraison"
                    value="non"
                    checked={formData.possibiliteLivraison === 'non'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Non</span>
                </label>
              </div>
            </div>

            {/* Pièce d'identité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièce d'identité <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="h-8 w-8 mb-2" />
                  <span className="text-sm">
                    {formData.pieceIdentite 
                      ? formData.pieceIdentite.name 
                      : 'Cliquez pour télécharger (JPG, PNG, PDF - max 5MB)'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {errors.pieceIdentite && (
                <p className="text-red-500 text-sm mt-1">{errors.pieceIdentite}</p>
              )}
            </div>
          </>
        )}

        {/* CHAMPS COMMUNS */}
        {/* Mot de passe */}
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          icon={<Lock />}
          error={errors.password}
          required
        />

        {/* Confirmer mot de passe */}
        <Input
          label="Confirmer le mot de passe"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          icon={<Lock />}
          error={errors.confirmPassword}
          required
        />

        {/* Terms */}
        <div>
          <Checkbox
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            label={
              <span className="text-sm">
                J'accepte les{' '}
                <Link to="/conditions" className="text-green-600 hover:underline font-semibold">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="text-green-600 hover:underline font-semibold">
                  politique de confidentialité
                </Link>
              </span>
            }
          />
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/connexion" 
              className="text-green-600 hover:text-green-700 font-bold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;