# Project Structure

## Directory Layout

```
/
├── public/                # Static assets served at the root (e.g., favicon)
├── src/                   # Main source code directory
│   ├── assets/            # Images, SVGs, and other media
│   │   └── images/        # Dish photos, hero backgrounds
│   ├── components/        # React components
│   │   ├── About.jsx      # About section
│   │   ├── Footer.jsx     # Footer with newsletter
│   │   ├── Gallery.jsx    # Photo gallery grid
│   │   ├── GalleryLightbox.jsx # Fullscreen image modal
│   │   ├── Hero.jsx       # Landing page hero
│   │   ├── Location.jsx   # Contact info and hours
│   │   ├── Menu.jsx       # Menu grid with tabs
│   │   ├── MenuCard.jsx   # Individual menu item component
│   │   ├── Navbar.jsx     # Top navigation with scroll-spy
│   │   ├── Reservation.jsx# Booking form
│   │   ├── Specials.jsx   # Chef's specials
│   │   ├── Testimonials.jsx # Review carousel
│   │   ├── Toast.jsx      # Global notification system
│   │   ├── TrustStrip.jsx # Stat counters
│   │   └── WhatsAppFAB.jsx# Floating WhatsApp action button
│   ├── data/              # Static data definitions
│   │   └── menuData.js    # Menu items, reviews, gallery references
│   ├── styles/            # Global stylesheets
│   │   └── global.css     # CSS variables, resets, utility classes
│   ├── App.css            # Component-specific styles
│   ├── App.jsx            # Main app assembly
│   └── main.jsx           # React DOM rendering entry point
├── .planning/             # GSD agent planning and codebase documentation
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite bundler configuration
```

## Key Files
- `App.jsx`: Orchestrates the layout of all sections.
- `App.css`: Contains the bulk of the styling for all components, organized by section.
- `Toast.jsx`: Provides the `useToast` hook for arbitrary components to trigger notifications.
