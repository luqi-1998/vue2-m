<template>
  <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <div class="box-main">
      <div class="big-com" :style="fatherStyle">
            <vue-drag-resize v-for="(item,index) in comList" :key="index"
               @dragging="(point)=>{return draggingEvent(point,index)}" @clicked="(point)=>{return clickedEvent(point,index)}"
               @resizing="(point)=>{return resizeEvent(point,index)}" :minw="30" :x="item.left/2" :y="item.top/2" :w="item.width/2" :parentH="imgObg.height/2" :parentW="imgObg.width/2" :h="item.height/2"
               :minh="30" :parentLimitation="true" :preventActiveBehavior="false"
               @dragstop="(point)=>{return dragEvent(point,index)}" @resizestop="(point)=>{return resizestopEvent(point,index)}">
              <div class="resize-item" :style="item|filterStyle">{{ item.title }}</div>
            </vue-drag-resize>
      </div>
      <div class="right-com">
        <div class="add-com">
          <el-button  icon="el-icon-plus" @click="addButton">添加按钮</el-button>
        </div>
        <div class="com-form">
          <el-form  :model="form" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="宽:">
                  <el-input  size="small" v-model="form.width" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="高:">
                  <el-input size="small" v-model="form.height"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="距顶部:">
                <el-input size="small" v-model="form.top"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="距左边:">
                <el-input size="small" v-model="form.left"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="按钮标题:">
              <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="按钮链接:">
              <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色:">
              <el-color-picker v-model="form.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小:">
              <el-input-number size="small" v-model="form.fontSize" :step="1" controls-position="right" :min="12" :max="50"></el-input-number>
          </el-form-item>
          <el-form-item label="背景颜色:">
              <el-color-picker v-model="form.backgroundColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="透明度:">
              <el-slider v-model="form.opacity"></el-slider>
          </el-form-item>
          </el-form>
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
          height:900,
          url:"https://heheo.xyz/download/images/bg.jpg"
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
      if(this.form.width){
        this.comList[this.activeIndex].width=this.form.width
        this.comList[this.activeIndex].height=this.form.height
        this.comList[this.activeIndex].top=this.form.top
        this.comList[this.activeIndex].left=this.form.left
        this.comList[this.activeIndex].color=this.form.color
        this.comList[this.activeIndex].fontSize=this.form.fontSize
        this.comList[this.activeIndex].backgroundColor=this.form.backgroundColor
        this.comList[this.activeIndex].opacity=this.form.opacity
        this.comList[this.activeIndex].title=this.form.title
        this.comList[this.activeIndex].link=this.form.link
        return ''
      }else{
        return  ''
      }
    },
    fatherStyle(){
      return {
        'width':this.imgObg.width/2+'px',
        'height':this.imgObg.height/2+'px',
        'backgroundImage':`url(${this.imgObg.url})`,
        'backgroundSize':`${this.imgObg.width/2+'px'} ${this.imgObg.height/2+'px'}`
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
          fontSize:12,
          title:'按钮',
          link:''
        }
      ],
      activeIndex:0,
      form:{
        top:0,
        left:0,
        height:100,
        width:200,
        opacity:80,
        color:'#f00',
        backgroundColor:'#eee',
        fontSize:12,
        title:'按钮',
        link:''
      }
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
    addButton() {
      this.comList.push({
        top:0,
        left:0,
        height:100,
        width:200,
        opacity:80,
        color:'#f00',
        backgroundColor:'#eee',
        fontSize:12,
        title:'按钮',
        link:''
      })
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
      console.log(e,index)
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
  /*background-repeat: no-repeat no-repeat;*/
  /*background-size: 100% 100%;*/
}
.resize-item{
  text-align: center;
  border-radius:5px;
}
.right-com{
  width: 40%;
  padding: 15px;
}
.add-com .el-button{
  width:100%;
}
.com-form{
  padding: 15px;
}
</style>