<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <div class="box-main">
      <div class="big-com">
            <vue-drag-resize v-for="(item,index) in comList" :key="index"
               @dragging="(point)=>{return draggingEvent(point,index)}" @clicked="(point)=>{return clickedEvent(point,index)}"
               @resizing="(point)=>{return resizeEvent(point,index)}" :minw="30" :x="item.left/2" :y="item.top/2" :w="item.width/2" :h="item.height/2"
               :minh="30" :parentLimitation="true" :preventActiveBehavior="false"
               @dragstop="(point)=>{return dragEvent(point,index)}" @resizestop="(point)=>{return resizestopEvent(point,index)}">
              <div class="resize-item" :style="item|filterStyle">点击</div>
            </vue-drag-resize>
      </div>
      <div class="right-com">
        <div class="add-com">
          <el-button  icon="el-icon-plus">添加按钮</el-button>
        </div>
        <div class="com-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <span style="display: inline-block;width:50px;text-align: left">宽: </span><el-input-number size="small" v-model="form.width" :step="1" controls-position="right" :min="60" :max="imgObg.width" ></el-input-number>
              </el-col>
              <el-col :span="12">
                <span style="display: inline-block;width:50px;text-align: left">高: </span><el-input-number size="small" v-model="form.height" :step="1" controls-position="right" :min="60" :max="imgObg.height"></el-input-number>
              </el-col>
            </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <span style="display: inline-block;width:50px;text-align: left">top: </span><el-input-number size="small" v-model="form.top" :step="1" controls-position="right" :min="0"  ></el-input-number>
            </el-col>
            <el-col :span="12">
              <span style="display: inline-block;width:50px;text-align: left">left: </span><el-input-number size="small" v-model="form.left" :step="1" controls-position="right" :min="0" ></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><span style="display: inline-block;width:90px;text-align: left">字体颜色: </span></el-col>
            <el-col :span="20">
              <el-color-picker v-model="form.color"></el-color-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><span style="display: inline-block;width:90px;text-align: left">字体大小: </span></el-col>
            <el-col :span="20">
              <el-input-number size="small" v-model="form.fontSize" :step="1" controls-position="right" :min="12" :max="50"></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><span style="display: inline-block;width:90px;text-align: left">背景颜色: </span></el-col>
            <el-col :span="20">
              <el-color-picker v-model="form.backgroundColor"></el-color-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><span style="display: inline-block;width:90px;text-align: left">透明度: </span></el-col>
            <el-col :span="20">
              <el-slider v-model="form.opacity"></el-slider>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      {{setForm}}
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export  default {
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    imgObg:{
      type:Object,
      default: ()=>{
        return {
          width:1440,
          height:1080,
          url:'"https://heheo.xyz/download/images/10001.jpg"'
        }
      }
    }
  },
  components:{
    VueDragResize
  },
  computed:{
    dialogVisible:{
      get(){
        return this.visible
      },
      set(obj){
        return this.$emit('update:visible',obj)
      }
    },
    setForm(){
      console.log(this.form)
      if(this.form.width){
        this.comList[this.activeIndex].width=this.form.width
        this.comList[this.activeIndex].height=this.form.height
        this.comList[this.activeIndex].top=this.form.top
        this.comList[this.activeIndex].left=this.form.left
        this.comList[this.activeIndex].color=this.form.color
        this.comList[this.activeIndex].fontSize=this.form.fontSize
        this.comList[this.activeIndex].backgroundColor=this.form.backgroundColor
        this.comList[this.activeIndex].opacity=this.form.opacity
        return ''
      }else{
        return  ''
      }
    }
  },
  data(){
    return{
      comList:[
        {
          top:0,
          left:0,
          height:100,
          width:200,
          opacity:80,
          color:'#f00',
          backgroundColor:'#eee',
          fontSize:12
        }
      ],
      activeIndex:0,
      form:{}
    }
  },
  filters:{
    filterStyle(item){
      return {
        'line-height':item.height/2+'px',
        'color':item.color,
        'font-size':item.fontSize/2+'px',
        'opacity':item.opacity/100,
        'background-color':item.backgroundColor
      }
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible=false
    },
    formatTooltip(val) {
      return val / 100;
    },
    // 组件点击事件
    clickedEvent(e,index){
      this.activeIndex=index
      this.form=JSON.parse(JSON.stringify(this.comList[this.activeIndex]))
    },
    // 组件拖拽事件
    draggingEvent(e,index){
      this.activeIndex=index
      this.form=JSON.parse(JSON.stringify(this.comList[this.activeIndex]))
      this.comList[index].top=e.top*2
      this.comList[index].left=e.left*2
    },
    // 组件拖拽停止事件
    dragEvent(e,index){
      this.activeIndex=index
      this.form=JSON.parse(JSON.stringify(this.comList[this.activeIndex]))
      this.comList[index].top=e.top*2
      this.comList[index].left=e.left*2
    },
    // 组件缩放事件
    resizeEvent(e,index){
      this.activeIndex=index
      this.form=JSON.parse(JSON.stringify(this.comList[this.activeIndex]))
      this.comList[index].width=e.width*2
      this.comList[index].height=e.height*2
    },
    // 组件缩放停止事件
    resizestopEvent(e,index){
      this.activeIndex=index
      this.form=JSON.parse(JSON.stringify(this.comList[this.activeIndex]))
      this.comList[index].width=e.width*2
      this.comList[index].height=e.height*2
    },
  }
}
</script>
<style scoped>
.box-main{
  display: flex;
  justify-content: flex-start;
}
.big-com{
  position: relative;
  width: 720px;
  height: 540px;
  /*max-height: 540px;*/
  background-image: url("https://heheo.xyz/download/images/10001.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  border: 1px solid #42b983;
}
.resize-item{
  text-align: center;
  border-radius:5px;
}
.right-com{
  margin-left: 30px;
  width: 40%;
  padding: 15px;
  border: 1px solid #42b983;
}
.add-com .el-button{
  width:100%;
}
.com-form{
  padding: 15px;
}
.com-form .el-row{
  margin: 6px 0px;
}
</style>