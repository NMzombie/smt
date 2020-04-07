var app = getApp();
import formatTime from "../../../utils/util.js";
var bmap = require('../../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: formatTime.formatTime(new Date(), true),         //当前时间到秒
    schoolInfo: '',                                               //选中学校的数据   
    purposeInfo: '',                                              //选中拜访目的的数据
    typeInfo: [],                                                 //选中维护分类的数据  
    paramsLinkStr: '',                                             //提交签到所需的联系人参数
    typeInfoText: '',                                              //页面显示需要的维护分类 
    address: '',                                                   //所选地址
    textareaVal: '',                                               //备注 
    picUrl: [{
      index: '0',
      val: '',
      isshow: true,
      showdele: false
    },],
    submitButton: true,                                           //防止重复提交
    chooseLinkman: true,                                          //是否可以选择联系人
    nextTime: formatTime.formatTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),                //下次拜访时间
    nextPurpose: '',                                              //下次拜访目的
    latitude: '',                                                 //当前位置的经度，自动获取的
    longitude: '',                                                //当前位置的纬度，自动获取的
    id:'',                                                        //签到Id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.signIn.linkManInfo,777777)
    this.setData({
      // purposeInfo: app.globalData.signIn.purposeInfo,
      // typeInfo: app.globalData.signIn.typeInfo,//去除最后一个字符逗号
      src: app.SRC,
      // currentTime: formatTime.formatTime(new Date(), true),         //当前时间到秒
      // textareaVal: app.globalData.signIn.bzVal,
      // linkManInfo: app.globalData.signIn.linkManInfo.linkStr,//去除最后一个字符逗号
      id: options.id ? options.id : wx.getStorageSync('editId'),
      // nextPurpose:app.globalData.signIn.nextPurpose
    })
    wx.setStorageSync('editId',options.id)
    // if (app.globalData.signIn.picArr.length != 0) {
    //   this.setData({
    //     picUrl: app.globalData.signIn.picArr
    //   })
    // }
    // let typeInfoText = '';
    // this.data.typeInfo.forEach(item => {
    //   typeInfoText += item.classname + ','
    // })
    // this.setData({
    //   typeInfoText: typeInfoText.substring(0, typeInfoText.lastIndexOf(','))

    // })
    // if (this.data.schoolInfo.ifspecial == "1") {
    //   this.setData({
    //     chooseLinkman: false
    //   })
    // } else {
    //   chooseLinkman: true
    // }
    //var that = this;
    // var BMap = new bmap.BMapWX({
    //   ak: '2iUe0mxDF8B0997GLkGLrnGtvuCftAUl',
    // });

    // // 获取我的当前位置 失败
    // var myfail = function (data) {
    //   console.log(data)
    // };
    // 获取我的当前位置 成功
    // var mysuccess = function (data) {
    //   that.setData({
    //     latitude: data.wxMarkerData[0].latitude,
    //     longitude: data.wxMarkerData[0].longitude
    //   })
    // }
    // BMap.regeocoding({
    //   fail: myfail,
    //   success: mysuccess,
    // });

    this.getDetail();
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
    this.setData({
      purposeInfo: app.globalData.signIn.purposeInfo,
      typeInfo: app.globalData.signIn.typeInfo,
    })
    let typeInfoText = '';
    this.data.typeInfo.forEach(item => {
      typeInfoText += item.classname + ','
    })
    this.setData({
      typeInfoText: typeInfoText.substring(0, typeInfoText.lastIndexOf(','))

    })
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
  //  获取学校和拜访目的
  getList(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/signIn/schoolSignIn/schoolSignIn?getItem=true&type=' + type + '&city=' + this.data.schoolInfo.School+'&edit=true'
    })
  },
  //获取联系人
  // renderLinkMan() {
  //   if (this.data.schoolInfo == '') {
  //     wx.showToast({
  //       title: '请选择学校',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //     return;
  //   }
  //   wx.redirectTo({
  //     url: '/pages/signIn/linkMan/linkMan?school=' + this.data.schoolInfo.School
  //   })
  // },
  //跳转到维护分类
  renderType() {
    wx.navigateTo({
      url: '/pages/signIn/whType/whType?edit=true'
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
              app.wxApi.uploadImg({ file1: res.tempFilePaths[0] }, res.tempFilePaths[0]).then(res => {
                //上传图片
                if (res.ResultCode == 1) {
                  that.setData({
                    [picUrlStr]: res.Value.Picurl,
                    [deleshow]: true,
                    picUrl: picarr
                  });
                  console.log(picarr, 182, app.globalData.signIn.picArr)
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
          urls: [this.data.src + that.data.picUrl[index].val] // 需要预览的图片http链接列表
        })
      }
    }
  },

  deletePic: function (event) { //删除图片
    var that = this;
    var index = event.currentTarget.dataset.index;
    let picarr = that.data.picUrl;
    picarr.splice(index, 1);

    console.log()
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
  getTextarea(e) {
    this.setData({
      textareaVal: e.detail.value
    })
    app.globalData.signIn.bzVal = e.detail.value
  },
  // 提交签到
  finish() {
    this.setData({
      submitButton: false
    })
    let typeInfoParams = '';
    this.data.typeInfo.forEach((item, index) => {
      if (index != this.data.typeInfo.length - 1) {
        typeInfoParams += item.cid + ',';
      } else {
        typeInfoParams += item.cid
      }

    })
    let picUrl = '';
    this.data.picUrl.forEach((item, index) => {
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
    if (this.data.linkManInfo == '') {
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

    let params = {
      // Mail_num: wx.getStorageSync('mail_num'),
      // Xm: wx.getStorageSync('username'),
      // School: this.data.schoolInfo.School,
      // SchoolName: this.data.schoolInfo.Schoolname,
      // QdTime: formatTime.formatTime(new Date(), true),
      // QdAddress: this.data.address,
      visitPurpseID: this.data.purposeInfo.Pid,
      linkMan: this.data.linkManInfo,
      cid: typeInfoParams,
      bz: this.data.textareaVal,
      picUrl: picUrl.substring(0, picUrl.lastIndexOf('|')),
      NextTime: this.data.nextTime,
      NextBz: this.data.nextPurpose,
      QdId:this.data.id
    }
    app.wxApi.SubmitModifyQD(params).then(res => {

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

  bindKeyInput(e) {
    this.setData({
      paramsLinkStr: e.detail.value
    })
    app.globalData.signIn.linkManInfo.paramsLinkStr = e.detail.value + ',';
    app.globalData.signIn.linkManInfo.linkStr = e.detail.value + ',';
  },
  //选择时间 ，时间值改变
  chooseDate(e) {
    this.setData({
      nextTime: e.detail.value,
    })
  },
  //下次拜访内容
  getNextPurpose(e) {
    this.setData({
      nextPurpose: e.detail.value
    })
    app.globalData.signIn.nextPurpose = e.detail.value
  },
  //输入学校名称
  // bindKeySchool(e) {
  //   let Schoolname = 'schoolInfo.Schoolname'
  //   this.setData({
  //     [Schoolname]: e.detail.value
  //   })
  // },
  getDetail() {
    app.wxApi.getOne({ Flag: 4, Id: this.data.id }).then(res => {
      if (res.ResultCode == 1) {
        console.log(res.Value.Cids.split(','),767676)
        let typeCid = res.Value.Cids.split(','),
            typename = res.Value.QDClass.split(','),
            typeObj = [];
        typeCid.forEach((item,index)=>{
          typeObj.push({
            classname:typename[index],cid:item
          })
        })
        let linkMan = '';
        res.Value.linkMan.split(';').forEach((item,index)=>{
          linkMan+=item.split(',')[0]+','
        })
        this.setData({
          address: res.Value.QdAddress,
          schoolInfo: { Schoolname: res.Value.SchoolName, School: res.Value.School},
          linkManInfo: res.Value.linkMan,
          textareaVal: res.Value.bz,
          nextPurpose: res.Value.NextBz,
          purposeInfo: { Purpuse: res.Value.visitPurpse, Pid: res.Value.visitPurpseID},
          typeInfoText: res.Value.QDClass,
          typeInfo: typeObj,
          nextTime: res.Value.NextTime == '' ? formatTime.formatTime(new Date()) : formatTime.formatTime(new Date(res.Value.NextTime)),
          linkMan: linkMan
        })
        app.globalData.signIn.purposeInfo = this.data.purposeInfo;
        app.globalData.signIn.typeInfo = this.data.typeInfo;
        // app.globalData.signIn.textareaVal = this.data.textareaVal;
        // app.globalData.signIn.typeInfo = this.data.typeInfo;
        // app.globalData.signIn.linkManInfo = { linkStr: res.Value.linkMan,paramsLinkStr: res.Value.linkMan};

        let picArr = res.Value.picUrl.split('|');
        if (res.Value.picUrl != ''){
          picArr.forEach((item,index)=>{
            this.setData({
              [`picUrl[${index}]`]:{
                index: index,
                val: item.split('.com')[1],
                isshow: true,
                showdele: true
              }
            })  
          })
          if (picArr.length == 8){
              
          }else{
            this.setData({
              [`picUrl[${picArr.length}]`]: {
                index: picArr.length,
                val: '',
                isshow: true,
                showdele: false
              }
            }) 
          }
        }
       // app.globalData.signIn.picArr = picArr
      }else{
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
})