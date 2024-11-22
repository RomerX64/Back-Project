import {config as dotenvConfig} from 'dotenv'

dotenvConfig({ path:'.env.development' })

export const config ={
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET ,
    baseURL: process.env.AUTH0_BASEURL,
    clientID: process.env.AUTH0_CLIENTID ,
    issuerBaseURL: process.env.AUTH0_ISSUERBASERL
}