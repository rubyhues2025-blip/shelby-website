// Simple script to create colored placeholder images using data URLs
const fs = require('fs');

// Function to create a simple colored rectangle as SVG
function createSVGImage(width, height, color, text, filename) {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color}dd;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#${filename})" />
        <text x="${width/2}" y="${height/2}" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.9">${text}</text>
    </svg>`;
    
    fs.writeFileSync(`images/${filename}.svg`, svg);
    console.log(`Created images/${filename}.svg`);
}

// Create all placeholder images
try {
    // Hero and featured images
    createSVGImage(800, 600, '#3498db', 'Featured Artwork', 'hero-painting');
    createSVGImage(400, 300, '#e74c3c', 'Abstract Art', 'featured-1');
    createSVGImage(400, 300, '#2ecc71', 'Portrait Study', 'featured-2');
    createSVGImage(400, 300, '#f39c12', 'Still Life', 'featured-3');
    
    // Gallery abstract paintings
    createSVGImage(400, 300, '#9b59b6', 'Color Symphony', 'abstract-1');
    createSVGImage(400, 300, '#1abc9c', 'Fluid Dreams', 'abstract-2');
    createSVGImage(400, 300, '#34495e', 'Urban Rhythm', 'abstract-3');
    
    // Gallery portraits
    createSVGImage(400, 300, '#e67e22', 'Morning Light', 'portrait-1');
    createSVGImage(400, 300, '#95a5a6', 'Character Study', 'portrait-2');
    
    // Gallery landscapes
    createSVGImage(400, 300, '#27ae60', 'Mountain Serenity', 'landscape-1');
    createSVGImage(400, 300, '#f1c40f', 'Golden Hour', 'landscape-2');
    createSVGImage(400, 300, '#16a085', 'Forest Path', 'landscape-3');
    
    // Gallery still life
    createSVGImage(400, 300, '#e91e63', 'Spring Bouquet', 'still-life-1');
    createSVGImage(400, 300, '#8e44ad', 'Harvest Table', 'still-life-2');
    createSVGImage(400, 300, '#d35400', 'Modern Elements', 'still-life-3');
    
    // About page images
    createSVGImage(300, 350, '#607d8b', 'Artist Portrait', 'artist-portrait');
    createSVGImage(500, 400, '#795548', 'Artist Photo', 'artist-photo');
    createSVGImage(400, 300, '#ff5722', 'Studio Space', 'studio-photo');
    createSVGImage(400, 300, '#009688', 'Work in Progress', 'painting-process');
    
    console.log('All placeholder images created successfully!');
} catch (error) {
    console.error('Error creating images:', error);
}
