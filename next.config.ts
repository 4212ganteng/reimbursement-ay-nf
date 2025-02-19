/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://pub-9190fc9c9d944df6864d50f5a81695ed.r2.dev',
        pathname: '/**'
      }
    ]
  },
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|id|fr|ar)',
        destination: '/:lang/home',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|id|fr|ar|favicon.ico)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
