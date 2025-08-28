# Content Management Guide
## Ruby Hues Designs Website

This guide explains how to update text content on the Ruby Hues Designs website using the `content.json` file.

## Overview

All website text is now centralized in a single file: **`content.json`**

Instead of editing multiple HTML files, you can now update all website content by editing this one JSON file. Changes will automatically appear on the website when you refresh the pages.

## How to Edit Content

### 1. Open the Content File
- Locate and open the file named `content.json` in your website folder
- You can edit this with any text editor (Notepad, TextEdit, VS Code, etc.)

### 2. Understanding the Structure
The content is organized in sections like this:

```json
{
  "pages": {
    "home": {
      "hero": {
        "title": "Welcome to Ruby Hues Designs",
        "subtitle": "Discover original paintings...",
        "cta": "View Gallery"
      }
    }
  }
}
```

### 3. Making Changes
- **Find the text you want to change** by searching for it in the file
- **Change only the text after the colon** (`:`) and between the quotes (`""`)
- **Keep all punctuation** like commas (`,`), colons (`:`), and quotes (`""`) exactly as they are

#### ✅ Correct Example:
```json
"title": "Welcome to My Art Studio"
```

#### ❌ Incorrect Examples:
```json
"title": Welcome to My Art Studio    // Missing quotes
"title": "Welcome to My Art Studio"  // Missing comma at end
title: "Welcome to My Art Studio",   // Missing quotes around key
```

### 4. Save and Test
- **Save the file** after making your changes
- **Refresh your website** in the browser to see the updates
- If something breaks, check that you didn't accidentally remove any punctuation

## Content Sections

### Site Branding
```json
"site": {
  "name": "Ruby Hues Designs",           // Website name
  "tagline": "Creating art that speaks to the soul"  // Main tagline
}
```

### Navigation Menu
```json
"navigation": {
  "home": "Home",
  "gallery": "Gallery", 
  "about": "About",
  "contact": "Contact"
}
```

### Home Page
```json
"pages": {
  "home": {
    "hero": {
      "title": "Welcome to Ruby Hues Designs",
      "subtitle": "Discover original paintings...",
      "cta": "View Gallery"
    },
    "featured": {
      "sectionTitle": "Featured Paintings"
    },
    "aboutPreview": {
      "title": "About the Artist",
      "description": "Shelby is a passionate painter...",
      "cta": "Learn More"
    }
  }
}
```

### About Page
```json
"pages": {
  "about": {
    "header": {
      "title": "About Shelby",
      "tagline": "Creating art that speaks to the soul",
      "summary": "I'm a passionate painter..."
    },
    "story": {
      "title": "My Artistic Journey",
      "paragraphs": [
        "My love for painting began in childhood...",
        "I draw inspiration from the natural world...",
        "Over the years, I've developed..."
      ]
    }
  }
}
```

### Gallery Page
```json
"pages": {
  "gallery": {
    "header": {
      "title": "Gallery",
      "subtitle": "Explore my collection of original paintings"
    },
    "filters": {
      "all": "All Works",
      "abstract": "Abstract",
      "portrait": "Portraits",
      "landscape": "Landscapes",
      "stillLife": "Still Life"
    },
    "paintings": [
      {
        "title": "Color Symphony",
        "medium": "Acrylic on canvas",
        "dimensions": "24\" x 36\"",
        "alt": "Abstract composition with bold colors"
      }
    ]
  }
}
```

### Contact Page
```json
"pages": {
  "contact": {
    "header": {
      "title": "Get In Touch",
      "subtitle": "I'd love to hear from you..."
    },
    "form": {
      "title": "Send Me a Message",
      "fields": {
        "name": { "label": "Your Name *" },
        "email": { "label": "Email Address *" },
        "message": { "label": "Message *" }
      }
    }
  }
}
```

## Common Editing Tasks

### Changing the Site Name
1. Find: `"name": "Ruby Hues Designs"`
2. Change to: `"name": "Your New Site Name"`

### Updating the Main Hero Message
1. Find: `"title": "Welcome to Ruby Hues Designs"`
2. Change to: `"title": "Your New Welcome Message"`

### Adding New Artwork to Gallery
1. Find the `"paintings":` array in the gallery section
2. Add a new painting object:
```json
{
  "title": "New Painting Name",
  "category": "abstract",
  "medium": "Oil on canvas", 
  "dimensions": "20\" x 24\"",
  "alt": "Description of the painting",
  "image": "images/your-image.jpg"
}
```

### Updating Contact Information
1. Find the contact methods section
2. Update email, phone, or other details:
```json
"methods": [
  {
    "icon": "📧",
    "title": "Email",
    "primary": "your-new-email@example.com",
    "secondary": "I typically respond within 24-48 hours"
  }
]
```

## SEO (Search Engine) Settings
You can also update page titles and descriptions that appear in search results:

```json
"seo": {
  "home": {
    "title": "Ruby Hues Designs - Original Paintings",
    "description": "Discover beautiful original paintings..."
  }
}
```

## Troubleshooting

### Website Shows Old Content
- Make sure you saved the `content.json` file
- Refresh the browser page (Ctrl+R or Cmd+R)
- Check that the website files are uploaded to your server

### Website Stops Working
This usually means there's a syntax error in the JSON file:

1. **Check for missing commas** - Most lines should end with a comma
2. **Check for missing quotes** - All text should be in quotes
3. **Check for unmatched brackets** - Every `{` needs a `}`
4. Use a JSON validator online to check your file

### Can't Find Specific Text
1. Use your text editor's search function (Ctrl+F or Cmd+F)
2. Search for a few words from the text you want to change
3. Remember that some content might be in arrays (lists) with square brackets `[]`

## Best Practices

### ✅ Do:
- Always save a backup copy before making changes
- Test your changes on a few pages before making many updates
- Use a text editor with syntax highlighting (like VS Code)
- Make small changes and test frequently

### ❌ Don't:
- Edit the HTML files directly anymore - use the JSON file instead
- Remove commas, quotes, or brackets
- Use straight quotes (`"`) instead of curly quotes (`""`)
- Make many changes at once without testing

## Getting Help

If you run into issues:
1. **Compare with the original** - Look at the structure of working sections
2. **Use online JSON validators** to check for errors
3. **Start small** - Make one change at a time until you're comfortable
4. **Keep backups** - Always save a working version before making changes

---

**Remember**: The `content.json` file controls all the text on your website. The HTML files will automatically pull content from this file, so you only need to edit this one file to update your entire website's text content.
