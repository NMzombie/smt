var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isphone: true,
    ispass: false,
    phone: '',//225
    password: '',//liufei18557511867
    finish: false,
    error: false,
    errmessage: '',
    isshowpwd: true,//是否显示密码
    foundphone: '',//输入手机号
    code:'',
  },
  renderuser: function (e) {
    let that = this;
    wx.showLoading({
      title: '登录中',
    })
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    
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
  getPhone: function (e) {
    this.setData({
      isphone: true,
      ispass: false,
      phone: e.detail.value.replace(/[\u4E00-\u9FA5]/g, '')
    });
    if (this.data.phone != '' && this.data.password != '') {
      this.setData({
        finish: true
      });
    }
  },
  getPassword: function (e) {
    this.setData({
      password: e.detail.value.replace(/[\u4E00-\u9FA5]/g, '')
    });
    if (this.data.phone != '' && this.data.password != '') {
      this.setData({
        finish: true
      });
    }
  },
  passfouse() {//密码聚焦
    this.setData({
      isphone: false,
      ispass: true
    });
  },
  phonefouse() {//账号聚焦
    this.setData({
      isphone: true,
      ispass: false
    });
  },
  clearValue(e) {//清除账号密码
    let type = e.currentTarget.dataset.type;
    if (type == '1') {//1 清除手机号码  2 清除密码
      this.setData({
        phone: ''
      });
    } else {
      this.setData({
        password: ''
      });
    }
  },
  // 点击登录 进行登录
  loginIn(code){
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          app.wxApi.loginIn({ loginname: that.data.phone, loginpass: that.data.password, Wxcode: res.code }).then(res => {
            if (res.ResultCode == 1) {
              wx.setStorageSync("userId", res.Value.Username)
              wx.setStorageSync("username", res.Value.Xm)
              wx.setStorageSync("loginNum", that.data.phone)
              wx.setStorageSync("mail_num", res.Value.Mail_num)
              wx.setStorageSync("Department", res.Value.Department),
                wx.switchTab({
                  url: '/pages/home/home/home'
                })
            } else {
              wx.showToast({
                title: '账号密码有误',
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 账号
    //  106  19850125  2090209150747200
    //  107  86510221  2050718115024513
    //  108  685169  2050718115039763
    //  109  143557  2091106143557997
    
  },
  
})

