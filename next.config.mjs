/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'maath', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*(svg|webp|png|jpe?g|gltf|bin)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
