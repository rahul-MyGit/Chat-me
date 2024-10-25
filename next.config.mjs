/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: 'jovial-llama-291.convex.cloud'}
        ]
    }
};

export default nextConfig;
