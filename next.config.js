// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/curriculo',
        destination: '/curriculum',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/curriculum',
        permanent: true,
      },
      {
        source: '/cv',
        destination: '/curriculum',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
