export default {
  nitro: {
    preset: 'vercel-edge',
  },
  modules: ['@nuxtjs/tailwindcss'],
  pages: true,
  runtimeConfig: {
    public: {
      accountId: process.env.ACCOUNT_ID,
      playerId: process.env.PLAYER_ID,
    }
  }
};
