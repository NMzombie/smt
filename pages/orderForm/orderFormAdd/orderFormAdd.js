// pages/orderForm/orderFormAdd/orderFormAdd.js
import formatTime from "../../../utils/util.js"
var app = getApp();
var timer = null,timer2 = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    School: '', // 学校编号
    SchoolId: '', // 第三方学校id
    SchoolName: '', //学校名称
    HTBH: '', //合同编号
    SJBH: '', // 商机编号
    SJList: [], // 商机列表
    HTList: [], // 合同列表
    DDBH: '', // 订单编号
    DDList: [], // 订单列表
    BalanceWayEnum: [], // 结算方式
    DDName: '', // 项目名称
    PartyA: '', // 甲方
    PartyB: '杭州天音', // 乙方
    Area: '', // 客户地区
    LinkWay: '', // 客户联系方式
    NeedsTime: formatTime.formatTime(new Date(new Date().getTime() - 30*24*60*60*1000)), // 需求时间
    SignTime: formatTime.formatTime(new Date()), // 签订日期
    StartFeeDate: formatTime.formatTime(new Date(new Date().getTime() + 2 * 30 * 24 * 60 * 60 * 1000)), // 学校开始计费时间
    GetBackPayPeriod: 8, // 投入回收期（个月）1位小数
    FBAmount: 0, // 投入总成本（元）
    RDAmount: 0, // 押金（元）
    RBAmount: 0, // 实际结算金额（元）
    AskforBz: '', // 申请说明
    Bz: '', // 备注
    ReceiveMan: '', // 收货人
    ReceiveTel: '', // 收货人电话
    ReceiveAddress: '', // 收货地址
    SpLcId: '', // 审批流程id
    SpLcList: [], // 审批流程列表
    SprUsername: '', // 审批人Code
    SprUserList: [], // 审批人列表
    ifAgent: 1, // 是否代理递交,是否是登记方式？？？？？
    InputUsername: '', // 所属人Code
    InputMan: '', // 所属人
    InputManList: [], // 所属人列表
    AgentMan: '', // 代理人
    keyInfo: { key1: 0, key2: 0, key3: 0, key4: 0, key5: 0, }, // 用来纪录每个下拉框选中的索引
    multiIndex: [0, 0],
    multiArray: [[], []], // 用来存放产品类型，产品列表的二维数组
    ProductTypeList: [], // 存放产品类型
    ProductList: [], // 存放产品列表
    AddPList: [], // 存放选择的产品列表
    PTypeId: '', // 产品分类Id
    active: true, // 页面卡顿防止重复提交
    items:[{
      name:'0',
      value:'快件',
      checked: 'true'
      }, {
        name: '1',
        value: '自提'
      }, {
        name: '2',
        value: '网现'
      }],
    ReceiveMethod:0,//选中的收货方式
    Receiving:{},//收货信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSjList(); // 获取商机列表
    this.getContractListBySelect(); // 搜索所需的合同列表
    this.getOrderNum(); // 获取订单编号
    this.getProductTypeList(); // 获取产品类型
    
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
    var { schoolInfo, orderAuditList, sprUserList, BalanceWayEnum, } = app.globalData;
    this.isNeddHttp(orderAuditList,'SpLcList');
    this.isNeddHttp(sprUserList, 'SprUserList');
    this.isNeddHttp(BalanceWayEnum, 'BalanceWayEnum');
    if (schoolInfo.schoolname) {
      this.setData({
        SchoolName: schoolInfo.schoolname,
        School: schoolInfo.school,
      })
      this.GetSchoolReceive();//获取收货信息
    }
    
    wx.setStorageSync("DDAddOrEdit", false);
    
  },

  // 获取商机列表
  getSjList: function (page, type) {
    var { SJList, } = this.data;
    app.wxApi.BusinessListBySelect({ School: this.data.School, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var list = [{name:'请选择'}];
      if (ResultCode == 1) {
        for (let i = 0; i < Value.length; i++){
          list.push({
            name: `[${Value[i].BussoppoType ? Value[i].BussoppoType.PType : ''}]${Value[i].SJName}->[${Value[i].School}]${Value[i].Schoolname}`,
            SJBH: Value[i].SJBH,
          })
        }
        this.setData({
          SJList: list
        })
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //搜索所需的合同列表
  getContractListBySelect: function () {
    app.wxApi.ContractListBySelect({ School: this.data.School, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var list = [{ name: '请选择' }];
      if (ResultCode == 1) {
        for (let i = 0; i < Value.length; i++) {
          list.push({
            name: Value[i].HTTitle,
            HTBH: Value[i].HTBH,
          })
        }
        this.setData({
          HTList: list
        })
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 获取订单编号
  getOrderNum: function () {
    app.wxApi.GetOrderNum().then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({ DDBH: Value, });
      } else {
        app.showToast(ResultMessage);
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

  //获取订单审批流程
  getOrderAuditSet: function () {
    app.wxApi.OrderAuditSet().then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var list = [];
      if (ResultCode == 1) {
        list = Value;
        list.unshift({ LcName: '请选择' });
        this.setData({ SpLcList: list })
        app.globalData.orderAuditList = list;
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //获取审批人
  getOrderAuditUser: function () {
    app.wxApi.GetOrderAuditUser().then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var list = [{ name: '请选择' }];
      if (ResultCode == 1) {
        for (let i = 0; i < Value.length; i++) {
          list.push({
            name: Value[i].MailNum+','+Value[i].Name,
            Code: Value[i].Code,
          })
        }
        this.setData({ SprUserList: list });
        app.globalData.sprUserList = list;
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //避免多次请求造成资源浪费
  isNeddHttp: function (data,target) {
    if (data.length > 0) {
      this.setData({
        [target]: data,
      })
    } else {
      var info = {
        'SpLcList': () => {
          this.getOrderAuditSet();
        },
        'SprUserList': () => {
          this.getOrderAuditUser();
        },
        'BalanceWayEnum': () => {
          this.getDictionary('BalanceWayEnum'); // 获取结算方式
        },
      }
      info[target]();
    }
  },

  // input键盘输入时触发
  bindInput: function (e) {
    var key = e.target.dataset.value,
      value = e.detail.value;
    this.setData({
      [key]: value,
    })
  },

  // 跳转学校列表页用于选择学校
  goToUrl: function (e) {
    //var { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/orderForm/schoolList/schoolList`
    })
    
  },

  // 登记方式 radio
  radioChange: function (e) {
    this.setData({
      ifAgent: e.detail.value,
    })
  },

  //改变收货方式
  radioChangeSh(e){
    this.setData({
      ReceiveMethod: e.detail.value,
    })
    if (this.data.ReceiveMethod == 0){
      this.setData({
        ReceiveAddress:'',
        ReceiveTel:'',
        ReceiveMan:'',
      })
    }else{
      this.setData({
        ReceiveAddress: this.data.Receiving.LinkAddress,
        ReceiveTel: this.data.Receiving.LinkTel,
        ReceiveMan: this.data.Receiving.Linkman,
      })
    }
  },

  // 选中下拉框
  bindPickerChange: function (e) {
    var newKeyInfo = this.data.keyInfo;
    var key = parseInt(e.detail.value);
    var target = {
      'SJList': () => {
        newKeyInfo['key1'] = key;
        return newKeyInfo;
      },
      'HTList': () => {
        newKeyInfo['key2'] = key;
        return newKeyInfo;
      },
      'BalanceWayEnum': () => {
        newKeyInfo['key3'] = key;
        return newKeyInfo;
      },
      'SpLcList': () => {
        newKeyInfo['key4'] = key;
        return newKeyInfo;
      },
      'SprUserList': () => {
        newKeyInfo['key5'] = key;
        return newKeyInfo;
      },
      'InputManList': () => {
        newKeyInfo['key6'] = key;
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
    var { key } = e.currentTarget.dataset;
    this.setData({
      [key]: e.detail.value,
    })
  },
  cancleDate: function () {
    console.log(2)
  },

  /**
   * 选择产品相关start
   */

  //获取产品类型
  getProductTypeList: function () {
    var { multiIndex, multiArray, } = this.data;
    var list = [[],[]];
    app.wxApi.ProductTypeList().then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        list[multiIndex[0]].unshift('请选择产品分类'); 
        list[1].unshift('请选择产品'); 
        for (let i = 0; i < Value.length; i++) {
          list[multiIndex[0]].push(Value[i].SmallName)
        }
        this.setData({
          multiArray: list,
          ProductTypeList: Value,
        })
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //获取产品列表
  getProductList: function (PTypeId, value) {
    var { multiArray, multiIndex, ProductList, } = this.data;
    var data = {
      multiArray,
      multiIndex,
      ProductList,
    };
    var list = [];
    app.wxApi.ProductList({ PTypeId, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        list = Value.length > 0 ? [] : PTypeId == 0 ? ['请选择产品'] : ["暂无产品"];
        for (let i = 0; i < Value.length; i++) {
          list.push(Value[i].PName);
        }
        data.multiIndex[0] = value;
        data.multiArray[1] = list;
        data.ProductList = Value;
        this.setData(data);
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var { multiArray, multiIndex, ProductList, AddPList, PTypeId, } = this.data;
    if (ProductList.length == 0) return;
    var list = AddPList;
    var PList = ProductList[e.detail.value[1]];
    // for (let i = 0; i < list.length; i++) {
    //   if (list[i].PName == PList.PName) {
    //     app.showToast('列表中已存在');
    //     return;
    //   }
    // }
    list.unshift({
      PTypeId,
      PId: PList.Id,
      PName: PList.PName,
      PModel: PList.PList,
      PUnit: PList.PUnit,
      PPrice: PList.PPrice,
      Pnum: 1,
      Payment: PList.PPrice * 1,
      GuaPeriod: PList.GuaPeriod,
      Bz: '',
      key: 2,
      BalanceWay: 2, // 默认客户承担
    })
    this.setData({
      multiIndex: e.detail.value,
      AddPList: list,
    })
  },

  bindMultiPickerColumnChange: function (e) {
    if (e.detail.column === 1) return;
    !!timer2 && clearTimeout(timer2);
    timer2 = setTimeout(() => {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var { ProductTypeList, } = this.data;
      var PTypeId = e.detail.value ? ProductTypeList[e.detail.value - 1].Id : 0;
      this.setData({
        PTypeId,
      })
      this.getProductList(PTypeId, e.detail.value);
    }, 500)
  },

  bindProductChange: function (e) {
    var value = parseInt(e.detail.value),
        { key } = e.currentTarget.dataset,
        product = this.data.AddPList;
    product[key].key = value;
    product[key].BalanceWay = this.data.BalanceWayEnum[value].Value;
    this.setData({
      AddPList: product,
    })
  },

  bindProduct: function (e) {
    var { key, value } = e.currentTarget.dataset;
    var newList = this.data.AddPList;
    newList[key][value] = e.detail.value;
    this.setData({
      AddPList: newList,
    })
  },

  delProduct: function (e) {
    var product = JSON.parse(JSON.stringify(this.data.ProductList)),
        { key } = e.currentTarget.dataset;
    product.splice(key,1);
    this.setData({ AddPList: product,})
  },

  /**
   * 选择产品相关end
   */

  // 提交订单
  formSubmit: function (e) {
    var {
      School, SchoolName,
      HTBH, SJBH, DDBH, HTList, SJList,
      DDName, keyInfo, AddPList,
      PartyA, PartyB, SpLcList,
      Area, LinkWay, SprUserList,
      NeedsTime, SignTime, BalanceWayEnum,
      StartFeeDate, GetBackPayPeriod,
      FBAmount, RDAmount,RBAmount, AskforBz,
      Bz, ReceiveMan, ReceiveTel, Spr,
      ReceiveAddress, SpLcId, SprUsername, ReceiveMethod
    } = this.data;
    // if (keyInfo.key1 == 0) {
    //   app.showToast('请选择商机');
    //   return;
    // }
    // if (keyInfo.key2 == 0) {
    //   app.showToast('请选择合同');
    //   return;
    // }
    if (!DDBH) {
      app.showToast('请输入订单编号');
      return;
    }
    if (DDName == '') {
      app.showToast('请输入项目名称');
      return;
    }
    if (keyInfo.key3 == 0) {
      app.showToast('请输入结算方式');
      return;
    }
    if (PartyA == '') {
      app.showToast('请输入甲方名称');
      return;
    }
    if (PartyB == '') {
      app.showToast('请输入乙方名称');
      return;
    }
    if (GetBackPayPeriod == '') {
      app.showToast('投入回收期不能为空');
      return;
    }
    if (RDAmount === '') {
      app.showToast('押金不能为空');
      return;
    }
    if (RBAmount === '') {
      app.showToast('结算金额不能为空');
      return;
    }
    if (AddPList.length == 0) {
      app.showToast('请选择产品');
      return;
    }
    for (let i = 0; i < AddPList.length;i++){
      if (AddPList[i].PPrice == '') {
        app.showToast(`产品：${AddPList[i].PName}的单价不能为空`);
        return;
      }
      if (AddPList[i].Payment == '') {
        app.showToast(`产品：${AddPList[i].PName}的金额不能为空`);
        return;
      }
      if (AddPList[i].Pnum == '') {
        app.showToast(`产品：${AddPList[i].PName}的数量不能为空`);
        return;
      }
      if (AddPList[i].GuaPeriod == '') {
        app.showToast(`产品：${AddPList[i].PName}的质保期不能为空`);
        return;
      }
      if (AddPList[i].BalanceWay == 0) {
        app.showToast(`产品：${AddPList[i].PName}的结算方式不能为空`);
        return;
      }
      if (AddPList[i].Bz.length > 100) {
        app.showToast(`产品：${AddPList[i].PName}的备注字数不能大于100`);
        return;
      }
    }
    if (keyInfo.key4 == 0) {
      app.showToast('请选择审批流程');
      return;
    }
    if (keyInfo.key5 == 0) {
      app.showToast('请选择审批人');
      return;
    }
    if (AskforBz.length > 100) {
      app.showToast('申请说明字数不能大于100');
      return;
    }
    if (Bz.length > 100) {
      app.showToast('备注字数不能大于100');
      return;
    }
    let info = {
      School,SchoolName,
      HTBH: typeof (HTList[keyInfo.key2].HTBH) == 'undefined' ? '' : HTList[keyInfo.key2].HTBH,
      SJBH: typeof (HTList[keyInfo.key2].SJBH) == 'undefined' ? '' : SJList[keyInfo.key1].SJBH,
      DDBH, DDName, RDAmount,
      BalanceWay: BalanceWayEnum[keyInfo.key3].Value,
      PartyA,PartyB,Area,LinkWay, NeedsTime,SignTime,
      StartFeeDate,GetBackPayPeriod, FBAmount, RBAmount,
      AskforBz, Bz, ReceiveMan, ReceiveTel, ReceiveAddress, ReceiveMethod,
      ProductList: JSON.stringify(AddPList),
      SprUsername: SprUserList[keyInfo.key5].Code,
      Spr: SprUserList[keyInfo.key5].name,
      SpLcId: SpLcList[keyInfo.key4].Id ? SpLcList[keyInfo.key4].Id : ''
    };
    !!timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.data.active) {
        this.setData({
          active: false,
        })
        app.wxApi.AddOrder(info).then(res => {
          var { ResultMessage, ResultCode, } = res;
          app.showToast(ResultMessage);
          if (ResultCode == 1) {
            wx.setStorageSync("DDAddOrEdit", true);
            wx.navigateBack();
          } else if (ResultCode == -99) { // 订单编号重复，重新获取
            this.getOrderNum();
          }
          setTimeout(() => {
            this.setData({ active: true, })
          }, 300)
        })
      }
    }, 300)
  },
  GetSchoolReceive(){
    app.wxApi.GetSchoolReceive({ SchoolCode:this.data.School}).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var list = [];
      if (ResultCode == 1) {
        if (this.data.ReceiveMethod != 0){
          this.setData({
            ReceiveMan: Value.Linkman, // 收货人
            ReceiveTel: Value.LinkTel, // 收货人电话
            ReceiveAddress: Value.LinkAddress, // 收货地址
            Receiving: Value
          })
        }else{
          this.setData({
            Receiving: Value
          })
        }
        

      } else {
        app.showToast(ResultMessage);
      }
    })
  }
})