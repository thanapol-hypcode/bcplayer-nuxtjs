export default {
  nitro: {
    preset: 'vercel-edge',
  },
  modules: ['@nuxtjs/tailwindcss'],
  pages: true,
  runtimeConfig: {
    public: {
      accountId: '',
      playerId: '',
      policyKey: '',
    }
  }
};
