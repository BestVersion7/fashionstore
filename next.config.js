/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/crimson-flamingo/**",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
