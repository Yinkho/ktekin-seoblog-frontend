import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

console.log(getConfig())

export const API = publicRuntimeConfig.PRODUCTION 
    ? publicRuntimeConfig.API_PRODUCTION 
    : publicRuntimeConfig.API_DEVELOPMENT
    
export const APP_NAME = publicRuntimeConfig.APP_NAME

export const DOMAIN = publicRuntimeConfig.PRODUCTION 
    ? publicRuntimeConfig.DOMAIN_DEVELOPMENT
    : publicRuntimeConfig.DOMAIN_PRODUCTION

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME