const config = {
  url: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5000' : 'http://127.0.0.1:5000',
  api: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5000' : 'http://nestjs:5000',
}

export default config;