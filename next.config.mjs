/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'maath', '@react-three/fiber', '@react-three/drei'],
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
