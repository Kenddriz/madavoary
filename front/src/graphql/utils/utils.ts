import moment from 'moment';
import { computed, ref } from 'vue';
import {date, Loading, Notify} from 'quasar';
import {useI18n} from 'vue-i18n';

export const classificationKeys = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'];
export const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}

export const leftDays = (exp: number|string) => {
  return moment(exp).diff(Date.now(), 'days') + 1;
}

export const movable = (callBack: any = undefined) => {
  const pos = ref([0, 0]);
  function move (ev: any) {
    if(callBack)callBack(ev);
    pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
  }
  const currentPos = computed(() => `transform:translate(${pos.value[0]}px,${pos.value[1]}px`);
  return { currentPos, move }
}

export const notify = (message: string, color='positive') => {
  Notify.create({
    message: message,
    color,
    position: 'bottom-right',
    multiLine: true,
    html: true,
    icon: 'info'
  });
}
export const validMail = (email: string) => {
  return (/^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i).test(email);
}

const {isValid, formatDate: formatD } = date;
export const formatDate = (val: string | number, format: any) =>{
  if(typeof val === 'number')
    return formatD(val, format);
  return (isValid(val) ? formatD(val, format) : val)
}

export const useLoading = () => {
  const { t } = useI18n();
  function loading(msgKey: string, done = false) {
    if(done) {
      Loading.hide();
      notify(t(msgKey));
    }else Loading.show({
      message: t(msgKey),
      spinnerColor: 'amber',
      messageColor: 'amber'
    });
  }
  return { loading }
}

export const useValidationError = () => {
  const { tm } = useI18n();
  function validationError(reference: Record<string, any>) {
    notify(tm('errorOn') + ' ' + String(tm(reference.name)).toLowerCase(), 'red');
  }
  return { validationError }
}
export const makeTree = (
  items: any[],
  parentId: number|null
): any[] => {
  return items
    .filter(item => item.parentId === parentId)
    .map(item => ({ ...item, children: makeTree(items, item.id)}));
};
