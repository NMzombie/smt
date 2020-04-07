// pages/sj/followUp/followUp.js
import formatTime from "../../../utils/util.js"
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null, // 商机id
    SJBH: null, // 商机编号
    IfOK: 0, // 0,待成单，1，成单，2，未成单
    keyInfo: { key1: 0, key2: 0, }, // 用来纪录每个下拉框选中的索引
    SJName: '', // 商机名称
    SchoolName: '', // 所属学校
    SellStepEnum: [], // 销售阶段
    SellLinkWay: 0, // 联系情况id
    SellLinkWayEnum: [], // 联系情况
    NowTime: formatTime.formatTime(new Date()),
    LastFollowTime: formatTime.formatTime(new Date()),
    FollowupTime: formatTime.formatTime(new Date()),
    FollowupBz: '', // 跟进内容
    FollowUpList: [], // 商机跟进列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { id } = options;
    if (!id) return;
    this.setData({ Id: id });
    this.getBusiness(id); // 获取商机详情
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setStorageSync("sjAddOrEdit", false);
    var { schoolInfo, SellStepEnum, SellLinkWayEnum, } = app.globalData;
    this.isNeddHttp(SellLinkWayEnum, 'SellLinkWayEnum');// 联系情况
    this.isNeddHttp(SellStepEnum, 'SellStepEnum');// 销售阶段
  },

  // 获取商机详情
  getBusiness: function (Id = 0) {
    var newKeyInfo = this.data.keyInfo;
    app.wxApi.GetBusiness({ Id }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        newKeyInfo['key1'] = Value.SellStep - 1;
        newKeyInfo['key2'] = Value.SellLinkWay - 1;
        this.setData({
          IfOK: Value.IfOK,
          SJBH: Value.SJBH,
          SJName: Value.SJName,
          SellLinkWay: Value.SellLinkWay,
          keyInfo: newKeyInfo,
          SchoolName: Value.Schoolname,
          FollowupBz: Value.FollowupBz ? Value.FollowupBz : '',
          LastFollowTime: formatTime.formatTime(new Date(Value.LastFollowTime)),
        })
        wx.setNavigationBarTitle({
          title: Value.SJName
        })
        this.getFollowUpList(Value.SJBH);
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 获取数据字典
  getDictionary: function (key) {
    app.wxApi.GetDictionary({ key, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({ [key]: Value, });
        app.globalData[key] = Value;
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 获取商机跟进列表
  getFollowUpList: function (SJBH) {
    app.wxApi.BusinessFollowUpList({ SJBH, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          FollowUpList: Value,
        })
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //避免多次请求造成资源浪费
  isNeddHttp: function (data, target) {
    if (data.length > 0) {
      this.setData({
        [target]: data,
      })
    } else {
      var info = {
        'SellStepEnum': () => {
          this.getDictionary('SellStepEnum');
        },
        'SellLinkWayEnum': () => {
          this.getDictionary('SellLinkWayEnum');
        },
      }
      info[target]();
    }
  },

  // 选中下拉框
  bindPickerChange: function (e) {
    var newKeyInfo = this.data.keyInfo;
    var target = {
      'SellStepEnum': function () {
        newKeyInfo['key1'] = parseInt(e.detail.value);
        return newKeyInfo;
      },
      'SellLinkWayEnum': function () {
        newKeyInfo['key2'] = parseInt(e.detail.value);
        return newKeyInfo;
      },
    }
    var info = target[e.target.dataset.type]();
    this.setData({
      keyInfo: info,
    })
  },

  // 选择日期
  chooseDate: function (e) {
    this.setData({
      FollowupTime: e.detail.value,
    })
  },
  cancleDate: function () {
    console.log(2)
  },

  // 输入跟进内容
  inputContent: function (e) {
    this.setData({
      FollowupBz: e.detail.value,
    })
  },

  // 提交跟进
  formSubmit: function (e) {
    var {
      Id, SJBH, keyInfo, IfOK,
      FollowupTime, FollowupBz, 
      SellLinkWay, SellStepEnum, SellLinkWayEnum,
    } = this.data;
    if (FollowupBz.length < 10) {
      app.showToast('跟进说明最小字数10');
      return;
    }
    let info = {
      Id,
      SJBH,
      FollowupTime,	
      FollowupBz,
      SellStep: typeof (keyInfo.key1) == 'number' ? SellStepEnum[keyInfo.key1].Value : '',
      SellLinkWay: IfOK == 1 ? SellLinkWay : typeof (keyInfo.key2) == 'number' ? SellLinkWayEnum[keyInfo.key2].Value : '',
    };
    app.wxApi.BusinessFollowUp(info).then(res => {
      var { ResultMessage, ResultCode, } = res;
      app.showToast(ResultMessage);
      if (ResultCode == 1) {
        wx.setStorageSync("sjAddOrEdit", true);
        setTimeout(() => {
          wx.navigateBack();
        }, 300)
      }
    })
  },
})