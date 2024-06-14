/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://silasilo.vercel.app',
  generateRobotsTxt: true,
  // Opsional: Konfigurasi tambahan
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ],
  },
};
