import Vue from "vue";
import Router from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import Home from "@/views/Home.vue";

Vue.use(Router)
export default new Router({
    routes:[
        {path:'/',name:"HelloWorld",component:HelloWorld},
        {path:'/home',name:"Home",component:Home},
    ]
})