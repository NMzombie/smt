var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:'',                                           //学校代码
    startTime:'',                                        //开始时间
    endTime:'',                                          //结束时间
    infoList:[],                                         //信息数组
    startTime: formatTime.formatTime(new Date()),        //时间控件开始吧时间
    endTime: formatTime.formatTime(new Date()),          //时间控件结束时间
    signInTitle:["时间","签到人","目的","维护分类","备注"], //表格表头显示内容
    schoolname:'',                                        //当前学校名称
    tab:1,                                                //1 从学校签到点击进入  2 从我的点击进入查看报表
    flag:1,                                               //1 日报 2周报  3 月报
    totalPage:'',                                         //翻页时的总页数
    page:1,
    schoolSign:1,                                         //1 学校签到   0 学校未签到   
    region: ['全部', '全部'],                              // 默认显示地区
    customItem: '全部' ,                                   
    multiArray: [],                                        //picker显示需要的数组
    multiIndex: [0, 0],                                    //当前选中的下标
    cityParams:'',                                         //选中的城市 需要传给接口的参数
    depart:[],                                             //部门
    BmCode:'',                                             //选中的部门
    departText: ['全部'],
    index:0,                                                //当前选中的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,8888)
    this.setData({
      tab: options.tab
    })
    if(options.tab == 1){
      this.setData({
        school: options.school,
        schoolname: options.schoolname,
      })
    }
    
    if (options.tab == 3){
      console.log(options)
      this.setData({
        schoolSign: options.signFlag
      })
      this.getCity()
      
    } 
    if (options.tab == 4) {
      console.log(options)
      this.getBumeng()

    }
    this.getData();
   
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
    if (this.data.tab == 1) {
      wx.setNavigationBarTitle({
        title: this.data.schoolname
      })
    } else if (this.data.tab ==2){
      wx.setNavigationBarTitle({
        title: '我收到的日报'
      })
    } else if(this.data.tab == 2){

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
  // 获得学校签到信息
  getMyTeamQD() {
    app.wxApi.getMyTeamQD({ Stime: this.data.startTime, Etime: this.data.endTime, School: this.data.school}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          infoList:res.Value.List
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
  //选择日期
  // dateType 1 表示开始时间  2 结束时间
  chooseDate(e) {
    let dateType = e.target.dataset.datetype;
    if (dateType == 1) {  //开始时间
      this.setData({
        startTime: e.detail.value,
      })

    } else {
      if (this.compareDate(this.data.startTime, e.detail.value)) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.setData({
        endTime: e.detail.value,
      })
    }
    this.getData();
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
  //根据条件请求接口
  getData(){
    this.setData({
      infoList: [],
      page:1
    })
    if(this.data.tab == "1"){//从学校签到点击查看信息
      this.setData({
        signInTitle: ["时间", "签到人", "目的", "维护分类", "备注"],
      })
      this.getMyTeamQD();
    } else if(this.data.tab == "2"){//从我的点击进入查看报表
        
        if(this.data.flag == "1"){
          this.setData({
            signInTitle: ["填报人", "填报时间", "今日完成工作", "未完成工作", "需要跟进的工作", "小结"],
          })
          wx.setNavigationBarTitle({
            title: '我收到的日报'
          })
        } else if (this.data.flag == "2"){
          this.setData({
            signInTitle: ["填报人", "填报时间", "本周完成工作", "下周计划工作", "需要跟进的工作", "小结"],
          })
          wx.setNavigationBarTitle({
            title: '我收到的周报'
          })
        }else{
          this.setData({
            signInTitle: ["填报人", "填报时间", "本月完成工作", "本月工作问题", "需要部门协调问题", "小结"],
          })
          wx.setNavigationBarTitle({
            title: '我收到的月报'
          })
        }
      
        this.getDiaryReport();
    } else if(this.data.tab == "3") {//从我的统计中我的签到和学校未签到点击进入  signFlag = 1 学校签到  signFlag = 0 学校未签到
        this.setData({
          signInTitle: ["区域", "学校", "签到次数"],
        })
        this.geSchoolQDCount();

    } else if (this.data.tab == "4") {//从我的统计中客户经理签到点击进入
      this.setData({
        signInTitle: ["部门", "客户经理", "签到次数", "日报提交次数", "周报提交次数"],
      })
      this.geKhjlQDCount();
    }
  },
  //获取日志报表接口
  getDiaryReport(){
    app.wxApi.getDiaryReport({ Stime: this.data.startTime, Etime: this.data.endTime, Page:this.data.page,Flag:this.data.flag }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          infoList: this.data.infoList.concat(res.Value.List),
          totalPage: res.Value.TotalPage
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
  //改变日志类型  1：日报  2：周报  3：月报
  changeTab(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      flag: e.currentTarget.dataset.flag,
      page:1,
      infoList:[],
    })
    this.getData();
  },
  //加载更多
  addMore(){
    if (this.data.page < this.data.totalPage){
      this.setData({
        page: this.data.page +1,
      })
      if (this.data.tab == "1") {//从学校签到点击查看信息
        this.getMyTeamQD();
      } else if (this.data.tab == "2") {//从我的点击进入查看报
        this.getDiaryReport();
      } else if (this.data.tab == "3") {//从我的统计中我的签到和学校未签到点击进入  signFlag = 1 学校签到  signFlag = 0 学校未签到
        this.geSchoolQDCount();
      } else if (this.data.tab == "4") {//从我的统计中客户经理签到点击进入
        this.geKhjlQDCount();
      }
    }
  },
  //从我的统计中我的签到和学校未签到点击进入  signFlag=1 学校签到  signFlag=0 学校未签到
  geSchoolQDCount(){
    app.wxApi.geSchoolQDCount({ Stime: this.data.startTime, Etime: this.data.endTime, Page: this.data.page, Flag: this.data.schoolSign,City:this.data.cityParams }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          infoList: this.data.infoList.concat(res.Value.List),
          totalPage: res.Value.TotalPage
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
  //获取地区
  getCity(){
    app.wxApi.getCity().then(res => {
      if (res.ResultCode == 1) {
        //组装基本地区
        let cityData=[{
            province:'浙江',
            city:[]
          },{
            province: '湖南',
            city: []
          }, {
            province: '安徽',
            city: []
          }, {
            province: '海南',
            city: []
          }];
        
        res.Value.forEach((item,index)=>{
          if (item.Province == '浙江'){
            cityData[0].city.push(item.brief)
          } else if (item.Province == '湖南') {
            cityData[1].city.push(item.brief)
          } else if (item.Province == '安徽') {
            cityData[2].city.push(item.brief)
          } else if (item.Province == '海南') {
            cityData[3].city.push(item.brief)
          }
        })
        
        this.setData({
          city: cityData,
          multiArray: [['浙江', '湖南', '安徽', '海南'], cityData[0].city]
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
  //当帅选地区变更时
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0){//当改变的值为第一列时
      var data = {
        multiArray: this.data.multiArray
      };
      //console.log(e.detail.value)
      data.multiArray[1] = this.data.city[e.detail.value].city;//根据第一列的值改变第二列的值
      this.setData(data);
    }
   
  },
  //选择地区点击确认
  bindRegionChange: function (e) {
   // console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log(this.data.city[e.detail.value[0]])
    this.setData({
      region: [this.data.city[e.detail.value[0]].province,this.data.city[e.detail.value[0]].city[e.detail.value[1]]],
      cityParams: this.data.city[e.detail.value[0]].city[e.detail.value[1]],
      infoList: [],
      page:1
    });

    this.geSchoolQDCount();
  },

  //获取部门
  getBumeng(){
    this.setData({
      departText:[]
    })
    app.wxApi.getBumeng().then(res => {
      if (res.ResultCode == 1) {
        let departT = [];
        res.Value.forEach((item,index)=>{
          departT.push(item.BmName)//获取部门文字
        })
        this.setData({
          depart:res.Value,
          departText: departT
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
  
  //获取客户经理使用统计接口
  geKhjlQDCount(){
    app.wxApi.geKhjlQDCount({ BmCode: this.data.BmCode, Stime: this.data.startTime, Etime: this.data.endTime, Page: this.data.page,}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          infoList: this.data.infoList.concat(res.Value.List),
          totalPage:res.Value.TotalPage
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

  //改变部门
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      infoList: [],
      page: 1,
      BmCode:this.data.depart[e.detail.value].BmCode
    })

    this.geKhjlQDCount();

  },
})