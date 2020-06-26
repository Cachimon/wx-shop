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
    type: ["pop", "new", "sell"],
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
     new Promise((resolve, reject) => {
       setTimeout(() => {
         let allGoods = wx.getStorageSync('allGoods')
         console.log(allGoods)
         this.setData({
           goodsList: allGoods,
           activeGoodsList: allGoods[this.data.activeGoodsType]
         })
         resolve()
       }, 1000)
     }).then(() => {
       this.data.type.forEach(t => {
         if (this.data.goodsList[t].length === 0) {
           setTimeout(() => {
             let allGoods = wx.getStorageSync('allGoods')
             this.setData({
               goodsList: allGoods,
               activeGoodsList: allGoods[this.data.activeGoodsType]
             })
           }, 1000)
         }
       })
     })
      // this.data.type.forEach(type => {
      //   let goodsType = "goodsList." + type
      //   wx.request({
      //     url: 'http://www.cachimon.top/mogujie/' + type + '.json',
      //     method: "GET",
      //     success: (res) => {
      //       let result = res.data.data
            
      //       result.forEach(item => {
      //         item.id = this.data.goodsId++
      //         item.chosen=false
      //         item.amount = 1
      //       })
      //       this.setData({
      //         [goodsType]: result
      //       })
      //       if(type === this.data.activeGoodsType){
      //         this.setData({
      //           activeGoodsList: result
      //         })
      //       }
      //     }
      //   })
      // })
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
    addfavorite(e){
      let goods = e.currentTarget.dataset.goods
      //console.log(goods)
      this.triggerEvent("favorite", {"goods": goods})
    }
  },
  getList() {
    let allGoods = wx.getStorageSync('allGoods')
    console.log(allGoods)
    this.setData({
      goodsList: allGoods,
      activeGoodsList: allGoods[this.data.activeGoodsType]
    })
  }
})
