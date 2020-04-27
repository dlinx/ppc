module.exports = {
  apps: [{
    name: 'PPC',
    script: './bin/www.ts',
    instances: -1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      API_SERVER: 'http://localhost:3000/',
      JWT_SECRET: 'test',
      SESSION_SECRET: 'test',
    },
    env_production: {
      NODE_ENV: 'production',
      API_SERVER: process.env.API_SERVER,
      JWT_SECRET: process.env.JWT_SECRET,
      SESSION_SECRET: process.env.SESSION_SECRET,
    }
  }],
};
