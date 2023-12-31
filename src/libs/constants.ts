const production: boolean = process.env.PRODUCTION === "true";
export const API_URL = (production) ? "https://api.bitspace.org.in" : "http://localhost:6969"
export const CLIENT_URL = (production) ? "https://bitspace.org.in" : "http://localhost:3000"
export const FERNET_SALT = process.env.FERNET_SALT
