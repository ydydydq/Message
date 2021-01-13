import Vue from 'vue';
import Main from './main.vue';

var myMessageConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
let seed = 1;

const myMessage = (options = {}) => {
  // 处理直接传字符串
  if(typeof options === 'string') {
    options = {
      message: options
    }
  }

  // 实例化
  instance = new myMessageConstructor({
    data: options
  });

  // 唯一id标识
  let id = 'myMessage_' + seed++;
  instance.id = id;

  // 在data中挂个关闭事件
  let optionsOnClose = options.onClose;
  instance.onClose = () => {
    myMessage.close(id, optionsOnClose);
  };

  // 当Vue实例没有el属性时,则该实例尚没有挂载到某个dom中;假如需要延迟挂载,可以在之后手动调用vm.$mount()方法来挂载
  instance.$mount();

  // 加入DOM树
  document.body.appendChild(instance.$el);

  // 偏移量
  let verticalOffset = options.offset || instance.verticalOffset;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  });
  instance.verticalOffset = verticalOffset;

  // 显示dom
  instance.visible = true;

  // 保存实例
  instances.push(instance);

  return instance
};

/**
 * 关闭事件
 * @param id: 实例id
 */
myMessage.close = function(id, optionsOnClose) {
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



export default myMessage
