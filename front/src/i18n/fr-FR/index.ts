// This is just an example,
// so you can safely delete all default props below
import dashboard from './dashboard';
import user from './user';
import area from './area';
import classification from './classification';
import livingBeing from './living-being';

export default {
  lastName: 'Nom',
  firstName: 'Prénom',
  id: 'Identifiant',
  phone: 'Téléphone',
  email: 'Email',
  createdAt: 'Date de création',
  updatedAt: 'Dernière mise à jour',
  city: 'Ville',
  address: 'Adresse',
  gender: 'Genre',
  name: 'Nom',
  password: 'Mot de passe',
  surface: 'Superficie',
  roles: ['Invité', 'Administrateur'],
  role: 'Rôle',
  genders: ['Masculin', 'Féminin'],
  when: 'Quand ?',
  'no-data': 'Aucune donnée disponible',
  controls: 'Contrôles',
  names: ['Malagasy', 'Scientifique', 'Anglais', 'Français'],
  male: 'Masculin',
  female: 'Féminin',
  place: 'Endroit',
  naming: 'Titre ou nom',
  description: 'Description',
  region: 'Région',
  nature: 'Nature',
  peripherals: 'Villes périphériques',
  distance: 'Distance',
  office: 'Bureau',
  author: 'Autheur',
  networkError: 'Problème de réseau, assurez-vous que vous avez d\'internet',
  mailExist: 'Adresse email existe déjà',
  phoneExist: 'Numéro de téléphone existe déjà',
  phoneNumber: 'Numéro de téléphone',
  mailAddress: 'Adresse email',
  validate: 'Valider',
  submit: 'Envoyer',
  signIn: 'S\'inscrire',
  reset: 'Réinitialiser',
  logout: 'Se déconnecter',
  save: 'Enregistrer',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  add: 'Ajouter',
  localNames: 'Noms Locaux',
  dateTime: 'DD-MM-YYYY T HH:mm:ss',
  shortDate: 'DD/MM/YYYY',
  inputMaskFormat: '##/##/####',
  errorOn: 'Champs invalide : ',
  timeOnly: 'HH:mm:ss',
  loading: {
    update: 'Mise à jour ...',
    upload: 'Téléchargement ...',
    remove: 'Suppression ...',
    create: 'Création ...',
  },
  update: {
    success: 'Mise à jour avec succès',
    failed: 'Echec de mise à jour',
    wrongCurPwd: 'Mot de passe actuel erroné'
  },
  create: {
    btn: 'Créer',
    success: 'Création avec succès',
    failed: 'Echec de création',
  },
  remove: {
    success: 'Suppression avec succès',
    failed: 'Echec de suppression'
  },
  status: 'Etat du compte',
  subject: 'Sujet',
  close: 'Fermer',
  enabled: 'Activé',
  disabled: 'Désactivé',
  noData: 'Aucune donnée',
  scientificName: 'Nom scientifique',
  characteristic: 'Caractéristique',
  newImage: 'Nouveau image',
  'adventure-subjects': [
    {
      id: '0',
      title: 'Animaux',
      icon: 'fas fa-dove',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '5',
      title: 'Eaux',
      icon: 'fas fa-water',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '1',
      title: 'Forêts',
      icon: 'fas fa-tree',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '2',
      title: 'Humains',
      icon: 'nature_people',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '3',
      title: 'Végétaux',
      icon: 'fas fa-seedling',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    },
    {
      id: '4',
      title: 'Roches',
      icon: 'fas fa-mountain',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
    }
  ],
  languages: [{ value: 'en', label: 'Anglais'},{ value: 'fr', label: 'Français'}],
  dashboard,
  user,
  area,
  classification,
  livingBeing,
  menu: [
    'TABLEAU DE BOARD',
    'UTILISATEURS',
    'PARCS',
    'CLASSIFICATIONS',
    'VISITES',
    'ETRES VIVANTS',
    'MON COMPTE',
    'ABONNEMENTS',
    'AVENTURES'
  ],
};
