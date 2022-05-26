import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

export const useLanguages = () => {
  const { locale } = useI18n({ useScope: 'global' });
  const lang = ref(locale);

  const changeLanguage = (value: string) => {
    locale.value = value;
    localStorage.setItem('language', value);
  }
  return { changeLanguage, lang }
}
