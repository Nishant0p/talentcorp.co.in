// Gallery data for Rojgaar Yatra gallery pages.
// Uses the optimized image folder which is actively served.

const optimizedRoot = '/rojgaar yatra 0.2 optimized'

function folderImages(folderName) {
  return []  // Images are loaded dynamically; folder path reference kept for context
  // Active image paths are maintained in rojgaarYatraOptimizedImages.js
}

export const yatraGalleryCards = [
  {
    slug: 'colleges-visits',
    title: 'Colleges Visits In Pan India',
    subtitle: 'Connecting with the best talent',
    description: 'Campus outreach and recruitment support built around direct college visits across India.',
    folderName: 'Colleges Visits In Pan India',
    images: [],
  },
  {
    slug: 'campus-drive',
    title: 'Campus Drive Held Overall India',
    subtitle: 'Mass recruitment simplified',
    description: 'Dedicated campus drive coverage with recruitment activity across multiple states and institutes.',
    folderName: 'Campus Drive Held Overall India',
    images: [],
  },
  {
    slug: 'banner-distribution',
    title: 'Banner Distribution & Pasting',
    subtitle: 'Maximum brand visibility',
    description: 'Field branding and promotional placement across active outreach zones.',
    folderName: 'Banner Distribution & Pasting',
    images: [],
  },
  {
    slug: 'offer-letter-distribution',
    title: 'Offer Letter Distribution',
    subtitle: 'Seamless onboarding process',
    description: 'Candidate offer handling and onboarding support presented through a clean gallery page.',
    folderName: 'Offer Letter Distribution',
    images: [],
  },
]

export function getYatraGalleryCard(slug) {
  return yatraGalleryCards.find((card) => card.slug === slug)
}
