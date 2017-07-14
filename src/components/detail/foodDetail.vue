<template>
	
<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
	<div class="foodInfo" v-show="showFoodInfo" ref="wrapper">
		<ul class="foodHeader">
			<li class="backBtn">
				<span class="icon-arrow_lift" @click="hideFoodInfo"></span>
			</li>
			<li class="foodPic">
				<img :src="foods.image">
			</li>
			<li class="foodName">
				{{foods.name}}
			</li>
			<li class="foodSellCount">
				月售{{foods.sellCount}}份 好评率{{foods.rating}}%
			</li>
			<li class="foodPrice">
				<span>￥{{foods.price}} 
					<span class="oldPrice" v-if="foods.oldPrice"> ￥{{foods.oldPrice}} </span>
				</span>
				<span class="shoppingCart" v-show="!foods.count" @click="showBtns($event)">加入购物车</span>
				<h-add-minus v-show="foods.count" :list="foods"></h-add-minus>
			</li>
			<li v-if="foods.info" class="introduction">
				<p>商品介绍</p>
				<p> {{foods.info}} </p>
			</li>
				<h-selectList :ratingArr='foods.ratings'></h-selectList>
			<li class="white">
				
			</li>
		</ul>
		<!-- {{foods}} -->
		
	</div>
</transition>	
	
</template>

<script type="text/javascript">
	// import nowIndex from '../goods/Goods.vue'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import SelectList from '../utils/SelectRatings.vue'
	import addMinusBtn from '../utils/add-Minus-Btn.vue'
	import ShoppingCart from '../utils/ShoppingCart.vue'
	export default{
		data(){
			return{
				hideBtns:true,
			}
		},
		computed:{
			...mapGetters([
				'showFoodInfo',
				'seller',
				'ratings',
				'goods'
			])
		},
		components:{
			'h-selectList':SelectList,
			'h-add-minus':addMinusBtn,
		},
		methods:{
			hideFoodInfo(){
				this.$store.dispatch('hideFoodInfo');

			},
			showBtns(e){
				console.log(e);
				console.log("gouwuche");
				if(!this.foods.count){
			    	Vue.set(this.foods,"count",1);
			    }else{
					this.foods.count++;
			    }
			},
			_wrapper(){
				this.wrapper = new BScroll(this.$refs.wrapper,{
					click:true
				});
				// this.rightListWrapper.on('flick',(pos) => {
				// 	console.log('qingfu');
				// });
			}
		},
		watch:{
			foods(){
				
					this.$nextTick( () => {
					if(!this.wrapper){
						this._wrapper();
					}else{
						this.wrapper.refresh;
					}
					});
				}
				
			
		},
		props:{
			foods:{
				type:Object,
			}
		},
		created(){
			// this.$nextTick( () => {
			// 	this._wrapper();
			// });
		}

	}
</script>

<style lang="less" scoped>
	@orange:rgb(255,153,0);
	@black:rgb(7, 17, 27);
	@bordercolor:rgba(7, 17, 27,0.1);
	@gray:#bbb;
	@blue:#3190e8;
	@red:rgb(240,20,20);
	@darkGray:#999;
	.hidetext{
		white-space:nowrap; 
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis; 
		overflow: hidden;
	}
	.foodInfo{
		// top:4rem;
		top:-0.5rem;
		// top:-3rem;
		left:0.7rem;
		width:6rem;
		bottom:1.6rem;
		position: absolute;
		z-index: 999;
		// height:5rem;
		// padding:1.28rem 0.72rem 0;
		background:#eee;
		border-radius: 0.5rem;
		overflow:hidden;
		box-shadow: 0 0 0.4rem;
		padding:0.06rem;
		.foodHeader{
			// padding-bottom: 2rem;
			// background:#fff;
			// border: 1px solid #000;
			margin-bottom: 0.3rem;
			.white{
				height:0.3rem;
				width: 6rem;
				background: #fff;
			}
			.backBtn{
				position:absolute;
				left:0.2rem;
				top:0.2rem;
				color:#fff;
				font-size: 0.4rem;
			}
			.foodPic img{
				border-radius: 0.5rem 0.5rem 0.1rem 0.1rem; 
				width:6rem;
				height:6rem;
			}
			.foodName,.foodSellCount,.foodPrice,.introduction{
				padding-left: 0.36rem;
				background:#fff;
			}
			.foodName{
				font-size: 0.28rem;
				font-weight: 700;
				color:@black;
				line-height: 0.28rem;
				padding:0.36rem 0 0.16rem 0.36rem;
			}
			.foodSellCount{
				font-size:0.2rem;
				color:@darkGray;
				line-height: 0.2rem;
				padding-bottom: 0.36rem;
				
			}
			.foodPrice{
				font-size: 0.28rem;
				font-weight: 700;
				color:@red;
				border-bottom:0.02rem solid @bordercolor;
				padding-bottom: 0.36rem;
				display: flex;
				justify-content: space-between;
				.oldPrice{
					font-size: 0.2rem;
					color:@darkGray;
					text-decoration: line-through;
				}
				.shoppingCart{
					width: 1.48rem;
					height:0.48rem;
					background: @blue;
					color:#fff;
					text-align: center;
					border-radius: 0.24rem;
					font-size: 0.2rem;
					line-height: 0.48rem;
					margin:-0.12rem 0.36rem 0 0;
				}
			}
			.introduction{
				// border: 1px solid #000;
				margin: 0.32rem 0;
				border-top:0.02rem solid @bordercolor;
				border-bottom:0.02rem solid @bordercolor;
				padding:0.36rem;
				& p:first-child{
					font-size: 0.28rem;
					color:@black;
					line-height: 0.28rem;
					padding-bottom: 0.12rem;

				}
				& p:last-child{
					font-size: 0.24rem;
					color:@darkGray;
					font-weight: 200;
					line-height: 0.48rem;
					padding: 0 0.12rem;
				}
			}
			.filterBtns,.selectRatings,.ratingsList{
				padding:0.36rem;
				background: #fff;
			}
			.filterBtns{
				border-top:0.02rem solid @bordercolor;
				border-bottom: 0.02rem solid @bordercolor;
				div{
					padding-bottom: 0.36rem;
					font-size: 0.28rem;
					color:@black;
					line-height: 0.28rem;					
				}
				ul {
					display: flex;
					li{
						display: inline-block;
						height: 0.4rem;
						padding:0.16rem 0.2rem;
						text-align: center;
						font-size: 0.26rem;
						line-height: 0.4rem;
						background: @blue;
						color:#fff;
						margin-right: 0.2rem;
						border-radius: 5px;
						letter-spacing: 0.02rem;
						&:nth-child(2){
						background: #ebf5ff;
						color:#6d7885;
						}
						&:nth-child(3){
							background: #f5f5f5;
							color:#aaa;
						}
					}
				}
			}
			.selectRatings{
				color:@gray;
				font-size: 0.28rem;
				span{
					padding-right: 0.1rem;
					font-size: 0.5rem;
					vertical-align: middle;
				}
			}
		}
	}

</style>