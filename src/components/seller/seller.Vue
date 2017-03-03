<template>
<div class="seller" ref="seller">
	<div class="seller-content">
		<div class="overview">
			<div class="overview-top border-1px">
				<div class="o-top-left">
					<h1 class="title">{{seller.name}}</h1>
					<div class="star-wrapper"><star :size="36" :score="seller.score"></star></div>
					<div class="sell-detail">
						<span class="totol-score">(661)</span>
						<span class="sell-count">月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<div class="o-top-right" @click="toggleFavorite($event)">
					<p class="iconfont" :class="{'active': favorite }">&#xe72d;</p>
					<p class="collect-text">{{collectText}}</p>
				</div>
			</div>
			<div class="overview-bottom">
				<div class="min-price o-b-item">
					<h2 class="title">起送价</h2>
					<p class="dec">
						<span class="num">{{seller.minPrice}}</span>
						<span class="unit">元</span>
					</p>
				</div>
				<div class="delivery-price o-b-item">
					<h2 class="title">商家配送</h2>
					<p class="dec">
						<span class="num">{{seller.deliveryPrice}}</span>
						<span class="unit">元</span>
					</p>
				</div>
				<div class="delivery-time o-b-item">
					<h2 class="title">平均配送时间</h2>
					<p class="dec">
						<span class="num">{{seller.deliveryTime}}</span>
						<span class="unit">分钟</span>
					</p>
				</div>
			</div>
		</div>
		<split></split>
		<div class="bulletin">
			<div class="description border-1px">
				<h1 class="title">公告与活动</h1>
				<p class="text">{{seller.bulletin}}</p>
			</div>
			<ul class="supports-list border-1px">
				<li class="supports-item" v-for="item in seller.supports">
					<span class="icon" :class="classMap[item.type]"></span>
					<span class="text">{{item.description}}</span>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="scenery">
			<h1 class="title">
				商家实景
			</h1>
			<div class="pics-wrapper" ref="picsWrapper">
				<div class="pics">
					<img v-for="pic in seller.pics" :alt="seller.name" :src="pic" class="pic-item">
				</div>
			</div>
		</div>
		<split></split>
		<div class="infos">
			<h1 class="title">商家信息</h1>
			<ul class="infos-list">
				<li v-for="info in seller.infos" class="info-item">{{info}}</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import {saveToLocal, loadFromLocal} from 'common/js/store';
import split from 'components/split/split';
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
	data() {
		return {
			classMap: [],
			favorite: (() => {
				return loadFromLocal(this.seller.id, 'favorite', false);
			})()
		};
	},
	props: {
		seller: {
			type: Object
		}
	},
	methods: {
		_initScroll() {
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.seller, {
					scrollY: true,
					click: true
				});
			} else {
				this.scroll.refresh();
			}
			if (!this.picsScroll) {
				this.picsScroll = new BScroll(this.$refs.picsWrapper, {
					scrollX: true
				});
			} else {
				this.picsScroll.refresh();
			}
		},
		toggleFavorite(event) {
			if (!event._constructed) {
				return;
			}
			this.favorite = !this.favorite;
			saveToLocal(this.seller.id, 'favorite', this.favorite);
		}
	},
	components: {
		star,
		split
	},
	computed: {
		collectText() {
			return this.favorite ? '已收藏' : '收藏';
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		this.$http.get('/api/goods').then((response) => {
	    response = response.body;
	    if (response.errno === ERR_OK) {
	      this.goods = response.data;
	    }
	  });
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll();
		});
	},
	watch: {
		'seller'() {
			this._initScroll();
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.seller-content
			.overview
				display: flex
				flex-direction: column
				padding: 18px
				.overview-top
					display: flex
					flex: 1
					flow-direction: row
					justify-content: space-between
					padding-bottom: 18px
					border-1px(rgba(7,17,27,0.1))
					.o-top-left
						font-size: 0
						.title
							font-weight: 600
							font-size: 14px
							color: rgb(7, 17, 27)
							line-height : 14px
						.star-wrapper
							margin: 8px 8px 0 0
							display: inline-block
						.sell-detail
							display: inline-block
							vertical-align: text-bottom
							color: rgb(77,85,93)
							.totol-score
								font-size: 10px
								margin-right: 12px
								line-height: 18px
							.sell-count
								font-size: 10px
								line-height: 18px
					.o-top-right
						color: rgb(77,85,93)
						font-size: 0
						width: 40px
						text-align: center
						.iconfont
							font-size: 24px
							line-height: 24px
							&.active
								color: rgb(240,20,20)
						.collect-text	
							font-size: 10px
							line-height: 10px
							margin-top: 4px
				.overview-bottom
					display: flex
					flow-direction: row
					padding-top: 18px
					justify-content: space-between
					.o-b-item
						flex: 1
						text-align: center
						.title
							font-weight: 600
							font-size: 10px
							line-height: 10px
							color: rgb(147,153,159)
							margin-bottom: 4px
						.dec
							color: rgb(7,17,27)
							font-size: 0
							text-align: center
							.num
								font-size: 24px
								font-weight: 200
								line-height: 24px
							.unit
								font-size: 10px
					.delivery-price
						border-left: 1px solid rgba(7,17,27,0.1)
						border-right: 1px solid rgba(7,17,27,0.1)
			.bulletin
				padding: 18px
				.description
					padding-bottom: 16px
					border-1px(rgba(7, 17, 27,0.1))
					.title
						font-weight: 600
						font-size: 14px
						color: rgb(7, 17, 27)
						line-height : 14px
					.text
						font-size: 12px
						font-weight: 200
						color: rgb(240,20,20)
						line-height: 24px
						margin-top: 8px
						padding: 0 12px
				.supports-list
					font-size: 0
					.supports-item
						padding: 16px 12px
						border-1px(rgba(7, 17, 27,0.1))
						&:last-child
							padding-bottom: 0
							border-none()
						.icon
							display: inline-block
							vertical-align: top
							bg-image-size(16px, 16px)
							margin-right: 6px
							&.decrease
								bg-image('decrease_4')
							&.discount
								bg-image('discount_4')
							&.special
								bg-image('special_4')
							&.invoice
								bg-image('invoice_4')
							&.guarantee
								bg-image('guarantee_4')
						.text
							font-size: 12px
							font-weight: 200
							color: rgb(7,17,27)
							line-height: 16px
			.scenery
				padding: 18px
				overflow: hidden
				.title
					font-weight: 600
					font-size: 14px
					color: rgb(7, 17, 27)
					line-height : 14px
				.pics-wrapper	
					.pics
						margin-top: 12px
						white-space: nowrap
						min-width: 150%
						.pic-item
							margin-right: 6px
							bg-image-size(120px, 90px)
							border-radius: 2px
							&:last-child
								margin-right: 0
			.infos
				padding: 18px
				font-size: 0
				.title
					font-weight: 600
					font-size: 14px
					color: rgb(7, 17, 27)
					line-height : 14px
					padding-bottom: 12px
					border-1px(rgba(7, 17, 27,0.1))
				.infos-list
					.info-item
						padding: 16px 12px
						border-1px(rgba(7, 17, 27,0.1))
						font-size: 12px
						font-weight: 200
						color: rgb(7, 17, 27)
						line-height: 16px
						&:last-child
							border-none()
							padding-bottom: 0					
</style>
