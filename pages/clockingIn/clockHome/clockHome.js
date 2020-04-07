var app = getApp();
import util from "../../../utils/util.js"
var setIntervalTime = null;//时间定时器
var bmap = require('../../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: util.formatTime(new Date()),                  //时间控件开始吧时间
    today: util.formatTime(new Date()),                      //当前时间
    diaryType:1,                                             //1:我的考勤   0：团队考勤
    currentTime: util.formatTime(new Date(), true, true),    //当前时间
    showClock:true,                                          //是否显示打卡按钮
    teamEndTime: util.formatTime(new Date()),                //团队考勤结束时间
    teamStartTime: util.formatTime(new Date()),              //团队考勤开始时间
    address:'',                                              //当前地址
    diaryList:[],                                            //我的考勤记录
    myStrartTime:'',                                         //我的考勤帅选日期
    myEndTime:'',                                            //我的考勤结束日期
    teamList: [],                                            //团队考勤数组
    learderName: [],                                          
    fifterMyself: false,                                     //是否过滤掉自己  
    otherusername:'',                                        //为空则是查找自己团队考勤，不为空则是查找该值对应的团队考勤
    flagClick:true,                                          //防止多次点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setTime();
    that.getAddress();
    that.getMyKQ();
    this.data.learderName.push({                                          //领导姓名数组
      xm: wx.getStorageSync('username'),
      username: wx.getStorageSync('userId'),
      mark: '',
    });
    this.setData({
      learderName: this.data.learderName
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
    let that = this;
    clearInterval(that.setIntervalTime)
  },
  //选择日期
  chooseDate(e) {
    let dateType = e.target.dataset.datetype;
    if (new Date(e.detail.value).getTime() == new Date(this.data.today).getTime()){
      this.setData({
        showClock:true,
        myStrartTime:'',
        myEndTime:''
      })
    }else{
      this.setData({
        showClock: false,
        myStrartTime: e.detail.value,
        myEndTime: e.detail.value,
      })
    }
    this.setData({
      startTime: e.detail.value,
    })
    this.getMyKQ()
  },
  //团队考勤选择时间
  teamChooseDate(e){
    let dateType = e.target.dataset.datetype;
    if (dateType == 1) {  //开始时间
      this.setData({
        teamStartTime: e.detail.value,
      })
    } else {
      if (this.compareDate(this.data.teamStartTime, e.detail.value)) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.setData({
        teamEndTime: e.detail.value,
        currentPage: 1
      })
      
    }
    this.getMyTeamKQTJ()
  },
  //改变类型  1：我的考勤 0：团队考勤
  changeType(e) {
    //console.log(e.currentTarget.dataset.type, 7766)
    this.setData({
      diaryType: e.currentTarget.dataset.type
    })
    if (e.currentTarget.dataset.type == 0){
      //console.log(8888888)
      clearInterval(this.setIntervalTime)
      this.getMyTeamKQTJ()
    }else{
      //console.log(6666666666666)
      this.setTime();
      this.getMyKQ()
    }
  },
  //时间的倒计时
  setTime(){
    let that = this;
    that.setIntervalTime = setInterval(function () {
      that.setData({
        currentTime: util.formatTime(new Date(), true, true),
      })
    }, 1000)
  },
  //取消时间控件的选择
  cancleDate(){

  },
  // 两个日期进行比较
  compareDate(date1, date2) {
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if (oDate1.getTime() > oDate2.getTime()) {
      return true;
    } else {
      return false;
    }
  },
  // 获得地址
  getAddress(){
    let that = this;
    var BMap = new bmap.BMapWX({
      ak: '2iUe0mxDF8B0997GLkGLrnGtvuCftAUl',
    });

    // 获取我的当前位置 失败
    var myfail = function (data) {
      wx.showToast({
        title: '定位失败',
        icon: 'none',
        duration: 2000
      })
    };
    // 获取我的当前位置 成功
    var mysuccess = function (data) {
      that.setData({
        mywxMarkerData: data.wxMarkerData,
        address: data.wxMarkerData[0].address
      })
      wx.showToast({
        title: '定位成功',
        icon: 'success',
        duration: 2000
      })
      //mapInfo.concat(data.wxMarkerData)
    }
    BMap.regeocoding({
      fail: myfail,
      success: mysuccess,
    });
  },
  //点击打卡提交考勤信息
  SubmitKQ(e){
    let that = this;
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId }).then(res => {
      console.log(res, 8888)
    })
    app.wxApi.SubmitKQ({ Mail_num: wx.getStorageSync('mail_num'), Xm: wx.getStorageSync('username'), KqAddress: this.data.address}).then(res => {
      if (res.ResultCode == 1) {
        // this.setData({
        //   diaryList: res.Value.List
        // })
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 2000
        })
        that.getMyKQ();

      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //获取考勤记录
  getMyKQ(){
    app.wxApi.getMyKQ({ Stime: this.data.myStrartTime, Etime: this.data.myEndTime, OtherUsername: ''}).then(res => {
      if (res.ResultCode == 1) {
        res.Value.List.forEach((item,index)=>{
          item.KqTime = item.KqTime.split(' ')[1]
        })
        this.setData({
          diaryList: res.Value.List
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
  //团队考勤记录
  getMyTeamKQTJ(){
    let that = this;
    app.wxApi.getMyTeamKQTJ({ Stime: that.data.teamStartTime, Etime: that.data.teamEndTime, OtherUsername: that.data.otherusername }).then(res => {
      
      if (res.ResultCode == 1) {
        let selfUserId = wx.getStorageSync('userId');
        //if(that.data.otherusername != ''){//说明点击的不是是第一层，非本人本人层
          res.Value.forEach((item, index) => {
            if (item.Username == that.data.otherusername || item.Username == selfUserId){//帅选掉你当前点击的这个人，否则出现一直都可以点击自己
              //res.Value.splice(index,1);
              item.nextOrder = false
            }else{
              item.nextOrder = true
            }
          })
        //}
       
        that.setData({
          teamList: res.Value
        })

      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        flagClick: true
      })
    })
  },
  //查看下一级统计数据
  renderNext(e){
    let that = this;
    that.setData({
      flagClick: false
    })
    console.log(that.data.flagClick,667676)
    let username = e.currentTarget.dataset.username,
      xm = e.currentTarget.dataset.xm,
      index = e.currentTarget.dataset.index;
    if (typeof (xm) != 'undefined'){//从列表点击进入
      if (that.data.learderName.length <= 0){//如果只有一个上级名称则不需要显示'>'
        that.data.learderName.push({
          xm: xm,
          username: username,
          mark:'',
         
        })
      }else{
        that.data.learderName.push({
          xm: xm,
          username: username,
          mark: '>',
          
        })
      }
      
      that.setData({
        learderName: that.data.learderName,
        otherusername: username
      })
      
    }else{//点击上一级姓名进入
      if(index == 0){//如果点击的是第一个上级名称则清除上级名称数组
        that.setData({
          //learderName: [],
          otherusername: ''
        })
        that.data.learderName = that.data.learderName.slice(0, 1)
        that.setData({
          learderName: that.data.learderName
        })
      }else{//删除掉所点击之后的上级名称
        that.data.learderName = that.data.learderName.slice(0, index + 1)
        that.setData({
          learderName: that.data.learderName,
          otherusername: username
        })
      }
    }
    that.getMyTeamKQTJ()
  },
  //查看详情
  checkDetail(e){
    let userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: `/pages/clockingIn/clockDetail/clockDetail?userid=${userid}&teamEndTime=${this.data.teamEndTime}&teamStartTime=${this.data.teamStartTime}&username=${e.currentTarget.dataset.username}`
    })
  }
})