export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/dp_logo.ico' },
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' },        
    ],
      meta: [
        {
          name: 'viewport',
          content:
            'initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width',
        },
      ],
      script: [
        { src: 'https://polyfill.io/v3/polyfill.min.js?features=default' },
        { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', integrity: 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj', crossorigin: 'anonymous' },
        { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js', integrity: 'sha384-/bubw1XrpOV7/8AaAX1jM6B3akcB6zFSO+1Dzok5ed2HFWkRLK9EG0HOTp7Ed4sx', crossorigin: 'anonymous' },
        { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js', integrity: 'sha384-pzjw8f+ua6PAZk4tk5MWGCs1tu+kIqOgPfGZU1/m6wl1Fkw6bC1Cav2pad2O+arv', crossorigin: 'anonymous' },
     
      ],
      title: 'VHP Dev Test',
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.css',
    '@vuepic/vue-datepicker/dist/main.css',
    '~/assets/style/main.scss',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  hooks: {
    'components:dirs': function (dirs: any) {
      dirs.push({
        path: '~/components',
      });
    },
  },
  components: {
    global: true,
  },
  typescript: {
    shim: false,
  },
});
