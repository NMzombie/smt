// pages/orderForm/orderFormHome/orderFormHome.js
var app = getApp();
var timer = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrderSelectType: 1, // 1，我的，2，待审批，3，学校
    KeyWord: "", // 搜索框内容
    BalanceWayEnum: [], // 结算方式
    list: [], // 订单列表
    PageIndex: 1, // 分页页数
    PageSize: 20, // 分页条数
    TotalItemCount: 0, // 待审批条数
    loadMore: true, // 用来控制分页加载频率
    keyInfo: { key1: null, }, // 用来纪录每个下拉框选中的索引
    listHeight: wx.getSystemInfoSync().windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('DDAddOrEdit',false); // 用来控制页面是否重新获取数据
    setTimeout(() => {
      this.getTotalItemCount();
    },500)
    if (options.KeyWord){
      this.setData({
        KeyWord: options.KeyWord
      })
    }else{
      this.setData({
        KeyWord: ''
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDDList(1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var { BalanceWayEnum, } = app.globalData;
    this.isNeddHttp(BalanceWayEnum, 'BalanceWayEnum');
    var DDAddOrEdit = wx.getStorageSync('DDAddOrEdit');
    if (!!DDAddOrEdit) {
      this.setData({
        loadMore: true,
        list: [],
      })
      this.getDDList(1);
    }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("滑动加载")
    this.getDDList();
  },

  /**
   * 获取订单列表
   */
  getDDList: function (page, type) {
   
    var { list, PageSize, PageIndex, KeyWord, loadMore, keyInfo, OrderSelectType, BalanceWayEnum, TotalItemCount, } = this.data;
   
    if (!loadMore) { return; }
    wx.showLoading();
    let info = {
      KeyWord:KeyWord,
      PageSize,
      PageIndex: page || PageIndex,
      OrderSelectType: type || OrderSelectType,
    };
    if (typeof (keyInfo.key1) == 'number') {
      info['BalanceWay'] = [];
      info['BalanceWay'].push(BalanceWayEnum[keyInfo.key1].Value)
    }

    app.wxApi.OrderList(info).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var page = this.data.PageIndex;
      if (ResultCode == 1) {
        this.setData({
          list: [...list, ...Value.List],
          TotalItemCount: info.OrderSelectType == 2 ? Value.TotalItemCount : TotalItemCount,
        })
        if (Value.List.length >= this.data.PageSize) {
          page++;
          this.setData({
            PageIndex: page,
            loadMore: true,
          });
        } else {
          this.setData({ loadMore: false, });
        }
        wx.hideLoading()
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  getTotalItemCount: function() {
    var { TotalItemCount, Keyword } = this.data;

    let info = {
      Keyword:'',
      PageSize: 20,
      PageIndex: 1,
      OrderSelectType: 2,
    };
    app.wxApi.OrderList(info).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          TotalItemCount: Value.TotalItemCount,
        })
      }
    })
  },

  // 获取可枚举的属性
  getDictionary: function (key) {
    app.wxApi.GetDictionary({ key, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        Value.unshift({ Des: '请选择', Value: 0 })
        this.setData({ [key]: Value, });
        app.globalData[key] = Value;
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
        'BalanceWayEnum': () => {
          this.getDictionary('BalanceWayEnum'); // 获取结算方式
        },
      }
      info[target]();
    }
  },

  /**
   * 订单列表tab切换
   */
  switchTab: function (e) {
    !!timer && clearTimeout(timer);
    timer = setTimeout(() => {
      var OrderSelectType = e.target.dataset.type
      this.setData({
        OrderSelectType,
        loadMore: true,
        list: [],
      })
      this.getDDList(1, OrderSelectType);
    },500)
  },

  /**
   * 搜索订单名称start
   */
  inputTyping: function (e) {
    this.setData({
      KeyWord: e.detail.value,
    })
  },

  toSearch: function () {
    this.setData({
      loadMore: true,
      list: [],
    })
    this.getDDList(1, this.data.OrderSelectType);
  },
  /**
   * 搜索订单名称end
   */

  // 选中下拉框
  bindPickerChange: function (e) {
    var newKeyInfo = this.data.keyInfo;
    var key = parseInt(e.detail.value);
    var target = {
      'BalanceWayEnum': () => {
        newKeyInfo['key1'] = key;
        return newKeyInfo;
      },
    }
    var info = target[e.target.dataset.type]();
    this.setData({
      keyInfo: info,
      loadMore: true,
      list: [],
      PageIndex: 1,
    })
    this.getDDList();
  },

  // 跳转订单详情页面
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/orderForm/orderFormDetail/orderFormDetail?id=" + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type
    })
  },

  // 跳转新建订单页面
  toAddSj: function () {
    wx.navigateTo({
      url: "/pages/orderForm/orderFormAdd/orderFormAdd"
    })
  },

  // 修改订单
  editSj: function (e) {
    wx.navigateTo({
      url: "/pages/orderForm/orderFormEdit/orderFormEdit?id=" + e.currentTarget.dataset.id
    })
  },


  // 删除订单
  delDD: function (e) {
    var { item } = e.currentTarget.dataset;
    if (item.IfAudit == 1) {
      app.showToast('审批已同意的订单不能删除!');
      return;
    }
    if (item.OrderAuditList && item.OrderAuditList.length > 0) {
      var auditList = item.OrderAuditList;
      for (let i = 0; i < auditList.length;i++){
        if (auditList[i].IfAudit == 1) {
          app.showToast('已存在审批同意的流程不能进行删除!');
          return;
        }
      }
    }

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (sm) => {
        if (sm.confirm) {
          this.delDDSub(item.Id);
        }
      }
    })
  },

  delDDSub: function (id) {
    wx.showLoading();
    app.wxApi.DeleteOrder({ id }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var page = this.data.PageIndex;
      if (ResultCode == 1) {
        this.setData({ loadMore: true,list: [], })
        this.getDDList(1);
        wx.hideLoading();
      } else {
        app.showToast(ResultMessage);
      }
    })
  },
})