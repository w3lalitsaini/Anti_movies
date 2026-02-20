const siteConfig = {
  name: "AtoZ Movies",
  domain: "atozmovies.com",
  baseUrl: "http://localhost:5000/api", // Update this for production

  // AdSense Configuration
  ads: {
    enabled: true,
    client: "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      homeTop: "1234567890",
      movieDetailsTechnical: "0987654321",
      movieDetailsReviews: "1122334455",
    },
  },

  // Navigation Links
  links: {
    telegram: "https://t.me/atozmovies",
    whatsapp: "https://wa.me/atozmovies",
    facebook: "https://facebook.com/atozmovies",
    twitter: "https://twitter.com/atozmovies",
    youtube: "https://youtube.com/atozmovies",
    send: "https://t.me/atozmovies_bot",
  },

  // SEO Defaults
  seo: {
    defaultTitle:
      "AtoZ Movies - Download 480p, 720p, 1080p Movies | Hindi Dubbed & Bollywood",
    defaultDescription:
      "AtoZ Movies - Your number one source for downloading Hollywood, Bollywood, and Hindi Dubbed movies in 480p, 720p, and 1080p. Fast and secure downloads.",
    keywords:
      "AtoZ Movies, movie downloads, bollywood movies, hollywood movies, hindi dubbed",
  },

  // External / Legal Links
  footerLinks: {
    dmca: "/dmca",
    privacy: "/privacy",
    contact: "/contact",
    sitemap: "/sitemap",
  },
};

export default siteConfig;
