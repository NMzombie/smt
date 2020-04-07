// pages/device/noteBook/noteBook.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:1,
    typeName:'',//设备类型
    kqjid:'',
    schoolname:'',
    equipmentCode:'',//设备编号
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeName: options.typename,
      kqjid: options.kqjid,
      schoolname: options.schoolname,
      equipmentCode:options.equipmentCode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.GetEquipmentHelpDoc();
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
  GetEquipmentHelpDoc(){
    app.device.GetEquipmentHelpDoc({ EquipmentCode: this.data.equipmentCode, DocType :this.data.tab }).then(res=>{
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode == 1) {
        Value.forEach(item=>{
          item.ImgUrl = item.ImgUrl.split('|')
        })
        this.setData({
          list: Value,
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
    let { index, url } = e.currentTarget.dataset;
    console.log(index,url)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: this.data.list[index].ImgUrl // 需要预览的图片http链接列表
    })
  },
  changeTab(e){
    let { tab } = e.currentTarget.dataset;
    this.setData({
      tab: tab,
      list: [],
    })
    this.GetEquipmentHelpDoc()
  }
})