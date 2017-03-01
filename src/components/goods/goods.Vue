<template>
<div class="goods">
	<div class="menu-wrapper" ref="menuWrapper">
	   <ul>
	   		<li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="seleteMenu(index, $event)">
		   		<span class="text border-1px">
		   		  <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
		   		</span>
	   		</li>
	   	</ul>	
	</div>
	<div class="foods-wrapper" ref="foodsWrapper">
	 <ul>
		<li v-for="(item, index) in goods" class="food-list food-list-hook">
		   	<h1 class="title">{{item.name}}</h1>
		   	<ul>
		   		<li @click="selectFood(food, $event)" v-for="(food, index) in item.foods" class="food-item border-1px">
			   		<div class="icon">
			   			<img :src="food.icon" :alt="food.name" width="57" height="57">
			   		</div>
			   		<div class="content">
			   			<h2 class="name">{{food.name}}</h2>
			   			<p class="desc">{{food.description}}</p>
			   			<div class="extra">
			   				<span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
			   			</div>
			   			<div class="price">
			   				<span class="nowPrice">￥{{food.price}}</span><span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
			   			</div>
			   			<div class="cartcontrol-wrapper">
			   				<cartcontrol :food="food" @addMe="addCart"></cartcontrol>
			   			</div>
			   		</div>
		   		</li>
		   	</ul>
		</li>
	 </ul>	
	</div>
	<shopcart ref="shopcart" :select-foods="seleteFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	<food :food="selectedFood" ref="foodDetail" @addMe="addCart"></food>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart.vue';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import food from 'components/food/food.vue';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
		return {
	      goods: [],
	      listHeight: [],
	      scrollY: 0,
	      selectedFood: {}
	    };
  },
  components: {
  	shopcart,
  	cartcontrol,
  	food
  },
  created() {
  	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  	this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
      	  this._initScroll();
      	  this._calculateHeight();
        });
      }
    });
  },
  methods: {
  	_drop(target) {  // 访问shopcart子组件  使用之前，要在引用的位置绑定ref="shopcart"
  	  	this.$refs.shopcart.drop(target);// 调用子组件的drop方法
  	},
  	addCart(target) {	// 接受 cartcontrol传过来的事件     1.在引用位置绑定触发事件addMe 
  	  this._drop(target);// 将target传入父（goods）组件	// 2.在子组件触发addMe
  	},
  	_initScroll() {  // 获取dom，触发滚动
  	  this.menuScroll = new BScroll(this.$refs.menuWrapper, { // 使其可以触发click事件
  	  	click: true
  	  });
  	  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
  	  	probeType: 3,  // 监听滚动位置
  	  	click: true
  	  });
  	  this.foodsScroll.on('scroll', (pos) => { // 监听滚动事件，获取滚动数值
  	  	this.scrollY = Math.abs(Math.round(pos.y));	// 处理返回值
  	  });
  	},
  	_calculateHeight() {
  	  let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  	  let height = 0;
  	  this.listHeight.push(height);
  	  for (let i = 0; i < foodList.length; i++) {
  	  	let item = foodList[i];
  	  	height += item.clientHeight;
  	  	this.listHeight.push(height);
  	  }
  	},
  	seleteMenu(index, event) {
  	  if (!event._constructed) { // 解决PC端触发两次原生事件的问题
  	  	return;
  	  }
  	  let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  	  let el = foodList[index];
  	  this.foodsScroll.scrollToElement(el, 250);
  	},
  	selectFood(food, event) {
  		if (!event._constructed) {
  			return;
  		}
  		this.selectedFood = food;
  		this.$refs.foodDetail.show();
  	}
  },
  computed: {
  	currentIndex() {
  	  for (let i = 0; i < this.listHeight.length; i++) {
  	  	let height1 = this.listHeight[i];
  	  	let height2 = this.listHeight[i + 1];
  	  	if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
  	  		return i;
  	  	}
  	  }
  	  return 0;
  	},
  	seleteFoods() {
  	  let foods = [];
  	  this.goods.forEach((good) => {
  	  	good.foods.forEach((food) => {
  	  	  if (food.count) {
  	  	  	foods.push(food);
  	  	  }
  	  	});
  	  });
  	  return foods;
  	}
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.goods
	  display: flex
	  position: absolute
	  top: 174px
	  bottom: 46px
	  width: 100%
	  overflow: hidden
	  .menu-wrapper
	  	flex: 0 0 80px
	  	width: 80px
	  	background: #f3f5f7
	  	.menu-item
	  	  display: table /* 垂直居中 */
	  	  height: 54px
	  	  width: 56px
	  	  line-height : 14px
	  	  padding: 0 12px
	  	  &.current
  	  	  	background-color: #fff
  	  	  	position: relative
  	  	  	z-index: 10
  	  	  	margin-top: -1px
  	  	  	.text  /* current状态下 */
  	  	  	  font-weight: 700
  	  	  	  border-none()
	  	  .text  /* .menu-item 默认状态 */
	  	  	display: table-cell
	  	  	width: 56px
	  	  	vertical-align: middle
	  	  	font-weight: 200
	  	  	font-size: 12px
	  	  	border-1px(rgba(7,17,27,0.1))
	  	  	.icon
	  	  	  display: inline-block
	  	  	  vertical-align: top
	  	  	  bg-image-size(12px, 12px)
	  	  	  margin-right: 2px
	  	  	  &.decrease
	  	  	    bg-image("decrease_3")
	  	  	  &.discount
	  	  	    bg-image("discount_3")
	  	  	  &.guarantee
	  	  	    bg-image("guarantee_3")
	  	  	  &.invoice
	  	  	    bg-image("invoice_3")
	  	  	  &.special
	  	  	    bg-image("special_3")	  	    	
	  .foods-wrapper
	  	flex: 1
	  	.food-list
	  	  .title
	  	  	font-size: 12px
	  	  	color: rgb(147,153,159)
	  	  	height: 26px
	  	  	line-height: 26px
	  	  	padding-left: 14px
	  	  	background-color #f3f5f7
	  	  	border-left: 2px solid #d9dde1
	  	  .food-item
	  	  	display: flex
	  	  	margin: 18px
	  	  	padding-bottom: 18px
	  	  	border-1px(rgba(7,17,27,0.1))
	  	  	&:last-child
	  	  	  border-none()
	  	  	  margin-bottom: 0
	  	  	.icon
	  	  	  flex: 0 0 57px	
	  	  	.content
	  	  	  flex: 1	
	  	  	  margin: 2px 0 0 10px
	  	  	  color: rgb(147,153,159)
	  	  	  vertical-align: top
	  	  	  font-size: 10px
	  	  	  .name
	  	  	  	font-size: 14px
	  	  	  	color: rgb(7,17,27)
	  	  	  	line-height: 14px
	  	  	  	font-weight: 700
	  	  	  .desc
	  	  	  	margin: 8px 0
	  	  	  	line-height: 12px
			  .extra
			  	margin-top: 8px
			  	line-height: 10px
			  	.sellCount
			  	  margin-right: 12px	
			  .price
			  	line-height: 24px
			  	.nowPrice
			  	  font-size: 14px
			  	  margin-right: 8px
			  	  color: rgb(240, 20, 20)
			  	  font-weight: 700
			  	.oldPrice
			  	  text-decoration: line-through
			  	  font-weight: 700
			  .cartcontrol-wrapper
			  	position: absolute
			  	bottom: 0px
			  	right: 0	    	  	
</style>
