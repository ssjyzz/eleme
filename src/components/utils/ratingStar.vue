<template>
	<div class="star">
		<img v-for="staricon in ratingStar" :src="staricon">
	</div>	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				star:'../../../static/img/star'+this.w+'_on@'+this.h+'x.png',
				halfStar:'../../../static/img/star'+this.w+'_half@'+this.h+'x.png',
				noStar:'../../../static/img/star'+this.w+'_off@'+this.h+'x.png',
				starArr:[]
			}
		},
		props:{
			ratingsScore:{
				type:Number
			},
			w:{
				type:Number
			},
			h:{
				type:Number
			}
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings',
				'goods'
			]),
			// ratings(){

			// }
			ratingStar(){
				this.starArr = [];
				let InteagerStar = Math.floor(this.ratingsScore);
				let decimals = this.ratingsScore - InteagerStar;
				if(!decimals){
					for (let i = 0; i < InteagerStar; i++) {
						this.starArr.push(this.star);
					}
					for (let j = 0; j < 5 - InteagerStar; j++) {
						this.starArr.push(this.noStar);
					}
					return this.starArr;
				}
				if(decimals){
					for (let i = 0; i < InteagerStar; i++) {
						this.starArr.push(this.star);
					}
					this.starArr.push(this.halfStar);
					for (let j = 0; j < 4 -InteagerStar; j++) {
						this.starArr.push(this.noStar);
					}
					return this.starArr;
				}
				
			}
		},
		

	}
</script>

<style lang="less" scoped>
	.star{
		width: 100%;
		// border: 1px solid #000;
		display: flex;
		height:100%;
		// height:4rem; 
		justify-content: space-between;
		// width: 1rem;
		img{
			padding:0 2%;
			width: 18%;
			height:100%;
		}
	}
</style>