var app = getApp();
import formatTime from "../../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bxManArr: [],
    bxIndex: 0,
    date: formatTime.formatTime(new Date()),
    deviceDetail:{},
    showTime:false,//是否展示时间控件
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.MaintainPersonList();
    this.MaintainEquipmentInfo();
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
  //维修详情
  MaintainEquipmentInfo() {
    app.device.MaintainEquipmentInfo({ Id: this.data.id }).then(res => {
      const { Value, ResultCode, ResultMessage } = res;
      let { deviceDetail, bxManArr, bxIndex } = this.data;
      if (ResultCode == 1) {
        this.setData({
          deviceDetail: Value,
          imgList: Value.FaultImgurl == null ? [] : Value.FaultImgurl.split('|'),
          showTime: bxManArr[bxIndex].Code == Value.ServiceMan ? false : true
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
  //提交接单
  EquipmentTakeOrders(){
    let { id, showTime, date, bxManArr, bxIndex} = this.data;
    let params={
      Id:id,
      PlanMainTainTime: showTime == false ? date : '',
      ServiceMan: bxManArr[bxIndex].Code,
      TakeOrderState: showTime == false ? 1 : 0
    }
    app.device.EquipmentTakeOrders(params).then(res=>{
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1000)
      } else {
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //获取维修人
  MaintainPersonList(){
    app.device.MaintainPersonList().then(res=>{
      const { Value, ResultCode, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          bxManArr: Value
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
  previewImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },
  //选择维修人
  bindPickerChange(e){
    let { deviceDetail, bxManArr, bxIndex} = this.data;
    this.setData({
      bxIndex: e.detail.value
    })
    this.setData({
      showTime: bxManArr[e.detail.value].Code == deviceDetail.ServiceMan ? false : true
    })
  },
  //时间赋值
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  }
})