var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkManList: [],                  //联系人数组
    baselinkManList: [],              //联系人数组
    searchVal: '',                   //输入框搜索的值
    diaryType:'',                     //当前所选的tab
    edit:false,
    linkmanParams:'',                       //修改日志已选联系人数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 888, app.globalData.writeDiary.linkMan)
    if (app.globalData.writeDiary.linkMan.length == 0){
      this.getMyAddressBook();
    }else{
      this.setData({
        linkManList: app.globalData.writeDiary.linkMan,
        baselinkManList: app.globalData.writeDiary.linkMan,
      })
    }
    this.setData({
      diaryType: options.diaryType,
      edit:options.edit == 'true' ? true : false,
      linkmanParams: options.linkmanParams ? options.linkmanParams : ''
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

  },
  //获取联系人
  getMyAddressBook() {
    app.wxApi.getMyAddressBook().then(res => {
      if (res.ResultCode == 1) {
        if(this.data.edit == true){
          let checkLinkman = this.data.linkmanParams.split(',');
          res.Value.forEach(item => {
            for (let i = 0; i < checkLinkman.length;i++){
              if (checkLinkman[i] == item.Username){
                item.checked = true;
                return;
              }else{
                item.checked = false;
              }
            }
          })
          app.globalData.writeDiary.linkMan = res.Value
        }else{
          res.Value.forEach(item => {
            item.checked = false;
          })
        }
        
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
  radioChange(e) {
    let checkinfo = e.currentTarget.dataset.checkinfo;
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['linkManList[' + index + '].checked']: !checkinfo.checked
    })
    app.globalData.writeDiary.linkMan = this.data.linkManList

  },
  //点击完成回到我的签到页面
  finish() {
    if(this.data.edit == true){
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.redirectTo({
        url: '/pages/diary/writeDiary/writeDiary?diaryType=' + this.data.diaryType
      })
    }
    
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