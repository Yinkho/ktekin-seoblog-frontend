const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(withCSS({

    publicRuntimeConfig: {
        APP_NAME: 'DEVIUM',
        API_PRODUCTION: 'https://ktekin-seoblog-backend.com/api',
        API_DEVELOPMENT: 'https://ktekin-seoblog-backend.com/api',
        PRODUCTION: true,
        DOMAIN_DEVELOPMENT: 'https://ktekin-seoblog-frontend.com',
        DOMAIN_PRODUCTION: 'https://ktekin-seoblog-frontend.com',
        FB_APP_ID: "2385418231718920",
        DISQUS_SHORTNAME: "seoblog-8"
    }
    
}));