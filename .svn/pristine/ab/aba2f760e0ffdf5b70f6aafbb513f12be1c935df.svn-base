// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    this.getCode();
  },
  getCode() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.isLogin(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 根据接口返回信息  得到是否登录过  如果有则直接进入主页  如果没有则输入密码账号进行登录
  isLogin(code) {
    let that = this;
    app.wxApi.loginIn({ Wxcode: code}).then(res => {
      if (res.ResultCode == 1) {
        wx.setStorageSync("userId", res.Value.Username)
        wx.setStorageSync("username", res.Value.Xm)
        wx.setStorageSync("loginNum", that.data.phone)
        wx.setStorageSync("mail_num", res.Value.Mail_num)
        wx.setStorageSync("Department", res.Value.Department),
        wx.switchTab({
          url: '/pages/home/home/home'
        })
      }else{
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }

    })
  }
})