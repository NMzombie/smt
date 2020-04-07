var app = getApp();
import formatTime from "../../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: formatTime.formatTime(new Date()),
    id:'',
    deviceDetail:{},
    imgList:[],//报修图片数组
    MainTainImgURL:[],//解决图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.MaintainEquipmentInfo();
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
  //维修详情
  MaintainEquipmentInfo(){
    app.device.MaintainEquipmentInfo({Id:this.data.id}).then(res=>{
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          deviceDetail: Value,
          imgList: Value.FaultImgurl == null ? [] : Value.FaultImgurl.split('|'),
          MainTainImgURL: Value.MainTainImgURL == null ? [] : Value.MainTainImgURL.split('|')
        })
      } else {
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //放大图片
  previewImg(e){
    let { type, url } = e.currentTarget.dataset;
    wx.previewImage({
      current:url, // 当前显示图片的http链接
      urls: type == 1 ? this.data.imgList : this.data.MainTainImgURL // 需要预览的图片http链接列表
    })
  }
})