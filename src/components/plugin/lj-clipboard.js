var Clipboard = require('clipboard');
if (!Clipboard) {
  throw new Error('can not finf clipboard, please install clipboard first');
}
// inspired by vue-clipboard
// 自己根据vue-clipboard制作一个插件
// 在完成公用插件时，尽量不用es6语法，保证所有浏览器在不使用babel转换时也能使用
var LjClipboard = {
  install: function(Vue, options) {
    // 自定义一个实例方法，当调用该实例方法时完成复制，使用clipboard的Advanced Method
    // 返回promise对象，以便使用时可以使用
    Vue.prototype.$ljCopy = function(text, container) {
      // 粘贴为异步的
      return new Promise(function(resolve, reject) {
        var buttonElement = document.createElement('button');
        var clipboard = new Clipboard(buttonElement, {
          action: function() {
            return 'copy';
          },
          text: function() {
            return text;
          },
          container: container ? container : document.body
        });
        console.log(clipboard);
        clipboard.on('success', function(e) {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on('error', function(e) {
          clipboard.destroy();
          reject(e);
        });
        buttonElement.click();
      });
    };
    // 定义组件
    Vue.directive('clip', {
      bind(el, binding, vnode, oldValue) {
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
            el._clipboard_handle_success && el._clipboard_handle_success();
          });
          el._clipboard.on('error', function(e) {
            el._clipboard_handle_fail && el._clipboard_handle_fail();
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
        if (rawName === 'v-clip.success') {
          delete el._clipboard_handle_success;
        } else if (rawName === 'v-clip.fail') {
          delete el._clipboard_handle_fail;
        } else {
          el._clipboard.destroy();
          delete el._clipboard;
        }
      }
    });
  }
};

export default LjClipboard;
