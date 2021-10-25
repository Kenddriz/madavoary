import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
const VueTelInput = require('vue3-tel-input').default;
import 'vue3-tel-input/dist/vue3-tel-input.css';

import messages from 'src/i18n';

const i18n = createI18n({
  locale: 'fr-FR',
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
  app.use(VueTelInput);
});

export { i18n };
