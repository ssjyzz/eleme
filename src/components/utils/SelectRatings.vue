<template>
	<div class="ratingsBody">
		<ul class="filterBtns">
			<li :class="{current:select=='all'?true:false,like:select!='all'?true:false}" @click="select='all'">全部</li>
			<li :class="{current:select=='like'?true:false,like:select!='like'?true:false}" @click="select='like'">满意</li>
			<li :class="{currentHate:select=='hate'?true:false,hate:select!='hate'?true:false}" @click="select='hate'">不满意</li>
		</ul>
		<ul class="selectRatings"  >
			<li @click.stop="isHideNoTxt()">
			<span :style="{color:hideNoTxt?'#3190e8':'gray',fontSize:'0.3rem'}">
				<span  class="icon-check_circle"></span>
				只看有内容的评价
			</span>
			</li>
		</ul>
		<ul class="ratingsList" >
			<li class="ratingLi" v-for="(rt,index) in ratingArr" v-show="selectList(rt,select,hideNoTxt)">
				<!-- {{rt}} -->
				<img :src="rt.avatar" >
				<ul class="rightUl">
					<li class="username">{{rt.username}}</li>
					<li class="ratingScore">
						<h-star v-if="rt.score" class="star" :ratingsScore = "rt.score" :w="24" :h="2"></h-star>
						<span v-if="rt.deliveryTime">{{rt.deliveryTime}}分钟送达</span>
					</li>
					<li class="ratingText"> 
					<span class="like icon-thumb_up" v-show="rt.rateType===0"></span>
					<span class="hate icon-thumb_down" v-show="rt.rateType===1"></span> 
					<span>{{rt.text}}</span> 
					</li>
					<ul class="foods ">
						<span class="icon-thumb_up"></span>
						<li v-for="food in rt.recommend">{{food}} </li>
						 
					 </ul>
				</ul>
			</li>

		</ul>
		<!-- {{rating}} -->
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import ShoppingCart from '../utils/ShoppingCart.vue'
	import Star from '../utils/ratingStar.vue'
	export default {
		data(){
			return {
				hideNoTxt : false,
				select:'all',
				rtArr:[]
			}
		},
		props:{
			ratingArr:{
				type:Array
			}
		},

		mounted(){
			// console.log($(".rightList"));
			ShoppingCart;

		},
		components:{
			'h-shoppingCart':ShoppingCart,
			'h-star':Star

		},
		methods:{
			isHideNoTxt(){
				this.hideNoTxt = !this.hideNoTxt;
				
				return this.hideNoTxt;
			},
			selectList(rt,select,hideNoTxt){
				let flag = true;

				if ( hideNoTxt )
					flag = rt.text != "";

				switch (select) {
					case "all":
						break;
					case "like":
						flag &= rt.rateType == 0;
						break;
					case "like":
						flag &= rt.rateType == 1;
						break;
				}

				return flag;
			}

			
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods'
			]),

			aa(){

				// console.log(this.select);
				// return true;
				let flag = '';
				if (this.select =='all'){
					if(!this.hideNoTxt){
						this.ratingArr.forEach((rt)=>{
							flag = true;
						});
						return flag;
					}
					if(this.hideNoTxt){
						this.ratingArr.forEach((rt)=>{
							flag = `${rt.text}`;
						});
						
						console.log(flag);
						return flag;
						
					}

				
				}	
			}
		}
	}
</script>

<style lang="less" scoped>
	@orange:rgb(255,153,0);
	@black:rgb(7, 17, 27);
	@gray:#bbb;
	@lightGray:#ccc;
	@blue:#3190e8;
	.current{
		background: @blue;
		color:#fff;
	}
	.like{
		background: #ebf5ff;
		color:@gray;
	}
	.hate{
		background: #f5f5f5;
		color:@gray;
	}
	.ratingsBody{
		width: 7.49rem;
		height:7.4rem;
		background: #fff;
		bottom:0;
		// border: 1px solid #00f;
		.filterBtns,.selectRatings{
			display: flex;
			// border: 1px solid #000;
			margin:0 0.36rem;
			padding:0.36rem 0;
			border-bottom: 1px solid @gray;
		}
		.filterBtns li{
			display: inline-block;
			height: 0.4rem;
			padding:0.16rem 0.2rem;
			text-align: center;
			font-size: 0.26rem;
			line-height: 0.4rem;
			margin-right: 0.2rem;
			border-radius: 5px;
			letter-spacing: 0.02rem;
		}
		.selectRatings{
			li{
				color:@gray;
				font-size: 0.28rem;
				
				span{
					margin-right: 0.1rem;
					font-size: 0.5rem;
					vertical-align: middle;
				}
			}
		}
		.ratingsList > li{
			display: flex;
			width: 6.77rem;
			// border: 1px solid #f00;
			margin:0.36rem;
			img{
				width: 0.56rem;
				height: 0.56rem;
				border-radius: 0.3rem;

			}
			.rightUl{

				width: 6.77rem;
				// border: 1px solid #00f;
				margin-left:0.24rem;
				.username{
					font-size: 0.2rem;
					color:@black;
					line-height: 0.24rem;
					margin-bottom: 0.08rem;
				}
				.ratingScore{
					color:@gray;
					font-size: 0.2rem;
					display: flex;
					line-height: 0.28rem;
					.star{
						height: 0.24rem;
						width: 1.5rem;
					}
					span{
						font-weight: 200;
						padding-left: 0.12rem;

					}
				}
				.ratingText{
					display: block;
					width: 5.9rem;
					font-size:0.24rem;
					margin: 0.12rem 0 0.16rem;
					// width:0.9rem;
					line-height: 0.36rem;
					display: inline-block;
					// border: 1px solid #f00;
					// word-break:break-all;
					white-space: pre-wrap; 
					.like{
						color:@blue;
					}
					.hate{
						color:@lightGray;
					}
					
				}
				.foods{
					width: 5.9rem;
					display: flex;
					overflow: hidden;
					// border: 1px solid #000;
					span{
						color:@blue;
						font-size: 0rem;
						line-height: 0.32rem;
						vertical-align: middle;
						padding:0.06rem 0;
					}
					li{
						text-align: center;
						width: 1rem;
						border: 1px solid rgba(7,17,27,0.1);
						line-height: 0.32rem;
						color:@gray;
						vertical-align: middle;
						margin-left: 0.16rem;

						padding:0.06rem 0.12rem;
						background: #fff;
						white-space:nowrap;
						text-overflow:ellipsis; 
						-o-text-overflow:ellipsis; 
						overflow: hidden;


					}


				}

			}

		}
				
}
</style>