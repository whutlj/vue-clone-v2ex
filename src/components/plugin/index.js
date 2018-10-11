import Clipboard from './lj-clipboard';
if (window.Vue) {
  console.log('注册');
  Vue.use(Clipboard);
}
export default Clipboard;
