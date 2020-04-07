// pages/home/my/myhome/myhome.js
var app = getApp();
import formatTime from "../../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    department:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:wx.getStorageSync('username'),
      department: wx.getStorageSync('Department'),
    })
  },
  //跳转到签到
  renderSignin(e){
    wx.navigateTo({
      url: '/pages/signIn/home/home?tab=' + e.currentTarget.dataset.tab
    })
  },
  //跳转到日志
  renderDiary(){
    wx.navigateTo({
      url: '/pages/diary/allDiary/allDiary'
    })
  },
  //跳转到报表
  renderBb(){
    wx.navigateTo({
      url: '/pages/components/table/table?tab='+ "2"
    })
  },
  back(){
    formatTime.initFun();
    
    app.wxApi.loginout({ Username: wx.getStorageSync('userId') }).then(res => {
      if (res.ResultCode == 1) {
        wx.reLaunch({
          url: '/pages/login/login'
        })
        wx.setStorageSync("userId", '')
        wx.setStorageSync("username", '')
        wx.setStorageSync("loginNum", '')
        wx.setStorageSync("mail_num", '')
        wx.setStorageSync("Department", '')
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },


  //跳转到统计
  renderStatistic(){
    wx.navigateTo({
      url: '/pages/home/my/statistic/statistic'
    })
  }
})

