var Clipboard = require('clipboard');
if (!Clipboard) {
  throw new Error('can not finf clipboard, please install clipboard first');
}
export default {
  bind(el, binding, vnode, oldValue) {
    console.log('bing');
    const { rawName } = binding;
    if (rawName === 'v-clip.success') {
      el._clipboard_handle_success = binding.value;
    } else if (rawName === 'v-clip.fail') {
      el._clipboard_handle_fail = binding.value;
    } else {
      el._clipboard = new Clipboard(el, {
        action: function() {
          return 'copy';
        },
        text: function() {
          return binding.value;
        }
      });
      el._clipboard.on('success', function(e) {
        el._clipboard_handle_success();
      });
      el._clipboard.on('error', function(e) {
        el._clipboard_handle_fail();
      });
    }
  },
  update(el, binding, vnode, oldValue) {
    console.log('update');
    const { rawName } = binding;
    if (rawName === 'v-clip') {
      console.log(binding.value);
      el._clipboard.text = function() {
        return binding.value;
      };
    }
  },
  unbind(el, binding, vnode, oldValue) {
    console.log('destroy');
    el._clipboard.destroy();
  }
};
