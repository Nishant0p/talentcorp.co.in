# Achievement Images Guide

## Directory Structure
Place your 12 achievement images in this folder with the following naming convention:

```
achievement-1.jpg   → Excellence Award 2023
achievement-2.jpg   → Best Employer Award
achievement-3.jpg   → Innovation Leader
achievement-4.jpg   → Quality Certification
achievement-5.jpg   → Client Satisfaction
achievement-6.jpg   → Market Leader
achievement-7.jpg   → Workforce Champions
achievement-8.jpg   → Digital Transformation
achievement-9.jpg   → Sustainability Award
achievement-10.jpg  → Community Impact
achievement-11.jpg  → Training Excellence
achievement-12.jpg  → Compliance Champion
```

## Image Requirements
- **Format**: JPG, PNG, or WebP
- **Aspect Ratio**: 4:3 (recommended 800x600px minimum)
- **Size**: 100-300KB per image for optimal performance
- **Content**: 
  - Awards and certificates
  - Team photos
  - Recognition plaques
  - Achievement moments
  - Milestone celebrations

## Theme Integration
The gallery is styled with your theme colors:
- **Primary Blue**: #2563EB
- **Accent Orange**: #F97316
- Hover effects with gradient overlays
- Smooth animations and transitions

## Uploading Your Images
1. Add your 12 achievement images to this folder
2. Use the naming convention above (achievement-1.jpg through achievement-12.jpg)
3. The gallery will automatically display them with:
   - Grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Hover animations with trophy icons
   - Gradient overlays
   - Category labels
   - Achievement badges

## Customization
To customize achievement titles, categories, or add descriptions, edit the `achievements` array in `/src/pages/achiment.jsx` (line ~255)

```javascript
const achievements = [
  { 
    id: 1, 
    image: '/images/achievements/achievement-1.jpg', 
    title: 'Your Title',
    category: 'Your Category' 
  },
  // ... more items
]
```

## Optimization Tips
- Compress images before uploading using tools like:
  - TinyPNG.com
  - ImageOptim
  - Squoosh by Google
- Use JPG for photographs, PNG for graphics with transparency
- Consider lazy loading for better performance
