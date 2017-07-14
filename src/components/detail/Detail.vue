<template>
	
<transition enter-active-class="animated rotateInUpLeft" leave-active-class="animated rotateOutDownLeft">
	<div class="sellerInfo" v-show="detailSellerInfo" ref="sellerInfoWapper">
	<ul>
		<!-- <li>
			<span  class="backBtn icon-arrow_lift" @click="hideSellerInfo"></span>
		</li> -->
		<li class="sellerHeader">
			<ul>
				<li class="sellerName">{{seller.name}}</li>
				<li class="sellerScoreAndCount">
					
					<h-star class="star" :ratingsScore = "seller.score" :w="36" :h="3"></h-star>
					<span class="sellScore">({{seller.score}})分</span>
					<!-- <h-star :ratings = "4"></h-star> -->
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</li>
				<li class="sellerNumber">
					<ul>
						<li  class="sellminPrice">
							<div>起送价</div>
							<div>{{seller.minPrice}}<span>元</span> </div>
						</li>
						<li class="sellDeliveryPrice">
							<div>商家配送</div>
							<div>{{seller.deliveryPrice}}<span>元</span> </div>
						</li>
						<li class="sellDeliveryTime">
							<div>平均配送时间</div>
							<div>{{seller.deliveryTime}}<span>元</span> </div>
						</li>
					</ul>
				</li>
				
			</ul>
		</li>
		<li class="supportAndBulletin">
			<ul>
				<li class="sellerSupportTitle">
					<span class="line"></span>
					<span class="titleTxt">优惠信息</span>
					<span class="line"></span>
				</li>
				<li class="sellerSupport">
					<div class="iconArr">
						<img v-for="icon in iconArr" :src="icon">
					</div>
					<div class="support">
						<li  v-for="support in seller.supports">	
							{{support.description}} <br>
						</li>
					</div>
				</li>
				<li class="sellerBulletinTitle">
					<span class="line"></span>
					<span class="titleTxt">商家公告</span>
					<span class="line"></span>
				</li>
				<li class="sellerBulletin">        {{seller.bulletin}}</li>
				
			</ul>
		</li>
		<li class="sellerPhoto">
			<div class="sellerSupportTitle">商家实景</div>
			<div class="sellerPic" ref="sellerPicWapper">
				<ul>
					<li v-for="pic in seller.pics">
						<img :src="pic">
					</li>
				</ul>
			</div>
		</li>
		<li class="seller-Info">
			<div class="sellerSupportTitle">商家信息</div>
			<ul>
				<li class="sellerIf">
					<ul>
						<li v-for="info in seller.infos">
							{{info}}
						</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>

	</div>
