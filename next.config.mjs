/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['r2.catpics.xyz', 'github.com', 'upload.wikimedia.org', 't2.genius.com', 'media.discordapp.net']
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: true,
    }
};

export default nextConfig;
