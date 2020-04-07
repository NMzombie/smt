var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',                                          //城市名称
    schoolList:[],                                    //学校数组
    baseSchoolSignIn:[],
    searchVal: '',                                     //输入框搜索的值
    getItem:false,                                     //点击单个信息是否需要跳转到签到提交页面
    type:1,                                            //1  获取学校   2 获取拜访目的
    currentPage:1,                                     //当前页数
    total:"",                                           //总页数
    latitude:'',
    longitude:'',
    msxxlist:[],                                       //陌生学校list
    edit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.city,888)
    this.setData({
      city: typeof (options.city) == 'undefined' ? '' : options.city,
      getItem: options.getItem ? true :false,
      type:options.type,
      longitude: options.longitude ? options.longitude : '',
      latitude: options.latitude ? options.latitude : '',
      edit:options.edit ? true : false
    })
    if (this.data.type == 1){//获取学校
      this.setData({
        ifMsxx: 1
      })
      this.getSchool();
      this.setData({
        ifMsxx: 0
      })
      this.getSchool();
    }else{//获取拜访目的
      
      if (app.globalData.purpose.length == 0) {//如果app里没有数据则请求接口
        this.getPurpuse();
      } else {//否则直接取数据 赋值
        this.setData({
          schoolList: app.globalData.purpose,
          baseSchoolSignIn: app.globalData.purpose
        })
      }
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
  // 获取学校
  getSchool(){
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.ifMsxx == 1){
      app.wxApi.getSchool({ x: this.data.longitude, y: this.data.latitude, ifMsxx: this.data.ifMsxx,City: this.data.city }).then(res => {
        if (res.ResultCode == 1) {
          this.setData({
            msxxlist: res.Value.List,
          })
        wx.hideLoading()
      } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      app.wxApi.getSchool({ x: this.data.longitude, y: this.data.latitude, ifMsxx: this.data.ifMsxx, City: this.data.city }).then(res => {
        if (res.ResultCode == 1) {
          this.setData({
            schoolList: res.Value,
            baseSchoolSignIn: res.Value,
            //total: res.Value.TotalPage
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    
  },
  //跳转到信息表格
  renderPage(e){
    if (this.data.getItem){//跳转到签到页面
      if (this.data.type == 1) {
        app.globalData.signIn.schoolInfo = e.currentTarget.dataset.iteminfo;
        app.globalData.signIn.linkManInfo.linkStr ='';
        app.globalData.signIn.linkManInfo.paramsLinkStr = '';
        app.globalData.linkMan = [];
        
      } else if (this.data.type == 2) {
        app.globalData.signIn.purposeInfo = e.currentTarget.dataset.iteminfo
      }
      if (this.data.edit == true){
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.redirectTo({
          url:'/pages/signIn/clockIn/clockIn'
        })
      }
      
      
      
    }else{//跳转到表格页面
      wx.navigateTo({
        url: '/pages/signIn/schoolSigninDetail/schoolSigninDetail?schoolcode=' + e.currentTarget.dataset.school + "&schoolname=" + e.currentTarget.dataset.schoolname+'&tab=' +1
      })
    }
   
  },
  //搜索
  search(e) {
    this.setData({
      searchVal: e.detail.value
    })
    //console.log(this.data.schoolList, 77777777777, e.detail.value)
    if (this.data.searchVal != '') {
      let resArr = [];
      this.data.schoolList.find((item, index) => {
        if (item.Schoolname.indexOf(this.data.searchVal) > -1) {
          resArr.push(item)
        }
      })
      this.setData({
        schoolList: resArr
      })
    } else {
      this.setData({
        schoolList: this.data.baseSchoolSignIn
      })
    }

  },
  //获取拜访目的
  getPurpuse(){
    app.wxApi.getPurpuse().then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          schoolList: res.Value,
          baseSchoolSignIn: res.Value

        })
        app.globalData.purpose = res.Value;
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // addMore(){
  //   console.log(444444)
  //   if (this.data.currentPage < this.data.total) {
  //     this.setData({
  //       currentPage: this.data.currentPage + 1
  //     })
  //     this.getSchool()
  //   }
  // }
})