// components/goods/goods.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    type: ["pop", "news", "sell"],
    goodsList: {},
    activeGoodsList:[],
    activeGoodsType: "pop",
    goodsId: 0,
    tabs: ['流行', '新款', '精选'],
    currentIndex: 0
  },
  lifetimes: {
    created(){
    },
    attached(){
      this.data.type.forEach(type => {
        let goodsType = "goodsList." + type
        wx.request({
          url: 'http://www.cachimon.top/mogujie/' + type + '.json',
          method: "GET",
          success: (res) => {
            let result = res.data.data
            result.forEach(item => {
              item.id = this.data.goodsId++
              item.chosen=false
              item.amount = 1
            })
            this.setData({
              [goodsType]: result
            })
            if(type === this.data.activeGoodsType){
              this.setData({
                activeGoodsList: result
              })
            }
          }
        })
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
      let index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index,
        activeGoodsType: this.data.type[index],
        activeGoodsList: this.data.goodsList[this.data.activeGoodsType]
      })
      this.setData({
        activeGoodsList: this.data.goodsList[this.data.activeGoodsType]
      })
    },
    addCart(e){
      let goods = e.currentTarget.dataset.goods
      //console.log(goods)
      this.triggerEvent("cart", {"goods": goods})
    }
  }
})
