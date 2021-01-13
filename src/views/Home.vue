<template>
  <div class="container">
    <button class="btn" @click="onClick">点我点我</button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$message({
        message: '测试测试',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn{
    margin: 300px auto 100px auto;
    display: block;
  }
</style>
