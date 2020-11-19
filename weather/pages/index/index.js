Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  network:function(){
wx.request({
  url: 'http://localhost:8080/weixinDemo/user.json',
  success:function(res){
    console.log(res.data);
  },
  fail:function(){
    console.log("失败");
  },
  complete:function(){
    console.log("不论成功失败")
  }
})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }
})