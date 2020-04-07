var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgLength: { // 属性名
      type: Number,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picUrl: [{
      index: '0',
      val: '',
      isshow: true,
      showdele: false
    },],
    src: app.SRC,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addpic: function (event) { //添加图片
      let that = this;
      let limitImg = 0
      if (this.data.imgLength){
        limitImg = this.data.imgLength
      }else{
        limitImg = 8
      }
      let index = event.currentTarget.dataset.index;
      if (index < limitImg) {
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
              if (picarr.length < limitImg) { //长度不超过9
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
                    app.globalData.signIn.picArr = picarr
                    that.triggerEvent('getPicList',picarr)
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
                    that.triggerEvent('getPicList',picarr)
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
      if (picarr.length == 0 || picarr[picarr.length - 1].val != '') {
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
          picArr.push(item);
        }
      });
      that.setData({
        picArr: picArr
      });
      app.globalData.signIn.picArr = picarr
      that.triggerEvent('getPicList', picArr)
    },
  }
})
