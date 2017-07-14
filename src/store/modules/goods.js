import types from '../types.js'
import axios from 'axios'
// import nowIndex from '../goods/Goods.vue'
const state = {
	goods:[],
	showFoodInfo:false,
	
	// nowIndex:nowIndex
}

const getters = {
	goods(state){
		return state.goods;
	},
	showFoodInfo(state){
		return state.showFoodInfo
	},
	
	nowIndex(state){
		return state.nowIndex;
	}

}

const actions = {
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp => {
			if(resp.data.errno == 0){
				commit(types.GET_GOODS,resp.data.data);
			}
		});
	},
	detailNowfood({commit,state}){
		commit(types.SHOW_FOOD_DETAIL);
		// console.log(state.nowIndex);
	},
	hideFoodInfo({commit}){
		commit(types.HIDE_FOOD_DETAIL);
	}

}

const mutations = {

	[types.GET_GOODS](state,data){
		state.goods = data;
	},
	[types.SHOW_FOOD_DETAIL](state,data){
		state.showFoodInfo = true;
	},
	[types.HIDE_FOOD_DETAIL](state,data){
		state.showFoodInfo = false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}