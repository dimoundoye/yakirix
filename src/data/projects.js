// Réalisations Yakirix — captures prises sur les sites en ligne
import samalocationDesktop from '../assets/projects/samalocation-desktop.webp'
import samalocationMobile from '../assets/projects/samalocation-mobile.webp'
import leralDesktop from '../assets/projects/leralscolaire-desktop.webp'
import leralPoles from '../assets/projects/leralscolaire-poles.webp'
import leralMobile from '../assets/projects/leralscolaire-mobile.webp'
import ebenaDesktop from '../assets/projects/ebena-desktop.webp'
import ebenaUnivers from '../assets/projects/ebena-univers.webp'
import ebenaMobile from '../assets/projects/ebena-mobile.webp'
import cargoDesktop from '../assets/projects/cargonotify-desktop.webp'
import cargoMobile from '../assets/projects/cargonotify-mobile.webp'

export const PROJECTS = {
  samalocation: {
    name: 'Samalocation',
    url: 'https://samalocation.com/',
    domain: 'samalocation.com',
    category: 'Plateformes',
    sector: 'Immobilier · Dakar',
    description: 'Plateforme de gestion locative : annonces vérifiées, candidatures en ligne et suivi des paiements pour propriétaires et locataires.',
    bg: '#14146B',
    desktop: samalocationDesktop,
    mobile: samalocationMobile,
    status: { bg: '#FAF8F5', ink: '#0C0C31' },
  },
  leralscolaire: {
    name: 'LéralScolaire',
    url: 'https://leralscolaire.com/',
    domain: 'leralscolaire.com',
    category: 'Plateformes',
    sector: 'Éducation · Sénégal',
    description: 'Livret scolaire numérique du Sénégal : notes, bulletins et livrets des élèves passent du papier au numérique.',
    bg: '#D7EEF1',
    desktop: leralDesktop,
    extra: leralPoles,
    mobile: leralMobile,
    status: { bg: '#0A102B', ink: '#FFFFFF' },
  },
  ebena: {
    name: 'ÉBËNA 2027',
    url: 'https://hub-ebena.netlify.app/',
    domain: 'hub-ebena.netlify.app',
    category: 'Sites web',
    sector: 'Événementiel · Nantes',
    description: 'Site du grand rendez-vous de la création africaine en Europe : programme, pavillons, exposants et inscriptions.',
    bg: '#33190A',
    desktop: ebenaDesktop,
    extra: ebenaUnivers,
    mobile: ebenaMobile,
    status: { bg: '#FDF5E8', ink: '#311502' },
  },
  cargonotify: {
    name: 'CargoNotify',
    url: 'https://cargonotify.com/',
    domain: 'cargonotify.com',
    category: 'Applications',
    sector: 'Logistique · PWA',
    description: 'Application de gestion du fret et du transit, avec notifications automatiques aux clients. Installable sur mobile (PWA).',
    bg: '#3A47D5',
    desktop: cargoDesktop,
    mobile: cargoMobile,
    status: { bg: '#F2F6FC', ink: '#0F172A' },
  },
}

export const PROJECT_LIST = [PROJECTS.samalocation, PROJECTS.leralscolaire, PROJECTS.ebena, PROJECTS.cargonotify]
