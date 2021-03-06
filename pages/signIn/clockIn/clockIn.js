var app = getApp();
import formatTime from "../../../utils/util.js";
var bmap = require('../../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: formatTime.formatTime(new Date(),true),         //当前时间到秒
    schoolInfo:'',                                               //选中学校的数据   
    purposeInfo: '',                                              //选中拜访目的的数据   
    linkManInfo: '',                                              //选中联系人的数据   
    typeInfo: [],                                                //选中维护分类的数据  
    paramsLinkStr:'',                                             //提交签到所需的联系人参数
    typeInfoText:'',                                              //页面显示需要的维护分类 
    address:'',                                                   //所选地址
    textareaVal:'',                                               //备注 
    wxMarkerData: [],                                             //我的位置

    picUrl: [{
      index: '0',
      val: '',
      isshow: true,
      showdele: false
    },],
    submitButton:true,                                           //防止重复提交
    chooseLinkman:true,                                          //是否可以选择联系人
    nextTime: formatTime.formatTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),                //下次拜访时间
    nextPurpose:'',                                              //下次拜访目的
    latitude:'',                                                 //当前位置的经度，自动获取的
    longitude:'',                                                //当前位置的纬度，自动获取的

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.signIn.linkManInfo,777777)
    this.setData({
      schoolInfo: app.globalData.signIn.schoolInfo,
      purposeInfo: app.globalData.signIn.purposeInfo,
      typeInfo: app.globalData.signIn.typeInfo,//去除最后一个字符逗号
      src: app.SRC,
      currentTime: formatTime.formatTime(new Date(), true),         //当前时间到秒
      textareaVal:app.globalData.signIn.bzVal,
      linkManInfo: app.globalData.signIn.linkManInfo.linkStr.substring(0, app.globalData.signIn.linkManInfo.linkStr.lastIndexOf(',')),//去除最后一个字符逗号
     
      paramsLinkStr: app.globalData.signIn.linkManInfo.paramsLinkStr.substring(0, app.globalData.signIn.linkManInfo.paramsLinkStr.lastIndexOf(',')),//去除最后一个字符逗号
    })
    if (app.globalData.signIn.picArr.length != 0){
      this.setData({
        picUrl: app.globalData.signIn.picArr
      })
    }
    let typeInfoText = '';
    this.data.typeInfo.forEach(item=>{
      typeInfoText += item.classname + ','
    })
    this.setData({
      typeInfoText: typeInfoText.substring(0, typeInfoText.lastIndexOf(','))

    })
    if (this.data.schoolInfo.ifspecial == "1"){
      this.setData({
        chooseLinkman:false
      })
    }else{
      chooseLinkman: true
    }
    if (app.globalData.signIn.address != ''){
      this.setData({
        address: app.globalData.signIn.address.address,
        latitude: app.globalData.signIn.address.latitude,
        longitude: app.globalData.signIn.address.longitude
      })
    }else{
      var that = this;
      var BMap = new bmap.BMapWX({
        ak: '2iUe0mxDF8B0997GLkGLrnGtvuCftAUl',
      });

      // 获取我的当前位置 失败
      var myfail = function (data) {

      };
      // 获取我的当前位置 成功
      var mysuccess = function (data) {
        that.setData({
          address: data.wxMarkerData[0].address,
          latitude: data.wxMarkerData[0].latitude,
          longitude: data.wxMarkerData[0].longitude
        })
        app.globalData.signIn.address = {
          address: that.data.address,
          latitude: that.data.latitude,
          longitude: that.data.longitude
        }
        //mapInfo.concat(data.wxMarkerData)
      }
      BMap.regeocoding({
        fail: myfail,
        success: mysuccess,
      });
    }
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
  //  获取学校和拜访目的   + '&city=' + this.data.schoolInfo.School
  getList(e){
    let type = e.currentTarget.dataset.type;
    wx.redirectTo({
      url: '/pages/signIn/schoolSignIn/schoolSignIn?getItem=true&type=' + type + '&latitude=' + this.data.latitude + '&longitude=' + this.data.longitude
    })
  },
  //获取联系人
  renderLinkMan(){
    if (this.data.schoolInfo == ''){
      wx.showToast({
        title: '请选择学校',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.redirectTo({
      url: '/pages/signIn/linkMan/linkMan?school=' + this.data.schoolInfo.School
    })
  },
  //跳转到维护分类
  renderType(){
    wx.redirectTo({
      url: '/pages/signIn/whType/whType'
    })
  },


  addpic: function (event) { //添加图片
    let that = this;
    let index = event.currentTarget.dataset.index;
    
    if (index < 8) {
      if (that.data.picUrl[index].val == '') { //添加图片
        wx.chooseImage({ //添加图片
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            if (res.tempFiles[0].size > 1024 * 10240) {
              wx.showToast({
                title: '图片不能超过10M',
                icon: 'none',
                duration: 2500
              })
              return;
            }
            //console.log();
            let picarr = that.data.picUrl;
            let picUrlStr = "picUrl[" + index + "].val";
            let deleshow = "picUrl[" + index + "].showdele";
            if (picarr.length < 8) { //长度不超过9
              let itemData = {
                'val': '',
                'isshow': true,
                'showdele': false
              };
              picarr.push(itemData);
              app.wxApi.uploadImg({file1: res.tempFilePaths[0]}, res.tempFilePaths[0]).then(res=>{
               //上传图片
                if (res.ResultCode == 1) {
                  that.setData({
                    [picUrlStr]: res.Value.Picurl,
                    [deleshow]: true,
                    picUrl: picarr
                  });
                  app.globalData.signIn.picArr = picarr
                } else {
                  wx.showToast({
                    title: res.ResultMessage,
                    icon: 'none',
                    duration: 1000
                  })
                }
              });
            } else { //图片为9张
              app.wxApi.uploadImg({ file1: res.tempFilePaths[0] }, res.tempFilePaths[0]).then(res => {
                //上传图片
                if (res.ResultCode == 1) {
                  that.setData({
                    [picUrlStr]: res.Value.Picurl,
                    [deleshow]: true,
                  });
                  app.globalData.signIn.picArr = picarr
                } else {
                  wx.showToast({
                    title: res.ResultMessage,
                    icon: 'none',
                    duration: 1000
                  })
                }
              });
            }
          }
        })
      } else { //预览图片
        wx.previewImage({ //预览图片
          current: '', // 当前显示图片的http链接
          urls: [this.data.src+that.data.picUrl[index].val] // 需要预览的图片http链接列表
        })
      }
    }
  },

  deletePic: function (event) { //删除图片

    var that = this;
    var index = event.currentTarget.dataset.index;
    let picarr = that.data.picUrl;
    picarr.splice(index, 1);

    if (picarr[picarr.length - 1].val != '') {
      let itemData = {
        'val': '',
        'isshow': true,
        'showdele': false
      };
      that.data.picUrl.push(itemData);
    }
    that.setData({
      picUrl: that.data.picUrl
    });
    let picArr = [];
    that.data.picUrl.forEach(function (item, index) {
      if (item.val != '') {
        picArr.push(item.val);
      }
    });
    that.setData({
      picArr: picArr
    });
    //console.log(that.data.picUrl)
  },
  //得到备注
  getTextarea(e){
    this.setData({
      textareaVal:e.detail.value
    })
    app.globalData.signIn.bzVal = e.detail.value
  },
  // 提交签到
  finish(e){
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId }).then(res => {

    })
    this.setData({
      submitButton:false
    })
    let typeInfoParams = '';
    this.data.typeInfo.forEach((item,index)=>{
      if (index != this.data.typeInfo.length -1){
        typeInfoParams += item.cid + ',';
      }else{
        typeInfoParams += item.cid
      }
     
    })
    let picUrl = '';
    this.data.picUrl.forEach((item, index)=>{
      if (item.val != '') {
        //if (index != this.data.typeInfo.length - 1) {
          picUrl += item.val + '|';
        //}else{
        //  picUrl += item.val;
       // }
      }
    })
    
    if (this.data.address == '') {
      wx.showToast({
        title: '地址不能为空~',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        submitButton: true
      }) 
      return;
    }
    if (this.data.schoolInfo == '') {
      wx.showToast({
        title: '学校不能为空~',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        submitButton: true
      }) 
      return;
    }
    if (this.data.purposeInfo == '') {
      wx.showToast({
        title: '目的不能为空~',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        submitButton: true
      }) 
      return;
    }
    if (this.data.paramsLinkStr == '') {
      wx.showToast({
        title: '联系人不能为空~',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        submitButton: true
      }) 
      return;
    }
    if (typeInfoParams == '') {
      wx.showToast({
        title: '分类不能为空~',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        submitButton: true
      }) 
      return;
    }
   
    let params ={
      Mail_num: wx.getStorageSync('mail_num'),
      Xm: wx.getStorageSync('username'),
      School: this.data.schoolInfo.School,
      SchoolName: this.data.schoolInfo.Schoolname,
      QdTime: formatTime.formatTime(new Date(), true),
      QdAddress: this.data.address,
      visitPurpseID: this.data.purposeInfo.Pid,
      linkMan:this.data.paramsLinkStr,
      cid:typeInfoParams,
      bz: this.data.textareaVal,
      picUrl: picUrl.substring(0, picUrl.lastIndexOf('|')),
      NextTime: this.data.nextTime,
      NextBz: this.data.nextPurpose
    }
    app.wxApi.SubmitQD(params).then(res => {
      if (res.ResultCode == 1) {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '/pages/signIn/home/home',
        })
        formatTime.initFun();
        this.setData({
          submitButton: true
        })  
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          submitButton: true
        }) 
      }
    })
  },
  
  bindKeyInput(e){
    this.setData({
      paramsLinkStr:e.detail.value
    })
    app.globalData.signIn.linkManInfo.paramsLinkStr = e.detail.value+',';
    app.globalData.signIn.linkManInfo.linkStr = e.detail.value + ',';
  },
  //选择时间 ，时间值改变
  chooseDate(e) {
    this.setData({
      nextTime: e.detail.value,
    })
  },
  //下次拜访内容
  getNextPurpose(e){
    this.setData({
      nextPurpose: e.detail.value
    })
  },
  //输入学校名称
  bindKeySchool(e) {
    let Schoolname = 'schoolInfo.Schoolname'
    this.setData({
      [Schoolname]: e.detail.value
    })
  },
})