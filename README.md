# Princess Annabel - Dancer & Performer Portfolio

A modern, professional portfolio website for Princess Annabel, showcasing her work as a dancer and performer.

## Features

- **Modern Dark Theme Design**: Clean, minimal, and visually appealing interface
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Subtle fade-in, slide-up, and hover effects
- **Interactive Navigation**: Sticky navbar with smooth scrolling between sections
- **Gallery Section**: Beautiful grid layout for performances and photos
- **Contact Form**: Functional form with validation
- **SEO Optimized**: Semantic HTML5 structure with meta tags
- **Accessibility**: ARIA labels and keyboard navigation support

## Sections

1. **Home**: Hero section with call-to-action buttons
2. **About**: Personal bio and dance journey
3. **Gallery**: Performance photos and videos
4. **Highlights**: Achievements and special moments
5. **Contact**: Contact form and information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No dependencies, pure JS functionality
- **Google Fonts**: Inter and Playfair Display for typography

## File Structure

```
prencess_annabel/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. Clone or download the files
2. Open `index.html` in a web browser
3. The website is ready to use!

## Customization

### Personal Information
Edit the following in `index.html`:
- Name and title in the hero section
- About section content
- Contact information
- Footer details

### Gallery Images
Replace placeholder images in the gallery section:
- Update `src` attributes in gallery items
- Add captions as needed

### Colors and Styling
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #e94560;
    --secondary-color: #0f3460;
    --background-color: #0a0a0a;
    /* ... other variables */
}
```

## Features Details

### Navigation
- Sticky header with scroll effects
- Mobile-responsive hamburger menu
- Active section highlighting
- Smooth scrolling between sections

### Animations
- Fade-in animations on scroll
- Hover effects on interactive elements
- Parallax effect on hero section
- Button and card transitions

### Contact Form
- Client-side validation
- Error messaging
- Success feedback
- Mobile-optimized layout

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Optimized typography scaling
- Touch-friendly interactions

## Performance

- Optimized images with lazy loading potential
- Minimal JavaScript for fast loading
- CSS animations using transforms
- Efficient scroll event handling

## Browser Support

- Chrome/Chromium 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers

## 🚀 Vercel Deployment

### Quick Setup
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select this repository
   - Click "Deploy"

3. **Live Site**
   - Your site will be available at: `https://your-project-name.vercel.app`
   - Automatic deployments on every push to main branch

### Configuration Files Added
- `vercel.json` - Vercel configuration for static site
- `package.json` - Project metadata and build scripts

### Alternative Hosting
This website can also be deployed to:
- GitHub Pages
- Netlify
- Firebase Hosting
- Any static hosting service

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or customization requests, please reach out through the contact form on the website.
