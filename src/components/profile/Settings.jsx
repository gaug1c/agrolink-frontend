import React, { useState } from 'react';
import { Lock, Bell, Globe, Shield, Trash2, Eye, EyeOff, Save } from 'lucide-react';
import Button from '../common/Button';
import Input, { Checkbox } from '../common/Input';
import { ConfirmModal } from '../common/Modal';
import Alert from '../common/Alert';

const Settings = ({ user, onUpdate, onDeleteAccount }) => {
  const [activeTab, setActiveTab] = useState('security');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [success, setSuccess] = useState('');

  const tabs = [
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Globe },
  ];

  // Security Tab
  const SecurityTab = () => {
    const [passwords, setPasswords] = useState({
      current: '',
      new: '',
      confirm: '',
    });
    const [showPasswords, setShowPasswords] = useState({
      current: false,
      new: false,
      confirm: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess('Mot de passe modifié avec succès');
        setPasswords({ current: '', new: '', confirm: '' });
        setTimeout(() => setSuccess(''), 3000);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Changer le mot de passe
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Mot de passe actuel"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                className="absolute right-3 top-11 text-gray-400"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Nouveau mot de passe"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                placeholder="••••••••"
                helperText="Au moins 8 caractères"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                className="absolute right-3 top-11 text-gray-400"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmer le nouveau mot de passe"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                className="absolute right-3 top-11 text-gray-400"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              loading={loading}
              onClick={handleChangePassword}
              icon={<Lock className="w-5 h-5" />}
            >
              Changer le mot de passe
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Authentification à deux facteurs
          </h3>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-700 mb-2">
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </p>
              <p className="text-sm text-gray-600">
                Vous recevrez un code par SMS lors de la connexion
              </p>
            </div>
            <Button variant="outline">
              Activer
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Zone de danger
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-gray-700 mb-4">
              Supprimer définitivement votre compte et toutes vos données
            </p>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              icon={<Trash2 className="w-5 h-5" />}
            >
              Supprimer mon compte
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Notifications Tab
  const NotificationsTab = () => {
    const [settings, setSettings] = useState({
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRestock: true,
      priceDrops: true,
    });

    const handleToggle = (key) => {
      setSettings({...settings, [key]: !settings[key]});
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Notifications par email
          </h3>
          <div className="space-y-4">
            <Checkbox
              checked={settings.orderUpdates}
              onChange={() => handleToggle('orderUpdates')}
              label={
                <div>
                  <p className="font-semibold text-gray-800">Mises à jour des commandes</p>
                  <p className="text-sm text-gray-600">Statut de livraison, confirmation, etc.</p>
                </div>
              }
            />
            <Checkbox
              checked={settings.promotions}
              onChange={() => handleToggle('promotions')}
              label={
                <div>
                  <p className="font-semibold text-gray-800">Promotions et offres spéciales</p>
                  <p className="text-sm text-gray-600">Recevez nos meilleures offres</p>
                </div>
              }
            />
            <Checkbox
              checked={settings.newsletter}
              onChange={() => handleToggle('newsletter')}
              label={
                <div>
                  <p className="font-semibold text-gray-800">Newsletter</p>
                  <p className="text-sm text-gray-600">Actualités et nouveautés</p>
                </div>
              }
            />
            <Checkbox
              checked={settings.productRestock}
              onChange={() => handleToggle('productRestock')}
              label={
                <div>
                  <p className="font-semibold text-gray-800">Produits de retour en stock</p>
                  <p className="text-sm text-gray-600">Soyez averti quand vos favoris sont disponibles</p>
                </div>
              }
            />
            <Checkbox
              checked={settings.priceDrops}
              onChange={() => handleToggle('priceDrops')}
              label={
                <div>
                  <p className="font-semibold text-gray-800">Baisses de prix</p>
                  <p className="text-sm text-gray-600">Alertes sur vos produits suivis</p>
                </div>
              }
            />
          </div>
        </div>

        <Button icon={<Save className="w-5 h-5" />}>
          Enregistrer les préférences
        </Button>
      </div>
    );
  };

  // Preferences Tab
  const PreferencesTab = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Langue et région
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Langue
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Devise
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="xaf">FCFA (XAF)</option>
                <option value="eur">Euro (EUR)</option>
                <option value="usd">Dollar US (USD)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Affichage
          </h3>
          <Checkbox
            label="Mode sombre (bientôt disponible)"
            disabled
          />
        </div>

        <Button icon={<Save className="w-5 h-5" />}>
          Enregistrer les préférences
        </Button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {success && (
        <Alert type="success" message={success} className="m-6" />
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="md:w-64 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-3">
            Paramètres
          </h2>
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
        </div>
      </div>

      {/* Delete Account Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDeleteAccount();
          setShowDeleteModal(false);
        }}
        title="Supprimer le compte"
        message="Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmVariant="danger"
      />
    </div>
  );
};

export default Settings;