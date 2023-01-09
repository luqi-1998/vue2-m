<template>
  <div>
    <el-button @click="handleOpen">点击弹出</el-button>
    <my-box :visible.sync="open"></my-box>
  </div>
</template>

<script>
import myBox from "@/components/my-box.vue";

export default {
  name: 'Home',
  components: {myBox},
  data() {
    return {
      open: false
    }
  },
  methods: {
    handleOpen() {
      this.open = true
    }
  }
}
</script>

<style scoped>

</style>