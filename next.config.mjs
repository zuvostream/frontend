/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['r2.catpics.xyz', 'github.com']
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: true,
    }
};

export default nextConfig;
