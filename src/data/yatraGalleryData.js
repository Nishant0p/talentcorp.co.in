import { rojgarYatraImages } from './rojgarYatraImages'

const originalRoot = '/Rojgar Yatra'
const copyRoot = '/Rojgar Yatra - Copy'

function buildFolderImages(folderName, extras = []) {
const originalPrefix = `${originalRoot}/${folderName}/`
const copyPrefix = `${copyRoot}/${folderName}/`

return [
...rojgarYatraImages
.filter((imagePath) => imagePath.startsWith(originalPrefix))
.map((imagePath) => imagePath.replace(originalPrefix, copyPrefix)),
...extras.map((fileName) => `${copyPrefix}${fileName}`),
]
}

export const yatraGalleryCards = [
{
slug: 'colleges-visits',
title: 'Colleges Visits In Pan India',
subtitle: 'Connecting with the best talent',
description: 'Campus outreach and recruitment support built around direct college visits across India.',
folderName: 'Colleges Visits In Pan India',
images: buildFolderImages('Colleges Visits In Pan India', ['0.jpeg']),
},
{
slug: 'campus-drive',
title: 'Campus Drive Held Overall India',
subtitle: 'Mass recruitment simplified',
description: 'Dedicated campus drive coverage with recruitment activity across multiple states and institutes.',
folderName: 'Campus Drive Held Overall India',
images: buildFolderImages('Campus Drive Held Overall India'),
},
{
slug: 'banner-distribution',
title: 'Banner Distribution & Pasting',
subtitle: 'Maximum brand visibility',
description: 'Field branding and promotional placement across active outreach zones.',
folderName: 'Banner Distribution & Pasting',
images: buildFolderImages('Banner Distribution & Pasting'),
},
{
slug: 'offer-letter-distribution',
title: 'Offer Letter Distribution',
subtitle: 'Seamless onboarding process',
description: 'Candidate offer handling and onboarding support presented through a clean gallery page.',
folderName: 'Offer Letter Distribution',
images: buildFolderImages('Offer Letter Distribution'),
},
]

export function getYatraGalleryCard(slug) {
return yatraGalleryCards.find((card) => card.slug === slug)
}
