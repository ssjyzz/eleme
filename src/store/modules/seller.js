import types from '../types.js'
import axios from 'axios'

const state = {
	seller:{},
	detailSellerInfo:false,
	showSellerLogo:true,

}

const getters = {
	seller(state){
		return state.seller;
	},
	detailSellerInfo(state){
		return state.detailSellerInfo;
	},
	showSellerLogo(state){
		return state.showSellerLogo
	}
}

const actions = {
	getSeller({commit,state}){
		axios.get('/api/seller').then(resp => {
			if(resp.data.errno == 0){
				commit(types.GET_SELLER,resp.data.data);
			}
		});
	},
	showdetailSellerInfo({commit}){
		commit(types.SHOW_SELLER_DETAIL);
	},
	hideSellerInfo({commit}){
		commit(types.HIDE_SELLER_DETAIL);
	}
}

const mutations = {
	[types.GET_SELLER](state,data){
		state.seller = data;
	},
	[types.SHOW_SELLER_DETAIL](state){
		state.detailSellerInfo = true;
	},
	[types.HIDE_SELLER_DETAIL](state){
		state.detailSellerInfo = false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}