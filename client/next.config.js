/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PUBLIC_RECAPTCHA_SITE_KEY: '6Le5IGsfAAAAADUZV6u2jkJ7kVm-DU04kMnXgaJt',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
