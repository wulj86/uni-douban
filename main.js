import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()

import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// https://www.showdoc.com.cn/128719739414963/2513235043485226  本项目所有接口地址
$http.baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'  //请求根路径
	
$http.beforeRequest=(options)=>{
	uni.showLoading({
		title:'数据加载中...'
	})
	if(options.url.includes('/my/')){
		options.header={
			Authorization:store.state.m_user.token
		}
	}
}

$http.afterRequest=(options)=>{
	uni.hideLoading()
}

uni.$showMsg=(title='数据加载成功...',duration=1500)=>{
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

