//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let allGoods = {}
    let types = ["pop", "new", "sell"]
    let num = 0
    types.forEach(type => {
      let goodsType = "goodsList." + type
      wx.request({
        url: 'http://www.cachimon.top/mogujie/' + type + '.json',
        method: "GET",
        success: (res) => {
          let result = res.data.data

          result.forEach(item => {
            item.id = num++
            item.chosen = false
            item.amount = 1
          })
          allGoods[type] = result
          wx.setStorageSync('allGoods', allGoods)
        }
      })
    })
    // this.globalData.allGoods = allGoods
    // wx.setStorageSync('allGoods', allGoods)
    // 登录
   
    wx.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
      //  console.log(res)
      //  console.log("未过期")
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
           // console.log('登录')
            //console.log(res)
          }
        }) //重新登录
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        //console.log(this)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
   
  },
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    titleHeight:0,
    allGoods: {}
  },
  request: 10000
})