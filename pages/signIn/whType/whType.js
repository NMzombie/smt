var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[],                                  //分类数组
    baseTypeList: [],                             //分类数组
    searchVal: '',                                //输入框搜索的值
    edit:false,                                   //是否从修改点击进入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.type.length == 0){
      this.getClass();
    }else{
      this.setData({
        typeList: app.globalData.type,
        baseTypeList: app.globalData.type
      })
    }
    this.setData({
      edit:options.edit ? true : false
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
  //获取w维护分类
  getClass(){
    let checkItem = app.globalData.signIn.typeInfo;
    app.wxApi.getClass().then(res => {
      if (res.ResultCode == 1) {
        res.Value.forEach((item,index)=>{
          item.showChild = false;
          item.childList.forEach((sitem,sindex)=>{
            for (let i = 0; i < checkItem.length; i++){
              if (checkItem[i].cid == sitem.cid) {
                sitem.checked = true;
                return;
              } else {
                sitem.checked = false;
              }
            }
          })
        })
        this.setData({
          typeList: res.Value,
          baseTypeList: res.Value
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
  //搜索
  search(e) {
    this.setData({
      searchVal: e.detail.value
    })
    if (this.data.searchVal != '') {
      let resArr = [];
      this.data.typeList.forEach((item,ibdex) =>{
        item.childList.find((sitem, sindex) => {
          if (sitem.classname.indexOf(this.data.searchVal) > -1) {
            resArr.push(item)
          }
        })
      })
      
      this.setData({
        typeList: resArr
      })
    } else {
      this.setData({
        typeList: this.data.baseTypeList
      })
    }

  },

  //展示出当前点击的子项
  showChild(e){
    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    this.setData({
      [`typeList[${index}].showChild`]: !item.showChild,
    })
  },


  //选中子项的处理
  radioChange(e){
    let index = e.currentTarget.dataset.index;//父元素的index
    let item = e.currentTarget.dataset.checkinfo; //选中子元素的数组
    let childIndex = e.currentTarget.dataset.childindex;//子元素的index
    this.setData({
      [`typeList[${index}].childList[${childIndex}].checked`]: !item.checked,
    })
    app.globalData.type = this.data.typeList
  },

  //点击完成刷选出选中的信息  并跳回签到页面
  finish(){
    let arr = [];
    this.data.typeList.forEach((item, ibdex) => {
      item.childList.forEach((sitem, sindex) => {
        if (sitem.checked) {
          arr.push(sitem)
        }
      })
    })
    app.globalData.signIn.typeInfo = arr;
    if (this.data.edit == true){
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.redirectTo({
        url:  '/pages/signIn/clockIn/clockIn'
      })
    }
    
  }
})