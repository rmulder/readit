const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const CLIENT_URL = process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD;
const SERVER_URL = process.env.NODE_ENV === 'development' ? process.env.SERVER_URL_DEV : process.env.SERVER_URL_PROD;
const IMAGES_PATH = process.env.IMAGES_PATH;
const CONNECTION_STRING = process.env.NODE_ENV === 'development' ? process.env.CONNECTION_STRING_DEV : process.env.CONNECTION_STRING_PROD;

export { PORT, NODE_ENV, ACCESS_TOKEN_SECRET, CLIENT_URL, SERVER_URL, IMAGES_PATH, CONNECTION_STRING };
