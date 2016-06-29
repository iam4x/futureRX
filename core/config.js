const { PORT, NODE_ENV } = process.env

const APP_CONFIG = {
  shared: {

  },

  development: {
    PORT: parseInt(PORT, 10) || 3000
  },

  production: {
    PORT: parseInt(PORT, 10) || 3010
  }
}

// default to development config
export default {
  ...APP_CONFIG.shared,
  ...(APP_CONFIG[NODE_ENV] || APP_CONFIG.development)
}
