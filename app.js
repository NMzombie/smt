//app.js
// 全局引入接口文件
var wxApi = require('./utils/fetch.js');
var task = require('./utils/task.js');
var device = require('./utils/device.js');
App({
  wxApi: wxApi,
  task:task,
  device:device,
  //SRC:'http://www.yd-jxt.com/',//显示图片所需要的地址
  SRC:'https://i.yd-jxt.com',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {
      userId:''
    },
 
    /************************  这些数据退出时 需要清空  开始**************************************/
    signIn:{// 提交签到所需信息
      schoolInfo: '',                                               //选中学校的数据   
      purposeInfo: '',                                              //选中拜访目的的数据   
      linkManInfo: {                                                //选中联系人的数据   
        linkStr:'',//展示页面
        paramsLinkStr:''//传给接口
      },                                              
      typeInfo: [],                                                //选中维护分类的数据 
      address:'',                                                  //根据地图所选的地址
      picArr:[],                                                    //选中图片的数组
      bzVal:'',                                                      //备注
      nextPurpose:'',                                                //下次拜访备注
      
    },
    school:[],                                                      //签到页面获取的学校信息  避免每次都请求
    purpose:[],                                                     //签到页面获取的拜访目的的信息，避免每次都请求
    linkMan: [],                                                     //签到页面获取的联系人的信息，避免每次都请求
    type: [],                                                       //签到页面获取的维护分类信息，避免每次都请求

   
    writeDiary:{
      linkMan:[],                                                    //提交写日志时所选的联系人
    },

    schoolInfo: {}, // 存放商机，订单中选中的学校信息
    schoolList: [], // 存放商机，订单中的学校信息
    orderAuditList: [], // 存放审核流程列表
    sprUserList: [], // 存放审核人列表
    BalanceWayEnum: [], // 存放结算方式
    SellStepEnum: [], // 存放销售阶段
    SellLinkWayEnum: [], // 存放联系情况
    DDDetailInfo: {}, // 存放订单详情信息

    /************************  结束  **************************************/
  },

  // toast
  showToast: function (title, icon = 'none') {
    wx.showToast({
      title: title || '暂无提示',
      icon,
    })
  },

})
