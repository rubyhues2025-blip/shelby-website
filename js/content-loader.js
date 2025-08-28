/**
 * Content Loader - Dynamically loads content from content.json
 * Ruby Hues Designs Website
 */

class ContentLoader {
    constructor() {
        this.content = null;
        this.currentPage = this.getCurrentPage();
    }

    /**
     * Initialize the content loader
     */
    async init() {
        try {
            await this.loadContent();
            this.populateContent();
            this.setupDynamicContent();
        } catch (error) {
            console.error('Content loading failed:', error);
            // Fallback: content will remain as hardcoded in HTML
        }
    }

    /**
     * Load content from JSON file
     */
    async loadContent() {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.content = await response.json();
    }

    /**
     * Get current page from filename
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '') return 'home';
        if (filename === 'about.html') return 'about';
        if (filename === 'gallery.html') return 'gallery';
        if (filename === 'contact.html') return 'contact';
        
        return 'home'; // default
    }

    /**
     * Get nested content using dot notation
     */
    getContent(path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], this.content);
    }

    /**
     * Populate content based on data-content attributes
     */
    populateContent() {
        // Update SEO meta tags
        this.updateMetaTags();

        // Update navigation
        this.updateNavigation();

        // Update general content elements
        const contentElements = document.querySelectorAll('[data-content]');
        contentElements.forEach(element => {
            const contentPath = element.getAttribute('data-content');
            const content = this.getContent(contentPath);
            
            if (content !== undefined) {
                if (element.tagName === 'INPUT') {
                    if (element.type === 'text' || element.type === 'email') {
                        element.placeholder = content;
                    } else {
                        element.value = content;
                    }
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = content;
                } else {
                    element.innerHTML = content;
                }
            }
        });

        // Update footer
        this.updateFooter();
    }

    /**
     * Update meta tags for SEO
     */
    updateMetaTags() {
        const seoData = this.getContent(`seo.${this.currentPage}`);
        if (seoData) {
            const titleElement = document.querySelector('title');
            const descriptionElement = document.querySelector('meta[name="description"]');
            
            if (titleElement && seoData.title) {
                titleElement.textContent = seoData.title;
            }
            
            if (descriptionElement && seoData.description) {
                descriptionElement.setAttribute('content', seoData.description);
            }
        }
    }

    /**
     * Update navigation with active states
     */
    updateNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navigation = this.getContent('navigation');
        
        if (navigation) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                let navKey = 'home';
                
                if (href === 'gallery.html') navKey = 'gallery';
                else if (href === 'about.html') navKey = 'about';
                else if (href === 'contact.html') navKey = 'contact';
                
                if (navigation[navKey]) {
                    link.textContent = navigation[navKey];
                }
            });
        }
    }

    /**
     * Update footer content
     */
    updateFooter() {
        const footer = this.getContent('footer');
        if (!footer) return;

        // Main footer section
        const footerTitle = document.querySelector('.footer-section h3');
        const footerTagline = document.querySelector('.footer-section p');
        
        if (footerTitle && footer.sections.main.title) {
            footerTitle.textContent = footer.sections.main.title;
        }
        
        if (footerTagline && footer.sections.main.tagline) {
            footerTagline.textContent = footer.sections.main.tagline;
        }

        // Quick links
        const quickLinksTitle = document.querySelector('.footer-section h4');
        if (quickLinksTitle && footer.sections.quickLinks.title) {
            quickLinksTitle.textContent = footer.sections.quickLinks.title;
        }

        // Social section
        const socialTitle = document.querySelectorAll('.footer-section h4')[1];
        if (socialTitle && footer.sections.social.title) {
            socialTitle.textContent = footer.sections.social.title;
        }

        // Copyright - process dynamic year if needed
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright && footer.copyright) {
            const processedCopyright = this.processDynamicCopyright(footer.copyright);
            copyright.innerHTML = processedCopyright;
        }
    }

    /**
     * Process copyright text to replace year placeholders with current year
     */
    processDynamicCopyright(copyrightText) {
        const currentYear = new Date().getFullYear();
        // Replace any 4-digit year (e.g., 2024, 2025) with current year
        return copyrightText.replace(/\b\d{4}\b/, currentYear);
    }

    /**
     * Setup dynamic content based on current page
     */
    setupDynamicContent() {
        switch (this.currentPage) {
            case 'home':
                this.setupHomePage();
                break;
            case 'about':
                this.setupAboutPage();
                break;
            case 'gallery':
                this.setupGalleryPage();
                break;
            case 'contact':
                this.setupContactPage();
                break;
        }
    }

    /**
     * Setup home page specific content
     */
    setupHomePage() {
        const pageData = this.getContent('pages.home');
        if (!pageData) return;

        // Featured paintings
        this.populateFeaturedPaintings(pageData.featured);
    }

    /**
     * Populate featured paintings on home page
     */
    populateFeaturedPaintings(featuredData) {
        if (!featuredData) return;

        const featuredItems = document.querySelectorAll('.featured-item');
        
        featuredItems.forEach((item, index) => {
            const painting = featuredData.paintings[index];
            if (painting) {
                const title = item.querySelector('h3');
                const medium = item.querySelector('p');
                const img = item.querySelector('img');
                
                if (title) title.textContent = painting.title;
                if (medium) medium.textContent = painting.medium;
                if (img) img.setAttribute('alt', painting.alt);
            }
        });
    }

    /**
     * Setup about page specific content
     */
    setupAboutPage() {
        const pageData = this.getContent('pages.about');
        if (!pageData) return;

        // Story paragraphs
        this.populateStoryParagraphs(pageData.story);
        
        // Artistic approach items
        this.populateApproachItems(pageData.approach);
        
        // Techniques
        this.populateTechniques(pageData.techniques);
        
        // Background
        this.populateBackground(pageData.background);
    }

    /**
     * Populate story paragraphs
     */
    populateStoryParagraphs(storyData) {
        if (!storyData) return;
        
        const storyText = document.querySelector('.story-text');
        if (storyText && storyData.paragraphs) {
            const paragraphs = storyText.querySelectorAll('p');
            storyData.paragraphs.forEach((paragraph, index) => {
                if (paragraphs[index]) {
                    paragraphs[index].textContent = paragraph;
                }
            });
        }

        // Studio caption
        const studioCaption = document.querySelector('.image-caption');
        if (studioCaption && storyData.studioCaption) {
            studioCaption.textContent = storyData.studioCaption;
        }
    }

    /**
     * Populate artistic approach items
     */
    populateApproachItems(approachData) {
        if (!approachData) return;
        
        const approachItems = document.querySelectorAll('.approach-item');
        approachItems.forEach((item, index) => {
            const data = approachData.items[index];
            if (data) {
                const icon = item.querySelector('.approach-icon');
                const title = item.querySelector('h3');
                const description = item.querySelector('p');
                
                if (icon) icon.textContent = data.icon;
                if (title) title.textContent = data.title;
                if (description) description.textContent = data.description;
            }
        });
    }

    /**
     * Populate techniques section
     */
    populateTechniques(techniquesData) {
        if (!techniquesData) return;
        
        const techniqueItems = document.querySelectorAll('.technique-item');
        techniqueItems.forEach((item, index) => {
            const data = techniquesData.items[index];
            if (data) {
                const title = item.querySelector('h4');
                const description = item.querySelector('p');
                
                if (title) title.textContent = data.title;
                if (description) description.textContent = data.description;
            }
        });

        // Process caption
        const processCaption = document.querySelectorAll('.image-caption')[1];
        if (processCaption && techniquesData.processCaption) {
            processCaption.textContent = techniquesData.processCaption;
        }
    }

    /**
     * Populate background section
     */
    populateBackground(backgroundData) {
        if (!backgroundData) return;

        // Education items
        const educationItems = document.querySelector('.background-column:first-child .background-list');
        if (educationItems && backgroundData.education.items) {
            educationItems.innerHTML = backgroundData.education.items
                .map(item => `<li>${item}</li>`)
                .join('');
        }

        // Exhibition items
        const exhibitionItems = document.querySelector('.background-column:last-child .background-list');
        if (exhibitionItems && backgroundData.exhibitions.items) {
            exhibitionItems.innerHTML = backgroundData.exhibitions.items
                .map(item => `<li>${item}</li>`)
                .join('');
        }
    }

    /**
     * Setup gallery page specific content
     */
    setupGalleryPage() {
        const pageData = this.getContent('pages.gallery');
        if (!pageData) return;

        // Filter buttons
        this.populateFilterButtons(pageData.filters);
        
        // Gallery items
        this.populateGalleryItems(pageData.paintings);
    }

    /**
     * Populate filter buttons
     */
    populateFilterButtons(filtersData) {
        if (!filtersData) return;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        const filterMap = {
            'all': filtersData.all,
            'abstract': filtersData.abstract,
            'portrait': filtersData.portrait,
            'landscape': filtersData.landscape,
            'still-life': filtersData.stillLife
        };

        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            if (filterMap[filter]) {
                button.textContent = filterMap[filter];
            }
        });
    }

    /**
     * Populate gallery items
     */
    populateGalleryItems(paintingsData) {
        if (!paintingsData) return;
        
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Clear existing items
        galleryGrid.innerHTML = '';

        // Create gallery items from JSON data
        paintingsData.forEach(painting => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', painting.category);
            
            galleryItem.innerHTML = `
                <img src="${painting.image}" alt="${painting.alt}" class="gallery-image">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${painting.title}</h3>
                        <p>${painting.category.charAt(0).toUpperCase() + painting.category.slice(1)} • ${painting.medium}</p>
                        <p>${painting.dimensions}</p>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    /**
     * Setup contact page specific content
     */
    setupContactPage() {
        const pageData = this.getContent('pages.contact');
        if (!pageData) return;

        // Form options
        this.populateFormOptions(pageData.form);
        
        // Contact methods
        this.populateContactMethods(pageData.info);
        
        // FAQ items
        this.populateFAQItems(pageData.faq);
    }

    /**
     * Populate form select options
     */
    populateFormOptions(formData) {
        if (!formData) return;
        
        const subjectSelect = document.querySelector('#subject');
        if (subjectSelect && formData.fields.subject.options) {
            subjectSelect.innerHTML = '';
            formData.fields.subject.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                subjectSelect.appendChild(optionElement);
            });
        }
    }

    /**
     * Populate contact methods
     */
    populateContactMethods(infoData) {
        if (!infoData) return;
        
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach((method, index) => {
            const data = infoData.methods[index];
            if (data) {
                const icon = method.querySelector('.contact-icon');
                const title = method.querySelector('h3');
                const primary = method.querySelector('p');
                const secondary = method.querySelector('small');
                
                if (icon) icon.textContent = data.icon;
                if (title) title.textContent = data.title;
                if (primary) primary.textContent = data.primary;
                if (secondary && data.secondary) secondary.textContent = data.secondary;
            }
        });
    }

    /**
     * Populate FAQ items
     */
    populateFAQItems(faqData) {
        if (!faqData) return;
        
        const faqGrid = document.querySelector('.faq-grid');
        if (!faqGrid) return;

        // Clear existing items
        faqGrid.innerHTML = '';

        // Create FAQ items from JSON data
        faqData.items.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            faqItem.innerHTML = `
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            `;
            
            faqGrid.appendChild(faqItem);
        });
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const contentLoader = new ContentLoader();
    await contentLoader.init();
    
    // Initialize components after content is loaded
    if (window.ComponentManager) {
        const componentManager = new ComponentManager();
        await componentManager.init(contentLoader.content);
    }
});

// Export for potential external use
window.ContentLoader = ContentLoader;
