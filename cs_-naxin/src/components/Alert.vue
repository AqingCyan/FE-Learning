<template>
  <div class="alert">
    <el-alert :title="message" type="error" show-icon></el-alert>
  </div>

</template>

<script>
  export default {
    name: "Alert",
    props:['message'],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
.alert{
  width: 100%;
  height: 20px;
}
  .alert >>> .el-alert{
    padding: 5px;
  }
</style>
