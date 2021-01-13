import Message from './Message';

const install = function(Vue, opts = {}) {
  Vue.prototype.$message = Message.service;
};

/* istanbul ignore if */
if(typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  install
}
