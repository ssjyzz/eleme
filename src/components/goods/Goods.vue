<template>
<!-- 左淡入 左淡出 -->
<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
	<div class="goods">
	<div class="goodsBox">
		<!-- 左边菜单 -->
		<div class="leftMenu" ref= "leftMenuWrapper" >
			<ul>
				<li v-for="(menu,index) in goods" @click="leftMenuScrollToListMenu(index)"
				    :class="{'current':index === currentIndex}">
					<span>
						<img v-if="menu.name.indexOf('热销')!=-1" :src="menuIcon[1]" >
						<img v-if="menu.name.indexOf('推荐')!=-1" :src="menuIcon[2]" >
						<img v-if="menu.name.indexOf('惠')!=-1" :src="menuIcon[0]" >
						<img v-if="menu.name.indexOf('精')!=-1" :src="menuIcon[3]" >
						<!-- <img v-if="addIcon" :src="addIcon"> -->
						{{menu.name}} 
					</span>
				</li>
			</ul>
		</div>
		<!-- 右边列表 -->
		<div class="rightList" ref = "rightListWrapper">
			<ul>
				<li v-for="(menu,gI) in goods" class="bigLi" >
					<p><span></span>{{menu.name}}</p>
					<ul>
						<li v-for="(list, fI) in menu.foods" class="smallLi" >
							<img :src="list.icon" @click="detailNowfood(gI,fI,list,$event)">
							<ul>
								<li>{{list.name}}</li>
								<li>{{list.description}}</li>
								<li>月售{{list.sellCount}}份  好评率{{list.rating}}%</li>
								<li class="listPrice"> ￥{{list.price}}<span v-if="list.oldPrice"> ￥{{list.oldPrice}} </span>
								<h-add-minus :list="list" class="addMinusBtns"></h-add-minus>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>	
		</div>
	</div>
	<!-- 弹出商品详情 -->
	<foodDetail class="foodDetail" :foods = "foods"></foodDetail>
	<!-- 购物车组件 -->
	<h-shoppingCart :Goods = "goods"></h-shoppingCart>
	
</div>
</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import ShoppingCart from '../utils/ShoppingCart.vue'
	import addMinusBtn from '../utils/add-Minus-Btn.vue' 
	import foodDetail from '../detail/foodDetail.vue'
	import star from '../utils/ratingStar.vue'
	export default {
		data(){
			return {
				heights:[],
				Y:"",
				nowIndex:0,
				gI:0,
				fI:0,
				foods:{},
				menuIcon : [
					'../../../static/img/special_2@2x.png',//特
					'../../../static/img/fire_3@3x.png',//火
					'../../../static/img/zan3@3x.png',//赞
					'../../../static/img/jing3@3x.png',
				]
				
			}
		},
		created(){
			// console.log(this.$nextTick);
			this.$store.dispatch('getGoods');
			this.$nextTick( () => {
					// this._initleftmenu();
					// this._initrightlist();
					// this._initHeights();
					// this.detailNowfood(this.gI,this.fI,this.list);

			});
		},
		mounted(){

		},
		components:{
			'h-shoppingCart':ShoppingCart,
			'h-add-minus':addMinusBtn,
			'foodDetail':foodDetail,
			'h-star':star
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods',
				'detailSellerInfo'
			]),
			
			currentIndex(){
				for (let i = 0; i < this.heights.length; i++) {
					let h1 = this.heights[i];
					let h2 = this.heights[i+1];
					if( !h2 || this.Y >= h1 && this.Y < h2){
						return i;
						}
					}
					return 0;
				},
			},
			
		watch:{
			goods(){
				this.$nextTick( () => {
					this._initleftmenu();
					this._initrightlist();
					this._initHeights();
					// this.addIcon();
				});
			}
		},
		methods:{
			rest(){
				console.log('rest');
			},
			detailNowfood(gIndex,fIndex,list,e){
				this.$store.dispatch('detailNowfood');
				this.foods = list;
				this.gI = gIndex;
				this.fI = fIndex;
				console.log("hhhhhhhhh")
				// console.log(this.gI,this.fI);

			},
			

			_initleftmenu(){
				this.leftMenuWrapper = new BScroll(this.$refs.leftMenuWrapper,{
					click:true,
					snap:true,
					probeType:3,
				});
			},
			_initrightlist(){
				this.rightListWrapper = new BScroll(this.$refs.rightListWrapper,{
					click:true,
					probeType:3,
					snap:true
				});
				this.rightListWrapper.on('scroll',(pos) => {
					
					// console.log(this.heights);
					this.Y = Math.abs(Math.round(pos.y));
					
				});


			},
			_initHeights(){
				let height = 0;
				let heights = [];
				heights.push(height);
				$(".bigLi").each(function(i,item){
					height += item.clientHeight;
					heights.push(height);
				});
				this.heights = heights;
			},
			// 点左联右 （菜单联列表）
			leftMenuScrollToListMenu(index){
				// console.log(index);
				/*
					scrollToElement(el, time, offsetX, offsetY, easing)
					滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数
				*/
				this.rightListWrapper.scrollToElement($(".bigLi")[index],200);
				// $(".leftMenu").find("li").removeClass("current").eq(index).addClass("current");
			}
			

		}
	}
