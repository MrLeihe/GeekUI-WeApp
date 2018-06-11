// pages/animation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [{
      pageTitle: '翻转',
      cellList: [
        { name: 'rotateY 翻转动画', path: '../rotateY/index' }
      ]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  navigateListener: function (e) {
    console.log(e);
    wx.navigateTo({
      url: e.detail.cell.path,
    });
  }

})