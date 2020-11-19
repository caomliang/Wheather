// pages/weather/weather.js
// 引用百度地图微信小程序JSAPI模块
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    city: "",
    date: "",
    pic: "",
    tem: "",
    weather: "",
    wind: "",
    inputVal:"",
    lat:"",
    lon:""
  },
  onLoad: function() { //页面进来初次调用
    var that = this;
    wx.getLocation({
      success: (res) => {
        // console.log(res);
        var lat = res.latitude;
        var log = res.longitude;
        var ak = "tSoaLf5u6NL6YLb2FMhVCWRA2Zn42580";

        //获取当地的天气
        wx.request({
          url: 'https://api.map.baidu.com/telematics/v3/weather?location=' + log + ',' + lat + '&output=json&ak=' + ak,
          success: function(res) {
            // console.log(res.data);
            that.setData({
              city: res.data.results[0].currentCity,
              date: res.data.results[0].weather_data[0].date,
              pic: res.data.results[0].weather_data[0].dayPictureUrl,
              tem: res.data.results[0].weather_data[0].temperature,
              weather: res.data.results[0].weather_data[0].weather,
              wind: res.data.results[0].weather_data[0].wind
            })
          },
          fail: function() {
            console.log("失败");
          }
        })
      },
      type: "gcj02"
    })
  },
  //获取输入的地址
  bindKeyInput: function (e) {
   this.setData({
     inputVal:e.detail.value
   })
  },

  //进行搜索
  onsearch:function() {
    //获取地址
    var adress=this.data.inputVal;
    console.log(adress);
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'tSoaLf5u6NL6YLb2FMhVCWRA2Zn42580'
    });
    //失败
    var fail = function (data) {
      console.log(data)
    };
    //成功
    var success = function (data) {
      //获取地址的经纬度设值
      that.setData({
        lat: data.wxMarkerData[0].latitude,
        lon: data.wxMarkerData[0].longitude
      });
      var latitude = that.data.lat;
      var longitude = that.data.lon;
      var ak = "tSoaLf5u6NL6YLb2FMhVCWRA2Zn42580";
      //获取当地的天气
      wx.request({
        url: 'https://api.map.baidu.com/telematics/v3/weather?location=' + longitude + ',' + latitude + '&output=json&ak=' + ak,
        success: function (res) {
          // console.log(res.data);
          that.setData({
            city: res.data.results[0].currentCity,
            date: res.data.results[0].weather_data[0].date,
            pic: res.data.results[0].weather_data[0].dayPictureUrl,
            tem: res.data.results[0].weather_data[0].temperature,
            weather: res.data.results[0].weather_data[0].weather,
            wind: res.data.results[0].weather_data[0].wind
          })
        },
        type: "gcj02"
      })

    }
    // 发起geocoding检索请求 
    BMap.geocoding({
      address:adress,
      fail: fail,
      success: success
    });
  }
})