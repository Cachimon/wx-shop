// pages/category/category.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateTitle: {
      "pop": "正在流行",
      "shirt": "上衣",
      "pants": "裤子",
      "dress": "裙装",
      "uw": "内衣",
      "female_shoes": "女鞋",
      "bf": "男友",
      "bags": "包包",
      "sports": "运动",
      "accessories": "配饰",
      "makeup": "化妆品",
      "personal_care": "日化品",
      "home": "家居"
    },
    cateList:{},
    height: 0,
    currentCate: "pop",
    imgadd: "http://www.cachimon.top/mogujie/"
  },
  cateChange(i) {
    this.setData({
      currentCate: i.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i in this.data.cateTitle) {
      let cateType = 'cateList.'+i
      wx.request({
        url: 'http://www.cachimon.top/mogujie/categories_data/' + i + '_cate.json',
        method: "GET",
        success: (res) => {
          this.setData({
            [cateType]: res.data.data
          })
        },
        fail: (err) => {
          return err
        }
      })
    }
  
    wx.getSystemInfo({
      success: (res) => {
        let oheight = res.windowHeight / 13 /(res.windowWidth/760)
        this.setData({
          height: oheight
        })
      }
    })
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