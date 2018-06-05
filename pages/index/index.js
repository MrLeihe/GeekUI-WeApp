//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groupList: [
      {
        pageTitle: '画布',
        cellList: [{ name: 'canvas 组件演示', path: '../canvas/index' }]
      },
      
    ]
  },

  navigateListener: function(e){
    console.log(e);
    wx.navigateTo({
      url: e.detail.path,
    });
  }
})
