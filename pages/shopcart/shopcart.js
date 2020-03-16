// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[{
      id: 0,
      chosen:false,
      amount:1,
      img: "http://www.cachimon.top/mogujie/files/200120_361blh8c70k1aj9gi1ia6bl97gaga_750x1125.webp",
      price: "¥108.99",
      title: "现货法式显瘦灯芯绒连衣裙女新款优雅桔梗裙气质长裙系带收腰复古"
    }],
    imgadd: "http://www.cachimon.top/mogujie/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let index = this.data.cartList.length
    let newCart = 'cartList[' + index + ']'
    let goods = wx.getStorageSync('newcart')
    this.setData({
      cartList: [...this.data.cartList, ...goods]
    })
    console.log(this.data.cartList)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})