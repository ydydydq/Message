import Vue from 'vue';
import Main from './main.vue';

var messageConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
let seed = 1;

const message = (options = {}) => {
  // 处理直接传字符串的情况
  if(typeof options === 'string') {
    options = {
      message: options
    }
  }

  instance = new messageConstructor({
    data: options
  });
  let id = 'myMessage_' + seed++;
  instance.id = id;

  // 处理options参数传递进来的关闭回调
  let optionsOnClose = options.onClose;
  // 在实例的data属性中挂载onClose()方法, 等关闭的事件触发后来回调处理后续的事情。
  instance.onClose = () => {
    message.close(id, optionsOnClose);
  };

  instance.$mount();
  document.body.appendChild(instance.$el);
  let offset = options.offset || instance.offset;
  instances.forEach(item => {
    offset += item.$el.offsetHeight + 16
  });
  instance.offset = offset;

  // 显示dom
  instance.visible = true;

  instances.push(instance);
  return instance
};

/**
 * 当前组件隐藏后需要做的事情:
 * 1. 处理一下其他组件的偏移量往上移
 * 2. 调用options参数传进来的关闭回调
 * 3. 删除保存instances变量中的实例
 * @param id: 实例id
 */
message.close = function(id, optionsOnClose) {
  let len = instances.length;
  let index = -1;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      index = i;
      if (typeof optionsOnClose === 'function') {
        optionsOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  // 多个的时候关闭中间的,要下面的上移
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  const removedHeight = instances[index].$el.offsetHeight;
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

export default message
