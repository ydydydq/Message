<template>
  <transition name="ani_yd-message-fade" >
    <div v-if="visible"
         :class="[type]"
         :style="positionStyle"
         class="yd-message"
         @mouseenter="clearTimer"
         @mouseleave="startTimer">
      <div class="yd-message__content"
          :class="{'center': center}">
        <img v-if="['info', 'success', 'error', 'warning'].includes(type)"
             :src="icons[type + 'Icon']" class="yd-message__icon" />
        <p class="yd-message__text" v-text="message" />
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
          infoIcon, infoCloseIcon, successIcon, successCloseIcon,
          errorIcon, errorCloseIcon, warningIcon, warningCloseIcon
        },
        closed: false,
        timer: null,
        visible: false,
        type: 'info',
        showClose: false,
        message: '',
        duration: 3000,
        offset: 20, // 顶部偏移量
        onClose: null,
        center: false
      }
    },
    computed: {
      positionStyle() {
        return {
          'top': `${ this.offset }px`
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
    display: flex;
    align-items: center;
  }
  .yd-message__content{
    overflow: hidden;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .yd-message__icon{
    min-width: 32px;
    width: 32px;
    height: 32px;
  }
  .yd-message__text{
    color: #fff;
    font-size: 14px;
  }
  .yd-message__close-btn{
    min-width: 32px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  .yd-message.success{
    background: rgba(13,206,127,0.72);
    border: 1px solid rgba(13,206,127,1);
  }
  .yd-message.error{
    background: rgba(255,68,68,0.72);
    border: 1px solid rgba(255,68,68,1);
  }
  .yd-message.warning{
    background: rgba(254,132,86,0.72);
    border: 1px solid rgba(254,132,86,1);
  }
  .ani_yd-message-fade-enter, .ani_yd-message-fade-leave-active {
    opacity: 0;
    transform: translate(0, -100%)
  }
  .center{
    justify-content: center;
  }
</style>
