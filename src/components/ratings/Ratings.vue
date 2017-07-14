<template>
<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
<div class="ratings">
	<div class="ratingsBox hidetext">
		<div class="ratingsHeader">
			<ul class="leftBox">
				<li class="sellerScore">{{seller.score}}

				</li>
				<li class="scoreTxt">综合评分</li>
				<li class="sellerRank">高于周边商家 {{seller.rankRate}}%</li>
			</ul>
			<ul class="rightBox" >
				<li>
					<span>服务态度</span>
					<h-star class="star" :ratingsScore = "seller.serviceScore" :w="24" :h="2"></h-star>
					<span>{{seller.serviceScore}}</span>
				</li>
				<li>
				<span>菜品评价</span>
					<h-star class="star" :ratingsScore = "seller.foodScore" :w="24" :h="2"></h-star>
					<span>{{seller.foodScore}}</span>
				</li>
				<li>送达时间 <span>{{seller.deliveryTime}}分钟</span></li>
			</ul>
		</div>
		<div class="ratingsBody">
			<ul class="filterBtns">
				<li :class="{current:select=='all'?true:false,like:select!='all'?true:false}" @click="select='all'">全部</li>
				<li :class="{current:select=='like'?true:false,like:select!='like'?true:false}" @click="select='like'">满意</li>
				<li :class="{currentHate:select=='hate'?true:false,hate:select!='hate'?true:false}" @click="select='hate'">不满意</li>
			</ul>
			<ul class="selectRatings"  >
				<li @click="hideNoTxt=!hideNoTxt">
				<span :style="{color:hideNoTxt==true?'#3190e8':'gray',fontSize:'0.3rem'}">
					<span  class="icon-check_circle"></span>
					只看有内容的评价
				</span>
				</li>
			</ul>
			<ul class="ratingsList" >
				<li class="ratingLi" v-for="(rating,index) in ratings" v-show="selectList(rating,select,hideNoTxt)">
					<img :src="rating.avatar" >
					<ul class="rightUl">
						<li class="username">{{rating.username}}</li>
						<li class="ratingScore">
							<h-star class="star" :ratingsScore = "rating.score" :w="24" :h="2"></h-star>
							<span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
						</li>
						<li class="ratingText"> 
						<span class="like icon-thumb_up" v-show="rating.score>=3"></span>
						<span class="hate icon-thumb_down" v-show="rating.score<3"></span> 
						<span>{{rating.text}}</span> 
						</li>
						<ul class="foods ">
							<span class="icon-thumb_up"></span>
							<li v-for="food in rating.recommend">{{food}} </li>
							 
						 </ul>
					</ul>
				</li>

			</ul>
		</div>
	</div>
</div>
</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	// import ShoppingCart from '../utils/ShoppingCart.vue'
	import Star from '../utils/ratingStar.vue'
	export default {
		data(){
			return {
				hideNoTxt : false,
				select:'all'
			}
		},
		created(){
			this.$store.dispatch('getRatings');
			this.$store.dispatch('getSeller');
		},
		components:{
			'h-star':Star

		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods',
				'detailSellerInfo'
			]),
			
		},
		watch:{
			
		},
		methods:{
			selectList(rating,select,hideNoTxt){
				if (this.select =='all'){
					if(this.hideNoTxt==false){
						return rating.score<=5;
					}
					if(this.hideNoTxt==true){
						return rating.score<=5 && rating.text!='';
					}
					
				}

				if (this.select =='like'){
					
					if(this.hideNoTxt==false){
						return rating.score>=3;
					}
					if(this.hideNoTxt==true){

						return rating.score>=3 && rating.text!='';
					}
				}
				if (this.select =='hate'){
					
					if(this.hideNoTxt==false){
						return rating.score<3;
					}
					if(this.hideNoTxt==true){

						return rating.score<3 && rating.text!='';
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
	.hidetext{
		white-space:nowrap; 
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis; 
		overflow: hidden;
	}
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
	.ratings{

		background: #f3f5f7;
		font-size: 0.24rem;
		width:7.39rem;
		border-top: 1px solid  #f5f5f5;
		position: fixed;
		z-index: 1;
		top:3.48rem;
		left:0.05rem;
		bottom:0rem;
		overflow: hidden;
		.ratingsBox{
			background: #f3f5f7;
			position: 666;
			font-size: 0.24rem;
			width: 7.49rem;
			// border: 1px solid #000;
			position: absolute;
			z-index: 2;
			top:0rem;
			bottom:0rem;
			overflow-y: scroll;
			overflow-x: hidden;
			.ratingsHeader{
				// width:100%;
				height:2.04rem;
				background: #fff;
				// border: 1px solid #000;
				margin-bottom: 0.3rem;
				display: flex;
				.leftBox{
					// border: 1px solid #000;
					flex:0 0 2.75rem;
					margin: 0.36rem 0.48rem 0.36rem 0;
					border-right: 1px solid #eee;
					text-align: center;
					& li{ margin-bottom: 0.12rem;}
					.sellerScore{
						font-size:0.48rem;
						color:@orange;
						line-height: 0.56rem;
					}
					.scoreTxt{
						color:@black;
						font-size: 0.24rem;
						line-height: 0.24rem;
						margin-bottom: 0.16rem;
					}
					.sellerRank{
						font-size:0.20rem;
						color:@gray;
						line-height: 0.20rem;
					}

				}
				.rightBox{
					padding: 0.36rem 0.48rem 0.36rem 0;
					flex:1;
					font-size: 0.24rem;
					line-height: 0.36rem;
					color:@black;
					& li{ 
						margin-bottom: 0.16rem;
						display: flex;
						& span:last-child{
							color:@orange;
							font-size: 0.24rem;
						}
						&:first-child{
							color:@black;
							// margin-right: 0.24rem;
						}
						&:last-child{
							// color:@orange;
							span{
								padding-left:0.24rem;
								color: @gray;
							}
						}
					}
					// 评分星星组件
					.star{
						// line-height: 0.24rem;
						padding:0.03rem 0.24rem 0;
						// border: 1px solid #000;
						width: 2rem;
						height:0.28rem;
						// height:0.24rem; 
					}
					// border: 1px solid #000;

				}
			}
			.ratingsBody{
				overflow: hidden;
				width: 7.49rem;
				// height:7.4rem;
				background: #fff;
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
								padding-right: 0.32rem;
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
		}
		
	}

</style>