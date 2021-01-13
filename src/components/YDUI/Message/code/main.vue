<template>
  <transition name="ani_yd-message-fade" >
    <div v-if="visible"
         :class="[type]"
         :style="positionStyle"
         class="yd-message yd-flex-h-hL-vC"
         @mouseenter="clearTimer"
         @mouseleave="startTimer">
      <div class="yd-message__content yd-flex-h-hL-vC yd-flex-1"
          :class="{'yd-flex-h-hC-vC': center}">
        <img v-if="['info', 'success', 'error', 'warning'].includes(type)"
             :src="icons[type + 'Icon']" class="yd-message__icon" />
        <p class="yd-message__text" :class="{'yd-flex-1': !center}" v-text="message" />
      </div>
      <img v-if="showClose" @click="close" :src="icons[type + 'CloseIcon']" class="yd-message__close-btn"/>
    </div>
  </transition>
</template>

<script>
  import infoIcon from '../images/infoIcon.png'
  import infoCloseIcon from '../images/infoCloseIcon.png'
  import successIcon from '../images/successIcon.png'
  import successCloseIcon from '../images/successCloseIcon.png'
  import errorIcon from '../images/errorIcon.png'
  import errorCloseIcon from '../images/errorCloseIcon.png'
  import warningIcon from '../images/warnIcon.png'
  import warningCloseIcon from '../images/warnCloseIcon.png'
  export default {
    name: 'YdMessage',
    data() {
      return {
        icons:{
          infoIcon, infoCloseIcon, successIcon, successCloseIcon, errorIcon, errorCloseIcon, warningIcon, warningCloseIcon
        },
        closed: false,
        timer: null,
        visible: false,
        type: 'info',
        showClose: false,
        message: '',
        duration: 3000,
        verticalOffset: 20, // 顶部偏移量
        onClose: null,
        center: false
      }
    },
    computed: {
      positionStyle() {
        return {
          'top': `${ this.verticalOffset }px`
        };
      }
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },
    mounted() {
      this.startTimer();
    },
    methods: {
      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close()
            }
          }, this.duration);
        }
      }
    }
  }
</script>

<style scoped>
  .yd-message{
    width: 380px;
    min-height: 44px;
    position: fixed;
    z-index: 10000;
    top: 20px;
    left: 50%;
    margin-left: -190px;
    box-sizing: border-box;
    padding: 0 8px 0 10px;
    background: rgba(156,212,255,0.72);
    border: 1px solid rgba(156,212,255,1);
    border-radius: 5px;
    overflow: hidden;
    transition: opacity .3s, transform .4s, top .4s;
  }
  .yd-message__content{
    overflow: hidden;
  }
  .yd-message__content .yd-message__icon{
    min-width: 32px;
    width: 32px;
    height: 32px;
  }
  .yd-message__content .yd-message__text{
    color: #fff;
    font-size: 14px;
  }
  .yd-message__close-btn{
    min-width: 32px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  /*成功*/
  .yd-message.success{
    background: rgba(13,206,127,0.72);
    border: 1px solid rgba(13,206,127,1);
  }
  /*失败*/
  .yd-message.error{
    background: rgba(255,68,68,0.72);
    border: 1px solid rgba(255,68,68,1);
  }
  /*警告*/
  .yd-message.warning{
    background: rgba(254,132,86,0.72);
    border: 1px solid rgba(254,132,86,1);
  }
  /*动画*/
  .ani_yd-message-fade-enter, .ani_yd-message-fade-leave-active {
    opacity: 0;
    -webkit-transform: translate(0, -100%);
    transform: translate(0, -100%)
  }
  .yd-flex-h-hL-vC { /*水平排列;水平左靠齐;垂直居中*/
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-align-items: center;-moz-align-items: center;-ms-align-items: center;align-items: center;
  }
  .yd-flex-1 {-webkit-box-flex: 1;-moz-box-flex: 1;-webkit-flex: 1;-ms-flex: 1 1 auto;flex: 1;overflow: hidden} /*不会造成其他元素的挤压*/
</style>
