export let BASE_URL: string;

process.env.NODE_ENV == "production"
    ? (BASE_URL = "https://afashionstore.vercel.app")
    : (BASE_URL = "http://localhost:3000");
