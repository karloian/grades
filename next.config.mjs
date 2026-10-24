/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make sure the CSV is bundled with the serverless function on Vercel
  outputFileTracingIncludes: {
    "/": ["./data/**/*"],
  },
};
export default nextConfig;
