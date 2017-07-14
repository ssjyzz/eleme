<template>

  <div class="ShoppingCart">
	
	    <ul class="leftBox">
	    <transition enter-active-class="animated bounceIn" >
	    	<li :class="{isSelected:totalAllPrice>0?true:false}" class="circle"  @click="checkShoppingCart">
	    		
		    		<span class="showAllCount" v-show="totalAllPrice > 0">{{foodAllCount}}</span>
		    		<span class="icon-shopping_cart"></span>
	    		
	    	</li>
	    </transition>
	    	<li class="totalPrice">{{totalAllPrice}}￥ </li>
	    	<li class="line"></li>
	    	<li class=""> 另需配送费￥{{seller.deliveryPrice}} 元</li>
	    </ul>
	    <div class="rightBox" v-show="totalAllPrice === 0">
	    	￥{{seller.minPrice}}起送
	    </div>
	    <div class="rightBox" v-show="totalAllPrice > 0 && totalAllPrice < seller.minPrice">
	    	还差￥{{seller.minPrice - totalAllPrice}} 起送
	    </div>
	    <div :class="{isSelected:totalAllPrice>0?true:false}" class="rightBox" :style="{background:'#3190e8'}" v-show="totalAllPrice >= seller.minPrice">
	    	去结算
	    </div>
	    <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
	    <ul class="shopCartUl" v-show="canShowCartUl" >
	    	<li class="cartTitle"><span>购物车</span><span @click="clearShopCart">清空</span></li>
	    	<li class="shopLi" v-for="foodLi in selectFood">
	    		<div class="shopFoodName">{{foodLi.name}}</div>
	    		<div class="shopFoodPrice">
	    			<span >{{foodLi.price * foodLi.count}} <span>￥</span> </span>
		    		<h-add-minus :list="foodLi" class="calcBtns"></h-add-minus>
	    		</div>
	    	</li>
	    </ul>
	    </transition>
	    
    
  </div>
 
</template>

<script>
	import { mapGetters } from 'vuex'
	import addMinusBtn from '../utils/add-Minus-Btn.vue' 
	export default {
		data(){
			return {
				canShowCartUl:false,
				foodAllCountArr:[],
				foodAllCount:0,
			}
		},
	    computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods'
			]),
			selectFood(){
				let arr = [];
				this.Goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							arr.push(food);
						}
					});
				});
				return arr;
			},
			totalAllPrice(){
				let allPrice = 0;
				let allCount  = 0;
				this.selectFood.forEach((food)=>{
					allCount += food.count;
					allPrice += food.count * food.price;
				});
				this.foodAllCount = allCount;
				return allPrice;
			},

		},
		components:{
			'h-add-minus':addMinusBtn,
		},
		props:{
			Goods:{
				type:Array
			}

			
		},
		methods:{
			checkShoppingCart(){
				if(this.totalAllPrice > 0){
					console.log(1);
					return this.canShowCartUl = !this.canShowCartUl;
				}
				
			},
			clearShopCart(){
				this.selectFood.forEach((food)=>{
					food.count = 0;
					this.canShowCartUl = false;
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@orange:rgb(255,153,0);
	@black:rgb(7, 17, 27);
	@gray:#bbb;
	@blue:#3190e8;
	@red:rgb(240,20,20);
	@darkGray:#999;
	@lightGray:#eee;
	@bordercolor:rgba(7, 17, 27,0.1);
	.ShoppingCart{
		position: fixed;
		z-index:3;
		width: 100%;
		height: 1.1rem;
		background:#333;
		bottom: 0;
		left: 0;
		display: flex;
		line-height:1.16rem;
		color:rgba(255,255,255,0.4);
		// overflow:hidden;
		.leftBox{
			flex:1;
			display: flex;
			list-style: none;
			position: absolute;
			z-index: 5;
			left:0;
			// li{border: 1px solid #fcc;}
			// border: 1px solid #000;

			.circle{
				margin:-0.38rem 0.24rem 0;
				width: 1.16rem;
				height: 1.16rem;
				background: #66666A;
				// background: red;
				border-radius: 1rem;
				border: 0.16rem solid #333;
				text-align: center;
				// border: 0.16rem solid yellow;
				.showAllCount{
					height: 0.4rem;
					position: absolute;
					color:#fff;
					border-radius: 0.24rem;
					background: red;
					width: 0.58rem;
					display: block;
					left:1.1rem;
					line-height: 0.4rem;
					font-weight: 700;
					bottom:1.1rem;
					font-size: 0.24rem;
					box-shadow:0 4px 8px 0 #333

				}
				&.isSelected{
					background-color:#3190e8;
					color:#fff;
				}
				& span{
					font-size: 0.7rem;
					line-height:1.16rem;
				}
			}
			.totalPrice{
				font-size: 0.32rem;
				font-weight: 700; 
				width: 0.8rem;
				text-align: right;
				// border: 1px solid #000;
				// color:#fff;
			}
			.line{
				width: 0.02rem;
				height: 50%;
				// vertical-align: middle;
				// line-height:0rem;
				margin: 0.24rem;
				background:#535356;
			}

		}
		.rightBox{
			position: absolute;
			z-index: 5;
			right:0;
			width: 2rem;
			background:#535356;
			flex:0 0 2.1rem;
			text-align: center;
			font-size:0.24rem;
			font-weight: 700;
			&.isSelected{
					background-color:#3190e8;
					color:#fff;
				}
			// border: 1px solid #000;
		}
		.shopCartUl{
			position:absolute;
			bottom:1.1rem;
			z-index:-1;
			width: 7.48rem;
			background: #fff;
			border: 1px solid @lightGray;
			// height:2rem;
			color:@black;
			// padding-bottpm:1rem;
			font-weight: 200;
			// font-size: 0.48rem;
			.cartTitle{
				background:#f3f5f7;
				height:0.8rem;
				line-height: 0.8rem;
				border-bottom: 1px solid @lightGray;
				border-top: 1px solid @lightGray;
				display: flex;
				font-size: 0.3rem;
				justify-content: space-between;
				padding:0 0.36rem;
				& :last-child{
					font-size: 0.24rem;
					color:@blue;
				}
			}

			.shopLi{
				// border: 1px solid #000;
				display: flex;
				justify-content: space-between;
				margin:0 0.36rem;
				line-height: 0.96rem;
				border-bottom: 1px solid @lightGray;
				& div{
					height:0.96rem;
					
				}
				&:last-child{
					padding-bottom: 0.3rem;
				}
				.shopFoodName{
					font-weight: 700;
				}
				.shopFoodPrice{

					span{
						color:red;
						font-size: 0.28rem;
						font-weight: 700;
						// position: fixed;
						span{
							font-size: 0.2rem;
						}
					}
					.calcBtns{
						// width: rem;
						// border: 1px solid #000;
						// display: inline-block;
						vertical-align: middle;
					}
				}
				
			}

		}
	}
</style>
