/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            },
            {
                hostname: 'picsum.photos'
            }
        ],
    },
    env: {
        chat_api_key: process.env.NEXT_PUBLIC_GET_STREAM_API_KEY
    }
};

export default nextConfig
