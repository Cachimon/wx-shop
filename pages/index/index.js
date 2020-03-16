//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testData: 'haha',
    num: '99',
    navigationBar: 0,
    titleHeight: 0,
    banner: [],
    recommend:[],
    cartList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   // console.log('onload')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'http://www.cachimon.top/mogujie/banner.json',
      method: "GET",
      success: (res) => {
        this.setData({
          banner: res.data.data.banner.list,
          recommend: res.data.data.recommend.list
        })
      }
    })
    
  },
  onShow(){
    this.setData({
      cartList: []
    })
  },
  onHide(){
    console.log("hide")
    wx.setStorageSync("newcart", this.data.cartList)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber: function(e){
    //console.log(e)
  },
  launchAppError(e) {
    //console.log(e)
  },
  changeData(){
    this.setData({
      num: this.data.num + '9',
      testData: this.data.testData + (this.data.num)
    })
  },
  addcart(e){
    let index = this.data.cartList.length
    let newCart = 'cartList[' + index + ']'
    let goods = e.detail.goods
    this.setData({
      [newCart]: goods
    })
    console.log("已加入购物车")
  }
})
