var app = getApp();
import formatTime from "../../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: formatTime.formatTime(new Date()), 
    FaultImgurl:'',//图片
    deviceDetail:{},
    imgList:[],
    fa:'',//解决方案
    id:'',
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
  //维修详情
  MaintainEquipmentInfo() {
    app.device.MaintainEquipmentInfo({ Id: this.data.id }).then(res => {
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          deviceDetail: Value,
          imgList: Value.FaultImgurl == null ? [] : Value.FaultImgurl.split('|')
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
  //维修录入
  MaintainEquipmentSolution(){
    let { id, fa, FaultImgurl, date} = this.data;
    let img = '';
    if (FaultImgurl != '') {
      FaultImgurl.forEach((item) => {
        img += app.SRC + item.val + '|'
      })
    }
    console.log(img)
    img = img.slice(0, img.length - 1)
    let params = {
      Id:id,
      SolveReMark:fa,
      MainTainImgURL: img,
      MainTainTime: date
    }
    app.device.MaintainEquipmentSolution(params).then(res => {
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        wx.showToast({
          title: '录入成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //添加图片
  getPicList(e) {
    let imglist = e.detail
    console.log(e, 676767)
    if (imglist.length != 0 && imglist[imglist.length - 1].val == '') {
      imglist = imglist.slice(0, imglist.length - 1)
    }
    console.log(e.detail,77777777)
    this.setData({
      FaultImgurl: imglist
    })
  },
  //时间改变
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  //放大图片
  previewImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },
  //解决方案
  getValue(e){
    this.setData({
      fa:e.detail.value
    })
  }
})