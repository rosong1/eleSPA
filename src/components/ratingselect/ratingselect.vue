<template>
		<div class="ratingselect">
			<div class="rating-type border-1px">
				<span @click="select(2,$event)" class="type-all" :class="{'active': selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
				<span @click="select(0,$event)" class="type-positive" :class="{'active': selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
				<span @click="select(1,$event)" class="type-negative" :class="{'active': selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
			</div>
			<div @click="toggleContent($event)" class="switch" :class="{'on': toggle}">
				<span><i class="iconfont">&#xe623;</i></span>
				<span class="text">只看有内容的评价</span>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
	data() {
		return {
			toggle: false
		};
	},
	methods: {
		select(type, event) {
			if (!event._constructed) {
				return;
			}
			this.$emit('select', type);
		},
		toggleContent(event) {
			if (!event._constructed) {
				return;
			}
			this.toggle = !this.toggle;
			this.$emit('toggleContent', this.toggle);
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((x) => {
				return x.rateType === POSITIVE;
			});
		},
		negatives() {
			return this.ratings.filter((x) => {
				return x.rateType === NEGATIVE;
			});
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"		  			
	.ratingselect
		.rating-type
			padding: 18px 0
			margin: 0 18px
			border-1px(rgba(7,17,27,0.1))
			.type-all, .type-positive, .type-negative
				padding: 8px 12px
				font-size: 12px
				line-height : 16px
				text-align: center
				margin-left: 8px
				border-radius: 2px
				color: rgb(77,85,93)
				&.active
					color: #fff
				.count
					font-size: 8px
					margin-left: 2px
			.type-all
				margin-left: 0
				background-color rgba(0,160,220,0.2)
				&.active
					background-color rgb(0,160,220)
			.type-positive
				background-color rgba(0,160,220,0.2)
				&.active
					background-color rgb(0,160,220)
			.type-negative
				background-color rgba(77,85,93,0.2)
				&.active
					background-color rgb(77,85,93)	
		.switch
			padding: 12px 18px
			color: rgb(147,153,159)
			line-height: 24px
			font-size: 0
			&.on
				span
					.iconfont
						color: #00c850
			span
				.iconfont
					display: inline-block
					vertical-align: top
					font-size: 24px
				&.text
					display: inline-block
					vertical-align: top
					font-size: 12px
					margin-left: 4px	
</style>
