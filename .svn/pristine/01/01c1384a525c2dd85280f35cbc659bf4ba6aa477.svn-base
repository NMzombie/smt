// pages/home/addressList/addressList.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:'',             //输入框搜索的值
    addressList:[],           // 页面显示的数据
    baseAddressList:[],       // 原始数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyAddressBook()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
    /**
   * 搜索
   */
  search(e){
    this.setData({
      searchVal:e.detail.value
    })
    if (this.data.searchVal != ''){
      let resArr = [];
      this.data.addressList.find((item, index) => {
        if (item.Xm.indexOf(this.data.searchVal) > -1){
          resArr.push(item)
        }
      })
      console.log(resArr,39)
      this.setData({
        addressList: resArr
      })
    }else{
      this.setData({
        addressList: this.data.baseAddressList
      })
    }
    
  },
  // 获取联系人
  getMyAddressBook() {
    app.wxApi.getMyAddressBook().then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          addressList: res.Value,
          baseAddressList: res.Value
        })
      }
    })
  },
  // 拨打电话
  call(e){
    if (e.currentTarget.dataset.number == '0'){
      wx.showToast({
        title: '手机号不对',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number // 
    })
  }

})