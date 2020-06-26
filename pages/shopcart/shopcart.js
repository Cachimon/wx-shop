import computed from '../../utils/wxapp-computed'

// pages/shopfavorite/shopfavorite.js
Page(
  computed({
    data: {
      favoriteList: [{
        id: 0,
        chosen: false,
        amount: 1,
        img: "http://www.cachimon.top/mogujie/files/200120_361blh8c70k1aj9gi1ia6bl97gaga_750x1125.webp",
        price: "¥108.99",
        title: "现货法式显瘦灯芯绒连衣裙女新款优雅桔梗裙气质长裙系带收腰复古"
      }],
      imgadd: "http://www.cachimon.top/mogujie/",
      get allChosen() {
        if (this.favoriteList && this.favoriteList.length) {
          return this.favoriteList.every(item => {
            return item.chosen
          })
        } else {
          return false
        }
      },
      get allAmount() {
        let all = 0
        if (this.favoriteList && this.favoriteList.length) {
          all = this.favoriteList.reduce((total, item) => {
            let price = item.price.replace('¥', '') - 0
            if (item.chosen) {
              return total + price * item.amount
            } else {
              return total
            }
          }, 0)
        }
        return all.toFixed(2)
      }
      // get prettyName() {
      //   return this.fullName.split("").join("~");
      // }
    },
    choseItem(e) {
     
      let index = e.currentTarget.dataset.index
      let key = 'favoriteList[' + index +'].chosen'
      let flag = this.data.favoriteList[index].chosen
      this.setData({
        [key]: !flag
      })
    },
    choseAll() {
      let allChosen = this.data.allChosen
      this.data.favoriteList.forEach((item, index) => {
        let key = 'favoriteList[' + index +  '].chosen'
        this.setData({
          [key] : !allChosen
        })
      })
    },
    submit() {
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
      let index = this.data.favoriteList.length
      let newfavorite = 'favoriteList[' + index + ']'
      let goods = wx.getStorageSync('newfavorite')
      this.setData({
        // favoriteList: [...this.data.favoriteList, ...goods]
        favoriteList: goods || []
      })
      console.log(this.data.favoriteList)
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
    // ...
  })
 )