<template>
	<div class="add-Minus-Btn">
		<!-- {{list}} -->
		<span v-show="list.count" @click.stop="doMinus" id="minusBtn" class="icon-remove_circle_outline"></span>
		<span v-show="list.count" id="countTxt">{{list.count}}</span>
		<span @click.stop="doPlus()" id="addBtn" class="icon-add_circle"></span>
	</div>	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	export default{
		props:{
			list:{
				type:Object,
			}
		},
		data(){
			return{
				
				
			}
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods',
				'showFoodInfo',
				'detailSellerInfo'
			]),
			
		},
		methods:{
			doMinus(){

				if(this.list.count>=1){

					this.list.count--;
				}
			
			},
			doPlus(){
				if(!this.list.count){
			    	Vue.set(this.list,"count",1);
			    }else{
					this.list.count++;

			    }
					console.log("++");

				
			    
				
				
			}
		}

	}
	
</script>

<style lang="less" scoped>
	.add-Minus-Btn{
		display: inline-block;
		text-align:right;
		// border: 1px solid #000;
		// height: 0.5rem;
		width: 2rem;
		& #addBtn,#minusBtn{
			// border: 1px solid #000;
			font-size: 0.48rem;
			line-height: 0.48rem;
			text-decoration: none;
			color:rgb(0, 160, 220);
			vertical-align: middle;
		}
		#addBtn{
			position:relative;
			right:0;
		}
		#minusBtn{
			position: relative;
			right:0rem;
			// right:1rem;
		}
		#countTxt{
			display: inline-block;
			// border: 1px solid #000;
			width: 0.6rem;
			position: relative;
			color:#000;
			right:0.2rem;
		}
	
	}
</style>