<template>
<div class="ratings" ref="ratingsList">
	<div class="ratings-wrapper">
		<div class="overview" >
			<div class="overview-left">
				<h1 class="total-score">{{seller.score}}</h1>
				<p class="desc">综合评分</p>
				<p class="compare">高于周边商家{{seller.rankRate}}%</p>
			</div>
			<div class="overview-right">
				<div class="service-score right-item">
					<span class="text">服务态度</span>
					<div class="star-wrapper"><star :size="36" :score="seller.serviceScore"></star></div>
					<span class="score">{{seller.serviceScore}}</span>
				</div>
				<div class="food-score right-item">
					<span class="text">商品评分</span>
					<div class="star-wrapper"><star :size="36" :score="seller.foodScore"></star></div>
					<span class="score">{{seller.foodScore}}</span>
				</div>
				<div class="delivery-time right-item">
					<span class="text">送达时间</span>
					<span class="time">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>	
		<split></split>
		<ratingselect @select="getType" :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @toggle-content="getOnlyContent"></ratingselect>
		<div class="ratings-list">
			<ul>
				<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
					<div class="item-left">
						<img width="28" height="28" class="avatar" :src="rating.avatar" :alt="rating.username">
					</div>
					<div class="item-right">
						<div class="rating-r-header">
							<span class="username">{{rating.username}}</span>
							<span class="rate-time">{{formatTime(rating.rateTime)}}</span>
						</div>
						<div class="rating-r-md">
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
							</div>
							<span class="item-delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							<p class="text">{{rating.text}}</p>
						</div>
						<div class="rating-r-footer">
							<span class="icon">
								<i class="iconfont support" v-if="rating.rateType===0">&#xe60b;</i>
								<i class="iconfont" v-if="rating.rateType===1">&#xe60e;</i>
							</span>
							<span class="re-item" v-for="item in rating.recommend" v-show="rating.recommend && rating.recommend.length">
								{{item}}
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star.vue';
import {formatTime} from 'common/js/date';
import split from 'components/split/split.vue';
import ratingselect from 'components/ratingselect/ratingselect.vue';
import BScroll from 'better-scroll';

const ALL = 2;
const ERR_OK = 0;

export default {
	data() {
		return {
			selectType: ALL,
			onlyContent: false,
			ratings: []
		};
	},
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		star,
		split,
		ratingselect
	},
	methods: {
		getType(type) {
			this.selectType = type;
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},
		getOnlyContent(onlyContent) {
			this.$nextTick(() => {
				this.scroll.refresh();
			});
			this.onlyContent = onlyContent;
			console.log(1);
		},
		needShow(type, text) {
			if (this.onlyContent && !text) {
				return false;
			}
			if (this.selectType === ALL) {
				return true;
			} else {
				return type === this.selectType;
			}
		},
		formatTime(time) {
			return formatTime(time);
		}
	},
	created() {
		this.$http.get('/api/ratings').then((res) => {
			if (res.body.errno === ERR_OK) {
				this.ratings = res.body.data;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.ratingsList, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			}
		});
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 46px
		width: 100%
		overflow: hidden
		.ratings-wrapper
			.overview// width:750 height: 212
				display: flex
				padding: 4.8% 0
				.overview-left
					flex: 0 0 36.7%
					width: 36.7%
					text-align: center
					padding: 1.6% 0
					border-right: 1px solid rgba(7,17,27,0.1)
					.total-score
						font-size : 1.5em
						color: rgb(255,153,0)
						line-height: 1.17
						margin-bottom: 2.83%
					.desc
						font-size: 0.75em
						color: rgb(7,17,27)
						line-height: 1
						margin-bottom: 2.83%
					.compare
						font-size: 0.625em
						color: rgba(7,17,27,0.3)
						line-height: 1
				.overview-right
					flex: 0 0 63.3%
					width: 63.3%
					padding: 0 6.4%
					margin-top: 1%
					@media only screen and (max-width: 320px)
						padding: 0 2.5%
					.right-item
						margin-bottom: 2.13%
						line-height: 1.5
						font-size: 0.75em
						&:last-child
							margin-bottom: 0
						.text
							color: rgb(7,17,27)
							margin-right: 3.2%
						.score
							margin-left: 3.2%
							color: rgb(255,153,0)
						.time
							color: rgb(147,153,159)
						.star-wrapper
							display: inline-block
							vertical-align: sub		
			.ratings-list
				display: flex
				padding: 0 18px
				.rating-item
					display: flex
					padding: 18px 0
					border-1px(rgba(7,17,27,0.1))
					.item-left
						.avatar
							flex: 0 0 28px
							border-radius: 50%
							margin-right: 12px
					.item-right
						position: relative
						flex: 1
						display: flex
						flex-direction: column
						.rating-r-header
							display: flex
							justify-content: space-between
							font-size: 10px
							line-height: 12px
							margin-bottom: 4px
							.username
								color: rgb(7,17,27)
							.rate-time
								color: rgb(147,153,159)
								font-weight: 200
						.rating-r-md		
							.star-wrapper
								margin-bottom: 12px
								display: inline-block
							.item-delivery-time
								font-size: 10px
								color: rgb(147,153,159)
								font-weight: 200
								line-height: 12px
							.text
								font-size: 12px
								color:rgb(7,17,27)
								font-weight: 200
						.rating-r-footer
							margin-top: 8px
							word-wrap: break-word
							.icon
								font-size: 12px
								line-height: 16px
								color: rgb(183,187,191)
								margin-right: 8px 
								.support								
									color: rgb(0,160,220)
							.re-item
								border: 1px solid rgba(7,17,27,0.1)
								border-radius: 2px
								background-color #fff
								font-size: 9px
								color: rgb(147,153,159)
								padding: 0 6px
								margin-right: 8px
								text-overflow: ellipsis
								&:last-child
									margin-right: 0
</style>
