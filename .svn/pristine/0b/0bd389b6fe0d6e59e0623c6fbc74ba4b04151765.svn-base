// pages/messsage/message.js
//获取应用实例
var app = getApp();
Page({
  data: {
    currentPage: 1,                 //当前页数
    messageList: [],                 //消息列表
    totalPage: '',                   //总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageList();
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
  // 获取消息列表
  getMessageList() {
    console.log()
    app.wxApi.getMyMessage({ Page: this.data.currentPage }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          messageList: this.data.messageList.concat(res.Value.List),
          totalPage: res.Value.TotalPage
        })
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 加载更多 分页
  addMore() {
    console.log(this.data.currentPage)
    if (this.data.currentPage == this.data.totalPage) {
      return;
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.getMessageList();
  },
  renderDetail(e) {
    wx.navigateTo({
      url: `/pages/diary/diaryDetail/diaryDetail?id=${e.currentTarget.dataset.id}&tab=${e.currentTarget.dataset.flag}`
    })
  }

})