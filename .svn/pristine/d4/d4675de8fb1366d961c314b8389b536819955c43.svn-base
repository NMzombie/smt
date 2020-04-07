var app = getApp();
var bmap = require('../../../libs/bmap-wx.min.js');
var mapInfo = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapInfo:[],         //我的位置 以及周边的位置
    wxMarkerData:[],    //我的位置
    mywxMarkerData:[],  //周边位置
    sugData: '',
    baseMarkerData:[],

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
    //获取当前位置以及周边学校

    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '2iUe0mxDF8B0997GLkGLrnGtvuCftAUl',
    });

    // 获取我的当前位置 失败
    var myfail = function (data) {
      console.log(data)
    };
    // 获取我的当前位置 成功
    var mysuccess = function (data) {
      that.setData({
        mywxMarkerData: data.wxMarkerData,
      })
      console.log(data)
      //mapInfo.concat(data.wxMarkerData)
    }
    //获取周边学校 失败
    var fail = function (data) {
      console.log(data)
    };
    //获取周边学校成功
    var success = function (data) {
      that.setData({
        wxMarkerData: data.wxMarkerData,
        baseMarkerData: data.wxMarkerData,
      })
      //mapInfo.concat(data.wxMarkerData)
    }
    //获取周边  关键字学校
    BMap.search({
      "query": '学校',
      fail: fail,
      success: success,
    });
    //获取我的当前位置 
    BMap.regeocoding({
      fail: myfail,
      success: mysuccess,
    });
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
  //跳转回我的签到页面
  renderPage(e){
    app.globalData.signIn.address = e.currentTarget.dataset.school
    wx.redirectTo({
      url: '/pages/signIn/clockIn/clockIn'
    })
  },
  bindKeyInput: function (e) {
    var that = this;
    // 新建百度地图对象 
    if (e.detail.value == ''){
      that.setData({
        wxMarkerData: this.data.baseMarkerData
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: '2iUe0mxDF8B0997GLkGLrnGtvuCftAUl'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var sugData = [];
      for (var i = 0; i < data.result.length; i++) {
        sugData.push({
          title:data.result[i].name
        }) 
      }
      that.setData({
        wxMarkerData: sugData
      });
    }
    let searchKey = this.data.mywxMarkerData[0].address.slice(0,2);//截取省份 用来搜索
   
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: searchKey,
      city_limit: true,
      fail: fail,
      success: success
    });
  } 
})