const siteConfig = {
  name: "AtoZ Movies",
  domain: "https://atozmovies.com",

  // ✅ Production API (Render Backend)
  baseUrl: "https://anti-movies-backend.onrender.com/api",

  // AdSense Configuration
  ads: {
    enabled: true,
    client: "ca-pub-2610891548777436",

    slots: {
      homeTop: "2125541166",
      movieDetailsTechnical: "5985180530",
      movieDetailsReviews: "9153983942",
    },
  },

  // Navigation Links
  links: {
    telegram: "https://t.me/atozmovies",
    whatsapp: "https://wa.me/atozmovies",
    facebook: "https://facebook.com/atozmoviesss",
    twitter: "https://twitter.com/atozmoviesss",
    youtube: "https://youtube.com/atozmoviesss",
    send: "https://t.me/atozmovies_bot",
  },

  // SEO Defaults
  seo: {
    defaultTitle:
      "AtoZ Movies - Latest Bollywood, Hollywood & Hindi Dubbed Movies",

    defaultDescription:
      "Explore Bollywood, Hollywood, and Hindi Dubbed movies in multiple qualities. Reviews, details, and updates all in one place.",

    keywords:
      "AtoZ Movies, Bollywood movies, Hollywood movies, Hindi dubbed movies, movie reviews",
  },

  // Legal / Footer Links
  footerLinks: {
    dmca: "/dmca",
    privacy: "/privacy-policy",
    contact: "/contact",
    sitemap: "/sitemap.xml",
  },
  contactEmail: "contact@atozmovies.com",
};

export default siteConfig;
