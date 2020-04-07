// pages/sj/schoolList/schoolList.js

var app = getApp();
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    oldList: [],
    searchVal: '',
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
    // console.log(777)
    // var { schoolList, } = app.globalData;
    // if (schoolList.length > 0) {
    //   this.setData({
    //     schoolList: schoolList,
    //     oldList: schoolList,
    //   })
    //   return;
    // }
   
    // this.getSchoolList();
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

  // 获取学校列表
  getSchoolList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var list = [];
    app.wxApi.getSchool().then(res => {
      var { ResultMessage, ResultCode, Value, } = res;
      if (ResultCode == 1) {
        for(let i=0;i<Value.length;i++){
          list.push(Value[i]);
        }
        this.setData({
          schoolList: list,
          oldList: list,
        })
        app.globalData.schoolList = list;
        wx.hideLoading()
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 模糊查询
  search: function (e) {
    var { value } = e.detail;
    var { schoolList, oldList,} = this.data;
    var newList = [];
    !!timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (value == '') {
        this.setData({ schoolList: oldList, });
        return;
      }
      schoolList.find((item, index) => {
        if (item.Schoolname.indexOf(value) > -1) {
          newList.push(item)
        }
      })
      this.setData({ schoolList: newList, });
    },500)
  },

  // 选中学校
  renderPage: function (e) {
    var { school, schoolname, } = e.currentTarget.dataset;
    var schoolInfo = {
      school,
      schoolname,
    }
    var myEventOption = {};
    app.globalData.schoolInfo = schoolInfo;
    this.triggerEvent('currentSchool',e.currentTarget.dataset,myEventOption )
    // wx.navigateBack();
  },

})