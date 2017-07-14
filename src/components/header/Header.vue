<template>
	<div class="header hidetext">
		<div class="sellerBox">
			<span  class="backBtn icon-arrow_lift" v-show="detailSellerInfo" @click="hideSellerInfo"></span>
			<img id="bgAvatar"  class="blur" :src="seller.avatar" >
			<img id="avatar" v-show="showSellerLogo" @click="showSellerInfo" :src="seller.avatar">
			<ul class="rightBox" v-if="seller.supports">
				<li>
					<img src="../../../static/img/brand@2x.png">
					<b>{{seller.name}}</b>
				</li>
				<li>
					{{seller.description}}/{{seller.deliveryTime}}分钟送达/配送费{{seller.deliveryPrice}}￥
				</li>
				<li>
					<img src="../../../static/img/decrease_1@2x.png">
					{{seller.supports[0].description}}
				</li>
			</ul>
			
		</div>
		<div @click="showSellerInfo" class="showSellerInfo">
				<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="bottomBox">
			<img src="../../../static/img/bulletin@2x.png">
			<span @click="showBulletin">{{seller.bulletin}}</span>
		</div>
		<showDetailSellerInfo></showDetailSellerInfo>
	</div>
</template>

<script type="text/javascript">
	import { mapGetters } from 'vuex'
	import showDetailSellerInfo from '../detail/Detail.vue'
	export default {
		created(){
			this.$store.dispatch('getSeller');
		},
		components:{
			showDetailSellerInfo
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods',
				'detailSellerInfo',
				'showSellerLogo'
			]),
		},
		methods:{
			showBulletin(){
				// $(".bottomBox").animate({
				// 	height:'2rem',
				// 	'white-space':'nowrap',
				// 	// top:'-2rem',
				// }, 1000);
				// $(".header").animate({
				// 	height:'4rem',
				// 	// top:'-2rem',
				// }, 1000);
				
			},
			showSellerInfo(){
				// this.$store.dispatch('hideSellerInfo');
				this.$store.dispatch('showdetailSellerInfo');
				$("#avatar").animate({
					left:'2.5rem',
					width:'2rem',
					height:'2rem'
				}, 1000);
				$(".rightBox").animate({
					opacity:'0'
				}, 1000);
				
				$(".showSellerInfo").animate({
					opacity:'0'
				}, 1000);
				
			},
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
	.hidetext{
		white-space:nowrap; 
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis; 
		overflow: hidden;
	}
	.blur{
		-webkit-filter: blur(8px); /* Chrome, Opera */
        -moz-filter: blur(8px);
        -ms-filter: blur(8px);    
        filter: blur(8px); 
	}
	.header{
		position: absolute;
		z-index: 4;
		width:100%;
		height: 2.69rem;
		// border:1px solid #000;
		color:#fff;
		.backBtn{
			position: fixed;
			// z-index: 9999;
			top:0.16rem;
			width: 0.5rem;
			color:#fff;
			font-size: 0.4rem;
			// border: 1px solid #000;
		}
		.sellerBox{
			width: 100%;
			padding-top: 0.48rem;
			background:rgba(101,182,168,0.5);
			// border:1px solid #000;
			display:flex;
			padding-bottom: 0.92rem;
			& > #bgAvatar{
				width: 5rem;
				height: 5rem;
				position: absolute;
				z-index: -999;
				top:-0.6rem;
				left:1rem;

			}
			& > #avatar{
				position: relative;
				z-index: 8;
				display: inline-block;
				margin:0 0.32rem 0 0.48rem;
				width: 1.28rem;
				height:1.28rem;
				// border: 1px solid #000;
				border-radius:0.2rem;
			}
			.rightBox{
				margin:0.04rem 0;
				list-style: none;
				// border:1px solid #ccc;
				li:nth-child(1){
					font-size:0.32rem;
					font-weight: bold;
					margin-bottom:0.14rem;
					& > img{
						width: 0.7rem;
						vertical-align: middle;
					}
				}
				li:nth-child(2){
					font-size:0.24rem;
					margin-bottom:0.13rem;
				}
				li:nth-child(3){
					height:0.24rem;
					font-size:0.24rem;
					line-height: 0.24rem;
					& > img{
						width: 0.3rem;
						vertical-align: middle;
					}
				}
			}
			
		}
		& > .bottomBox{
			width:100%;
			height:0.56rem;
			background:rgba(0,0,0,0.2);
			line-height: 0.56rem;
			font-size: 0.2rem;
			margin-top: -0.56rem;
			// position: absolute;
			// z-index: 8;
			// bottom:0;
			// left:0;
			// border: 1px solid #000;
			span{
				display: inline-block;
				// border: 1px solid #000;
				margin-left: 0.08rem;
				width: 80%;
				height: 100%;
				vertical-align: middle;
				white-space:nowrap; 
				text-overflow:ellipsis; 
				-o-text-overflow:ellipsis; 
				overflow: hidden;
			}
			img{
				margin-left:0.24rem;
				vertical-align: middle;
				width:0.5rem;
				// border: 1px solid #000;
			}
		
		}
		.showSellerInfo{
			position: absolute;
			top: 1.5rem;
			right:0.24rem;
			width: 0.8rem;
			height: 0.48rem;
			border-radius:0.24rem;
			background:rgba(0,0,0,0.2);
			font-size:0.4rem;
			text-align: center;
			line-height: 0.55rem;
		}
	}
	
</style>