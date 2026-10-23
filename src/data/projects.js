// Réalisations Yakirix — captures prises sur les sites en ligne
import samalocationDesktop from '../assets/projects/samalocation-desktop.webp'
import samalocationMobile from '../assets/projects/samalocation-mobile.webp'
import leralDesktop from '../assets/projects/leralscolaire-desktop.webp'
import leralPoles from '../assets/projects/leralscolaire-poles.webp'
import leralMobile from '../assets/projects/leralscolaire-mobile.webp'
import mahwaDesktop from '../assets/projects/mahwa-desktop.webp'
import mahwaActions from '../assets/projects/mahwa-actions.webp'
import mahwaMobile from '../assets/projects/mahwa-mobile.webp'
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
  mahwa: {
    name: 'Mahwa Fondation',
    url: 'https://storied-profiterole-cc5b81.netlify.app/',
    domain: 'storied-profiterole-cc5b81.netlify.app',
    category: 'Sites web',
    sector: 'Solidarité · Dakar',
    description: 'Site de la fondation : actions solidaires (Ramadan, repas chauds, éducation), galerie et dons en ligne.',
    bg: '#DCEBDD',
    desktop: mahwaDesktop,
    extra: mahwaActions,
    mobile: mahwaMobile,
    status: { bg: '#0C1D10', ink: '#FFFFFF' },
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

export const PROJECT_LIST = [PROJECTS.samalocation, PROJECTS.leralscolaire, PROJECTS.mahwa, PROJECTS.cargonotify]
