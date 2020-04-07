var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      schoolCode:'',                   //所要查询的学校联系人
      linkManList:[],                  //联系人数组
      baselinkManList:[],              //联系人数组
      searchVal: '',                   //输入框搜索的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolCode:options.school
    })
    if (app.globalData.linkMan.length == [] || options.school != app.globalData.signIn.schoolInfo.School){
      this.getSchoolLnkman();
    }else{
      this.setData({
        linkManList: app.globalData.linkMan,
        baselinkManList: app.globalData.linkMan
      })
    }
    
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

  },
  //获取联系人
  getSchoolLnkman(){
    app.wxApi.getSchoolLnkman({ School: this.data.schoolCode}).then(res => {
      
      if (res.ResultCode == 1) {
        res.Value.forEach(item=>{
          item.checked = false;
        })
        this.setData({
          linkManList: res.Value,
          baselinkManList: res.Value
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

  //选中事件
  radioChange(e){
    let checkinfo = e.currentTarget.dataset.checkinfo;
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['linkManList[' + index + '].checked']: !checkinfo.checked
    })
    app.globalData.linkMan = this.data.linkManList
  
  },
  //点击完成回到我的签到页面
  finish(){
    let arr = [],
        linkStr = '',
        paramsLinkStr="";
    this.data.linkManList.forEach(item =>{
      if (item.checked){
        linkStr += item.Xm + ',';
          paramsLinkStr +=  item.Xm + ',' + item.Tel + ';';
      }
    })
    app.globalData.signIn.linkManInfo.linkStr = linkStr;
    app.globalData.signIn.linkManInfo.paramsLinkStr = paramsLinkStr;
 
    wx.redirectTo({
      url: '/pages/signIn/clockIn/clockIn'
    })
  },
  //搜索
  search(e) {
    this.setData({
      searchVal: e.detail.value
    })
    if (this.data.searchVal != '') {
      let resArr = [];
      this.data.linkManList.find((item, index) => {
        if (item.Xm.indexOf(this.data.searchVal) > -1) {
          resArr.push(item)
        }
      })
      this.setData({
        linkManList: resArr
      })
    } else {
      this.setData({
        linkManList: this.data.baselinkManList
      })
    }

  },
})