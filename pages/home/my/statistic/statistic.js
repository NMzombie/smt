// pages/home/my/statistic/statistic.js
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
  //学校签到和未签到跳转到表格页
  renderTable(e){
    wx.navigateTo({
      url: '/pages/components/table/table?tab=' + "3" + '&signFlag=' + e.currentTarget.dataset.tab
    })
  },

  renderManage(e) {
    wx.navigateTo({
      url: '/pages/components/table/table?tab=' + "4"
    })
  }
})