</script>

<style lang="less" scoped>
	@orange:rgb(255,153,0);
	@blue:#3190e8;
	.goods{
		background: #f3f5f7;
		font-size: 0.24rem;
		width: 100%;
		z-index:1;
		border-top: 1px solid #eee;
		position: fixed;
		top:3.49rem;
		bottom:0rem;
		.goodsBox{
			font-size: 0.24rem;
			width: 100%;
			// border: 1px solid #000;
			position: absolute;
			z-index: 3;
			top:0rem;
			bottom:1.1rem;
			display: flex;
			overflow: hidden;
			.leftMenu{
				// border: 1px solid #000;
				flex:0 0 1.6rem;
				width: 1.6rem;
				
				& > ul li{
					width: 1.12rem;
					height: 1.08rem;
					display: table;
					text-align: center;
					padding:0 0.24rem 0;
					// word-break:break-all;
					
					& span{
						border-bottom: 1px solid #eee;
						display: table-cell;
						vertical-align: middle;
						
					}
				}
				img{
					width:20%;
					height:20%;
				}
			}
			.rightList{
				// border: 1px solid #000;
				flex:1;
				& .bigLi{
					// border: 1px solid #000;
					background: #fff;
					p{	
						height: 0.52rem;
						background: #f3f5f7;
						font-size: 0.24rem;
						// line-height: 0.52rem;
						color:rgb(147,153,159);	
						// border: 1px solid #000;
						// padding: 0.15rem;
						& span{
							display: inline-block;
							vertical-align: middle;
							height: 0.52rem;
							width:0.05rem;
							background: #d9dde1;
							margin-right: 0.28rem;
						}
					}
					.smallLi{
						
						display: table-cell;
						border-bottom: 1px solid #eee;
						// border: 1px solid red;
						display: flex;
						padding:0.36rem;
						& img{
							flex:0 0 1.5rem;
							// border: 1px solid green;
							width:1.5rem;
							height:1.5rem;
							border-radius: 0.1rem;
						}
						& ul{
							margin-left: 0.2rem;
							display: flex;
							flex-direction: column;
							
							// border: 1px solid #000;
							& li{
								font-size: 0.2rem;
								color:rgb(147,153,159);	
								line-height: 0.2rem;
								margin-bottom: 0.16rem;
							}
							& li:nth-child(1){
								font-size: 0.28rem;
								color:rgb(7,17,27);
								line-height: 0.28rem;
							}
							& li:last-child{
								font-size: 0.28rem;
								color:rgb(240,20,20);
								line-height: 0.48rem;
								font-weight: 700;
								margin-bottom: 0;
								// border: 1px solid #000;
								display: flex;
								justify-content: space-between;
								width: 3.5rem;
								span{
									display: inline-block;
									font-size:0.2rem;
									color:rgb(147,153,159);
									margin: 0 0.5rem 0 0.16rem;
									// border: 1px solid #000;
									// padding-top: -3rem;
									text-decoration:line-through;
								}
								
							}
							
						}
					}
				}
			}
		}
		.current{
			background:#fff;
			color:@blue;

		}
		.normal{
			background:#f3f5f7;

		}
		.addMinusBtns{
			// width: 1.9rem;
			// display: inline-block;
			// margin-left:0.9rem;
			// margin-bottom: -3rem;
			// z-index: 666;
		}

	}
</style>