</transition>	
	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import BScroll from 'better-scroll'
	import Star from '../utils/ratingStar.vue'
	export default{
		data(){
			return {
				iconArr : [
					'../../../static/img/decrease_3@3x.png',
					'../../../static/img/discount_3@3x.png',
					'../../../static/img/special_3@3x.png',
					'../../../static/img/invoice_3@3x.png',
					'../../../static/img/guarantee_3@3x.png'
				],
				Y:null
			}
		},
		components:{
			'h-star':Star,
		},
		// created(){
		// 	this.$nextTick( () => {
		// 			this._sellerInfoWapper();
		// 			this._sellerPicWapper();
		// 			this._getNowY();
		// 	});
		// },
		computed:{
			...mapGetters([
				'detailSellerInfo',
				'seller',
				'ratings',
				'goods',
				'showSellerLogo'
			]),
			scrollY(){
					return this.Y;
			}
		},
		methods:{
			hideSellerInfo(){
				this.$store.dispatch('hideSellerInfo');
				// this.$store.dispatch('showdetailSellerInfo');
				$("#avatar").animate({
					left:'0',
					width:'1.28rem',
					height:'1.28rem'
				}, 1000);
				$(".rightBox").animate({
					opacity:'1'
				}, 1000);
				$(".showSellerInfo").animate({
					opacity:'1'
				}, 1000);
			},
			_sellerInfoWapper(){
				this.sellerInfoWapper = new BScroll ( this.$refs.sellerInfoWapper ,{
					click : true,
					hasVerticalScroll:true,
					probeType:3,

				});		
				this.sellerInfoWapper.on('scrollEnd',(pos) => {
					this.Y = pos.y;
					this.showSellerLogo = false;
					if(this.Y <= -20 ){
						$("#avatar").animate({
							opacity:'0'
						},50);
						// return;
						$(".sellerInfo").animate({
							top:'0'
						},50);
						
						
					}
					if(this.Y > -20 ){
						$("#avatar").animate({
							// left:'0',
							// width:'1.28rem',
							// height:'1.28rem',
							opacity:'1'
						},50);
						$(".sellerInfo").animate({
							top:'1.6rem'
						},50);
						// return;

				}
					
					// console.log(this.showSellerLogo);
				});
				// console.log(this.sellerInfoWapper);
			},
			// _getNowY(){
			// 	if(this.scrollY < 0){
			// 		$("#avatar").animate({
			// 			opacity:'0.5'
			// 		}, 1000);
			// 		// console.log(this.scrollY);
					
			// 	}
			// 	if(this.scrollY >= 0){
			// 		$("#avatar").animate({
			// 			opacity:'1'
			// 		}, 1000);
			// 		// console.log(this.scrollY,"tiana ");
			// 	}
			// },
			_sellerPicWapper(){
				this.sellerPicWapper = new BScroll ( this.$refs.sellerPicWapper ,{
					click : true,
					probeType:3,
					scrollX:true
					// hasHorizontalScroll:true,
					
				});

				// console.log(this.sellerInfoWapper);
			}
		},
		watch:{
			seller(){

				this.$nextTick( () => {
					setTimeout(()=>{
						if(!this.sellerInfoWapper){
						this._sellerInfoWapper();
						this._sellerPicWapper();
						// this.scrollY;
						// this._getNowY();
					
					}else{
						this.sellerInfoWapper.refresh;
					}
				}, 1000);
					
					
				});

				
			}
		},

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
	.sellerInfo{
		top:1.6rem;
		left:0;
		position:fixed;
		// padding:1.28rem 0.72rem 0;
		z-index: 5;
		background:#f3f5f7;
		color:@black;
		font-size: 0.28rem;
		overflow:hidden;
		width: 100%;
		bottom:0;
		.backBtn{
			position: fixed;
			// z-index: 9999;
			top:0.16rem;
			width: 0.5rem;
			color:@black;
			font-size: 0.4rem;
			// border: 1px solid #000;
		}
		.sellerHeader{
			background:#fff;
			text-align: center;
			padding-top: 1rem;
			border-bottom: 1px solid @bordercolor;
			// border: 1px solid #000;
			.sellerName{
				font-size: 0.32rem;
				font-weight: 700;
				padding-bottom: 0.32rem;
			}
			.sellerScoreAndCount{
				.star{	
					height:0.6rem;
					margin:0 auto 0.16rem;
					width: 4.4rem;
					text-align: center;
					// border: 1px solid #000;
				}
				.sellScore{
					color:@gray;
					font-size: 0.2rem;
				}
				.sellCount{
					font-size: 0.16rem;
					color:@darkGray;
					padding-bottom: 0.56rem;
				}
			}
			.sellerNumber > ul{
				padding:0.36rem 0;
				display: flex;
				justify-content: space-between;
				
				& > li{
					// border: 1px solid #000;
					text-align: center;
					padding:0 0.8rem;
					&:nth-child(2){
						border-left: 1px solid @gray;
						border-right: 1px solid @gray;
					}
					& div:first-child{
						// color: red;
						font-size: 0.2rem;
						color:@gray;
						padding-bottom: 0.08rem;
						line-height: 0.2rem;
					}
					& div:last-child{
						// color: red;
						font-size: 0.48rem;
						color:@black;
						font-weight: 200;
						line-height: 0.48rem;
						span{
							font-weight:normal;
							font-size: 0.2rem;

						}
					}
				}		
			}
		}
		.supportAndBulletin{
			margin-top: 0.32rem;
			background: #fff;
			text-align: center;
			padding: 0.36rem;
			border-top: 1px solid @bordercolor;
			border-bottom: 1px solid @bordercolor;
			& > ul > li{
				padding: 0.24rem 0;
			}
			.line{
				display: inline-block;
				width: 2.24rem;
				height:0.072rem;
				background: #eee;
				vertical-align: middle;
			}
			.titleTxt{
				padding:0 0.24rem;
				font-size: 0.28rem;
				font-weight: 700;
			}
			.sellerSupport{
				display: flex;
				text-align: left;
				.iconArr{
					display: flex;
					flex-direction: column;
					vertical-align: middle;
					padding-left:0.36rem;
					img{
						width:0.32rem;
						height:0.32rem;
						padding:0 0.12rem 0.24rem 0.32rem;

					}
				}
				.support{
					li{
						// border: 1px solid #000;
						font-weight: 200;
						font-size: 0.24rem;
						line-height: 0.24rem;
						padding:0.07rem 0 0.24rem 0;
					}
				}

			}
			.sellerBulletin{
				padding-left: 0.6rem;
				white-space: pre-wrap;
				width: 80%;
				font-size: 0.24rem;
				line-height: 0.48rem;
				text-align: left;
			}

		}

		.sellerPhoto{
			border-bottom: 1px solid @bordercolor;
			border-top: 1px solid @bordercolor;
			margin-top: 0.32rem;
			background: #fff;
			// width:80rem;
			// height:2.6rem;
			padding:0.36rem;
			// position: fixed;
			div{
				// width:80rem;
				padding-bottom: 0.24rem;
				overflow:hidden;
			}
			ul{
				width: 10rem;
				// overflow:hidden;
				// border: 1px solid #000;
				li{
					display: inline-block;
					padding-right:0.12rem;
					img{
						width: 2.4rem;
						height:1.8rem;
					}
				} 
			}
		}
		.seller-Info{
			// border-bottom: 1px solid @bordercolor;
			border-top: 1px solid @bordercolor;
			margin-top: 0.32rem;
			background: #fff;
			padding:0.36rem 0.36rem 0 0.36rem;
			// border: 1px solid #000;
			.sellerSupportTitle{
				width:12rem;
				padding-bottom: 0.24rem;
				overflow:hidden;
			}
			.sellerIf{
				padding:0.32rem 0.24rem;
				border-top: 1px solid @bordercolor;
				}
			
			li{
				padding:0.32rem 0.24rem;
				font-size: 0.24rem;
				border-bottom: 1px solid #eee;
			}
		}


	}
</style>