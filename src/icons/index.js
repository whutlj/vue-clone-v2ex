import Vue from 'vue';
import SvgIcon from '@/components/study/SvgIcon';

Vue.component('svg-icon', SvgIcon);
// 使用webpack的管理依赖
const req = require.context('./svg', false, /\.svg$/);
const importAll = (r) => r.keys().forEach(r);
importAll(req);
