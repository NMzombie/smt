var app = getApp();
import formatTime from "../../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    typeList:[],//设备类型
    typeIndex:0,//设备类型下标
    xhList:[],//设备型号
    xhIndex:0,//设备型号下标
    schoolCode: '',//学校代码
    schoolname: '',//学校名称
    //连接方式
    connecList:[{
      value:1,
      name:'GPRS2G'
    },{
      value: 2,
      name: '移动4G'
    }, {
      value: 3,
      name: '联通4G'
    }, {
      value: 4,
      name: '电信4G'
    }, {
      value: 5,
      name: '学校无线'
    }, {
      value: 6,
      name: '学校有线'
    }, {
      value: 7,
      name: '专线'
    }],
    connecIndex:0,//连接方式下标
    //巡更功能数组
    xgList:[{
      value:0,
      name:'停用'
    },{
      value: 1,
      name: '启用'
    }],
    xgIndex:0,//巡更功能下标
    kqjList:[{
      value:0,
      name:'接触式刷卡考勤机'
    },{
      value:1,
      name:'远距离考勤机'
    }, {
      value: 2,
      name: '非考勤机'
    }],
    kqjIndex:0,
    bdtel1:'',//短信通知号码（10分钟
    bdtel2:'',//短信通知号码（20分钟
    bdtel3:'',//短信通知号码（30分钟
    bdtel4:'',//短信通知号码（40分钟
    bdtel5:'',//短信通知号码（50分钟
    bdtel6:'',//短信通知号码（60分钟
    sbbs:'',//设备标识
    spsbxlh:'',//视频设备序列号
    kqsbxlh:'',//考勤设备序列号
    sbip:'',//设备ip
    simkh:'',//sim卡号
    azwz:'',//安装位置
    dqdate: formatTime.formatTime(new Date()),//到期日期
    azdate: formatTime.formatTime(new Date()),//安装日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolCode: options.schoolcode,
      schoolname: options.schoolname,
    })
    this.GetEquipmentTypeList();
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
  //设备类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //时间
  bindDateChange(e){
    // this.setData({
    //   dqdate: e.detail.value
    // })
    var key = e.target.dataset.type;
    console.log(key, 88)
    this.setData({
      [key]: e.detail.value
    })
  },
  //获取设备类型
  GetEquipmentTypeList(){
    app.device.GetEquipmentTypeList().then(res => {
      const { ResultCode, Value, ResultMessage} = res;
      if (ResultCode == 1){
        this.setData({
          typeList:Value
        })
        this.GetUnitTypeList(Value[0].TypeCode);
      }else{
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //获取设备型号
  GetUnitTypeList(typeCode){
    app.device.GetUnitTypeList({ TypeId:typeCode}).then(res => {
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode == 1) {
        this.setData({
          xhList: Value
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
  //设备类型值改变
  bindPickerChangeType(e){
    console.log(e,88)
    this.setData({
      typeIndex: e.detail.value
    })
    this.GetUnitTypeList(this.data.typeList[e.detail.value].TypeCode);
  },
  //设备型号值改变
  bindPickerChangeXh(e){
    console.log(e, 99)
    this.setData({
      xhIndex: e.detail.value
    })
  },
  //连接方式值改变
  bindPickerChangeLj(e){
    this.setData({
      connecIndex: e.detail.value
    })
  },
  //考勤机值改变
  bindPickerChangeKqj(e){
    this.setData({
      kqjIndex: e.detail.value
    })
  },
  //巡更值改变
  bindPickerChangeXg(e){
    this.setData({
      xgIndex: e.detail.value
    })
  },
  //提交设备
  submit(){
    if (this.data.sbbs == ''){
      wx.showToast({
        title: '设备标识不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.typeList.length == 0) {
      wx.showToast({
        title: '设备类型不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.xhList.length == 0) {
      wx.showToast({
        title: '设备型号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.spsbxlh == '') {
      wx.showToast({
        title: '视频设备序列号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.kqsbxlh == '') {
      wx.showToast({
        title: '考勤设备序列号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.sbip == '') {
      wx.showToast({
        title: '设备ip不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.simkh == '') {
      wx.showToast({
        title: 'sim卡号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.bdtel1 == '') {
      wx.showToast({
        title: '通知号码10分钟不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    let params = {
      kqjid: this.data.schoolCode + this.data.sbbs,
      School: this.data.schoolCode,
      TypeId: this.data.typeList[this.data.typeIndex].TypeCode,
      UnitType: this.data.xhList[this.data.xhIndex].UnitType,
      DeviceSerial: this.data.spsbxlh,
      DeviceSerialKQJ: this.data.kqsbxlh,
      SIMtel: this.data.simkh,
      bdtel: this.data.bdtel1,
      bdtel2: this.data.bdtel2,
      bdtel3: this.data.bdtel3,
      bdtel4: this.data.bdtel4,
      bdtel5: this.data.bdtel5,
      bdtel6: this.data.bdtel6,
      azPlace: this.data.azwz,
      Xuegeng: this.data.xgList[this.data.xgIndex].value,
      kqjFlag: this.data.kqjList[this.data.kqjIndex].value,
      ConnectType: this.data.connecList[this.data.connecIndex].value,
      IPAddress:this.data.sbip,
      WarrantyEndTime:this.data.dqdate,
      InstallTime:this.data.azdate
    }
    app.device.AddSchoolEquipment(params).then(res=>{
      const { ResultCode, Value, ResultMessage } = res;
      if (ResultCode != 1){
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
        return;
      }else{
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  //输入框的值改变
  bindInput(e){
    var key = e.target.dataset.value;
    console.log(key,88)
    this.setData({
      [key]:e.detail.value
    })
  }
})