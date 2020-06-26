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
    imgadd: "http://www.cachimon.top/mogujie/",
    favoriteList: []
  },
  cateChange(i) {
    this.setData({
      currentCate: i.currentTarget.dataset.index
    })
  },
  addfavorite(e) {
    let i = false
    this.data.favoriteList.forEach((item, index) => {
      if (item.id === e.detail.goods.id) {
        i = index
      }
    })

    if (i !== false) {
      let temp = this.data.favoriteList
      temp[i].amount += 1
      this.setData({
        favoriteList: temp
      })
    } else {
      let index = this.data.favoriteList.length
      let newfavorite = 'favoriteList[' + index + ']'
      let goods = e.detail.goods
      this.setData({
        [newfavorite]: goods,
      })
    }


    wx.showToast({
      title: '已添加收藏',
      icon: 'none',
      duration: 2000,
      //mask: true
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
    this.setData({
      favoriteList: wx.getStorageSync('newfavorite') || []
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("hide")
    wx.setStorageSync("newfavorite", this.data.favoriteList)
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