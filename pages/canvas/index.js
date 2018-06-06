// pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [
      {
        pageTitle: '绘制',
        cellList: [{ name: 'canvas 绘制演示', path: '../moment/index' }]
      },
      {
        pageTitle: '封装',
        cellList: [{ name: 'canvas 封装演示', path: '../component-share/index' }]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  navigateListener: function(e){
    wx.navigateTo({
      url: e.detail.cell.path,
    });
  }
})