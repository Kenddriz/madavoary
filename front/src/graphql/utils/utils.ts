import moment from 'moment';
import { computed, ref } from 'vue';
import {Notify} from 'quasar';

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
