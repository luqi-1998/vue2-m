<template>
  <div class="box">
    <vue-drag-resize @resizing="resizeEvent" :minw="30" :w="100" :h="50" :minh="30" :parentLimitation="true" :preventActiveBehavior="false" @dragstop="dragEvent">
      <div :style="styleObj">点击</div>
    </vue-drag-resize>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  components:{
    VueDragResize
  },
  data(){
    return {
      styleObj:{
        'text-align': 'center',
        'line-height':'50px',
        'color':'#f00',
        'background-color':'#eee',
        'fontSize':'12px',
        'border-radius':'5px',
        'opacity':0.4
      }
    }
  },
  methods:{
    dragEvent(e){
      console.log(e)
    },
    resizeEvent(e){
      this.styleObj['line-height']=e.height+'px'
    }
  }
}
</script>
<style>
.box{
  height: 300px;
  width: 500px;
  position: relative;
  background-image: url("https://heheo.xyz/download/images/10001.jpg");
  top: 100px;
  left: 100px;
  border: 1px solid #42b983;
}
</style>