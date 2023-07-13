import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import colors from 'vuetify/lib/util/colors';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#F08100',
            secondary: '#1FB7BA',
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
