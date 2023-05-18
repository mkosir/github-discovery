/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: 'build-next-static',
  trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

module.exports = nextConfig;
