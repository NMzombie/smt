// pages/signIn/teamSignIn/teamSignIn.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo:[],            //签到数组
    startTime:'',           //开始时间
    endTime:'',             //结束时间
    departCode:'',          //部门代码
    tab:1,
    form_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startTime: options.startTime,
      endTime: options.endTime,
      departCode: options.departCode,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMyTeamQDTJ()
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
  // 跳转到我的签到
  renderMySignIn(e){
    wx.navigateTo({
      url: '/pages/signIn/home/home?showTab=' + true + '&tab=1&departCode=' + this.data.departCode + "&mainNum=" + e.currentTarget.dataset.mainnum + "&otherUsername=" + e.currentTarget.dataset.otherusername + "&startTime=" + this.data.startTime
    })
  },
  // 获取团队签到记录统计接口
  getMyTeamQDTJ(){
    app.wxApi.getMyTeamQDTJ({Bmcode:this.data.departCode,Stime:this.data.startTime,Etime:this.data.endTime}).then(res=>{
      if (res.ResultCode == 1) {
        this.setData({
          listInfo: res.Value
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
  // 切换tab
  changeTab(e){

    this.setData({
      tab: e.currentTarget.dataset.tab,
      listInfo:[],
    })
    if (e.currentTarget.dataset.tab == 1){//已签到
      this.getMyTeamQDTJ()
    }else{
      this.getMyTeamWQDTJ()
    }
  },
  //一键提示
  formSubmit(e){
    let username = [];
    this.data.listInfo.forEach((item,index)=>{
      username.push(item.Username)
    })
    console.log(e.detail.formId,555)
    app.wxApi.WeiXinSendTemplate({ Content:'尚未签到，请确认签到状况',SendType:1,UserCodeList: username.join('|'), FormId: e.detail.formId, PageUrl:'pages/index/index'}).then(res => {
      if (res.ResultCode == 1) {
        wx.showToast({
          title: '提醒成功',
          icon: 'none',
          duration: 2000
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
  //获取未签到数据
  getMyTeamWQDTJ(){
    app.wxApi.getMyTeamWQDTJ({ Bmcode: this.data.departCode, Stime: this.data.startTime, Etime: this.data.endTime }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          listInfo: res.Value
        })
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})