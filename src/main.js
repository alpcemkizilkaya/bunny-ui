import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
Vue.config.productionTip = false
import 'semantic-ui-css/semantic.min.css';
import VModal from 'vue-js-modal'
import axiosInstance from 'axios'
import VueRouter from 'vue-router'
import UserList from "@/components/UserList";
import TaskList from "@/components/TaskList";


Vue.use(SuiVue).use(VModal);
Vue.prototype.$http = axiosInstance;
Vue.use(VueRouter)


const routes = [
  { path: '/', component: UserList,name: 'user'},
  {path:'/task/:id',component: TaskList,name:'task'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
