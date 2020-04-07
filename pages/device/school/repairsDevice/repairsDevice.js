// pages/device/school/repairsDevice/repairsDevice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [],//报修人员list
    typeIndex: 0,
    bxNum:'',//报修单号
    schoolname:'',
    schoolcode:'',
    deviceDetail:{},//详情
    loginInname:'',
    wxry:[],//维修人员list
    wxIndex:0,//选中的维修人员index
    kqjid:'',
    bz:'',//备注
    FaultImgurl:'',//图片数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetRepairsNum();
    this.MaintainPersonInfo();
    this.TaskTeacherList();
    this.setData({
      kqjid: options.kqjid,
      schoolcode: options.schoolcode,
      schoolname: options.schoolname,
      loginInname: wx.getStorageSync('username')
    })
    this.GetSchoolEquipment()
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
  //维修人员
  bindPickerChange: function (e) {
    let type = e.target.dataset.type
    if (type == 'wx'){
      this.setData({
        wxIndex: e.detail.value
      })
    }else{
      this.setData({
        typeIndex: e.detail.value
      })
    }
  },
  //获取报修单号
  GetRepairsNum(){
    app.device.GetRepairsNum().then(res=>{
      this.setData({
        bxNum:res.Value
      })
    })
  },
  //获取设备信息详情
  GetSchoolEquipment() {
    app.device.GetSchoolEquipment({ kqjid: this.data.kqjid }).then(res => {
      this.setData({
        deviceDetail: res.Value
      })
    })
  },
  //获取设备维修人列表
  MaintainPersonInfo(){
    app.device.MaintainPersonList().then(res=>{
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          wxry: Value
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
  //获取报修人
  TaskTeacherList(){
    app.task.TaskTeacherList().then(res=>{
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          objectArray: Value
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
  //添加图片
  getPicList(e){
    let imglist = e.detail
    if (imglist.length != 0 && imglist[imglist.length-1].val == ''){
      imglist = imglist.slice(0, imglist.length - 1)
    }
    this.setData({
      FaultImgurl: imglist
    })
  },
  //提交设备报修
  RepairsEquipment(){
    let { bxNum, schoolcode, kqjid, objectArray, typeIndex, wxry, wxIndex, bz,FaultImgurl} = this.data;
    let img = '';
    if (FaultImgurl != ''){
      FaultImgurl.forEach((item) => {
        img += app.SRC+item.val + '|'
      })
    }
    img = img.slice(0,img.length-1)
    let params={
      RepairsCode: bxNum,
      SchoolCode: schoolcode,
      SchoolEquipmentId: kqjid,
      UserCode: objectArray[typeIndex].Code,
      ServiceMan: wxry[wxIndex].Code,
      Remark: bz,
      FaultImgurl: img
    };
    app.device.RepairsEquipment(params).then(res=>{
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode == 1) {
        wx.showToast({
          title: '报修成功',
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
  //备注输入时赋值
  getValue(e){
    this.setData({
      bz:e.detail.value
    })
  }
})