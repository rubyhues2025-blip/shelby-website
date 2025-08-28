/**
 * Component System - Shared UI components for Ruby Hues Designs
 * Eliminates HTML duplication across pages
 */

class ComponentManager {
    constructor() {
        this.content = null;
        this.currentPage = this.getCurrentPage();
    }

    /**
     * Initialize components after content is loaded
     */
    async init(contentData = null) {
        this.content = contentData;
        this.renderNavigation();
        this.renderFooter();
        this.loadFonts();
    }

    /**
     * Get current page identifier
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '') return 'home';
        if (filename === 'about.html') return 'about';
        if (filename === 'gallery.html') return 'gallery';
        if (filename === 'contact.html') return 'contact';
        
        return 'home';
    }

    /**
     * Render navigation component
     */
    renderNavigation() {
        const navContainer = document.querySelector('[data-component="navigation"]');
        if (!navContainer) return;

        const siteName = this.content?.site?.name || 'Ruby Hues Designs';
        const navigation = this.content?.navigation || {
            home: 'Home',
            gallery: 'Gallery',
            about: 'About',
            contact: 'Contact'
        };

        navContainer.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <h2>${siteName}</h2>
                    </div>
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="index.html" class="nav-link ${this.currentPage === 'home' ? 'active' : ''}">${navigation.home}</a>
                        </li>
                        <li class="nav-item">
                            <a href="gallery.html" class="nav-link ${this.currentPage === 'gallery' ? 'active' : ''}">${navigation.gallery}</a>
                        </li>
                        <li class="nav-item">
                            <a href="about.html" class="nav-link ${this.currentPage === 'about' ? 'active' : ''}">${navigation.about}</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.html" class="nav-link ${this.currentPage === 'contact' ? 'active' : ''}">${navigation.contact}</a>
                        </li>
                    </ul>
                    <div class="nav-toggle">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        `;
    }

    /**
     * Render footer component
     */
    renderFooter() {
        const footerContainer = document.querySelector('[data-component="footer"]');
        if (!footerContainer) return;

        const footer = this.content?.footer || {};
        const siteName = footer.sections?.main?.title || 'Ruby Hues Designs';
        const tagline = footer.sections?.main?.tagline || 'Creating art that speaks to the soul';
        const quickLinksTitle = footer.sections?.quickLinks?.title || 'Quick Links';
        const socialTitle = footer.sections?.social?.title || 'Follow';
        const copyright = footer.copyright || this.getDynamicCopyright();

        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>${siteName}</h3>
                            <p>${tagline}</p>
                        </div>
                        <div class="footer-section">
                            <h4>${quickLinksTitle}</h4>
                            <ul class="footer-links">
                                <li><a href="gallery.html">Gallery</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>${socialTitle}</h4>
                            <div class="social-links">
                                <a href="#" class="social-link">Instagram</a>
                                <a href="#" class="social-link">Facebook</a>
                                <a href="#" class="social-link">Twitter</a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>${copyright}</p>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Load consistent fonts across all pages
     */
    loadFonts() {
        // Remove existing font links to avoid conflicts
        const existingFontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        existingFontLinks.forEach(link => link.remove());

        // Create standardized font loading
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Bebas+Neue:wght@400&family=Montserrat:wght@400;600;700&family=Nunito:wght@300;400;600;700&family=Open+Sans:wght@300;400;600&family=Playfair+Display:wght@400;700&display=swap';
        
        document.head.appendChild(fontLink);
    }

    /**
     * Generate dynamic copyright with current year
     */
    getDynamicCopyright() {
        const currentYear = new Date().getFullYear();
        return `&copy; ${currentYear} Ruby Hues Designs. All rights reserved.`;
    }

    /**
     * Update page title and meta description
     */
    updateMetadata() {
        if (!this.content?.seo) return;

        const seoData = this.content.seo[this.currentPage];
        if (!seoData) return;

        // Update title
        if (seoData.title) {
            document.title = seoData.title;
        }

        // Update meta description
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && seoData.description) {
            descriptionMeta.setAttribute('content', seoData.description);
        }
    }
}

// Export for use in other modules
window.ComponentManager = ComponentManager;
