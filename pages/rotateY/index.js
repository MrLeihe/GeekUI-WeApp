// pages/rotateY/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFront: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  animationListener: function(){
    this.setData({
      showFront: !this.data.showFront
    })
  }

})