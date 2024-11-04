/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: 'jovial-llama-291.convex.cloud'},
            {hostname: 'oaidalleapiprodscus.blob.core.windows.net'},
        ]
    }
};

export default nextConfig;
