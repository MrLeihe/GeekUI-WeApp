//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageTitle: '分享',
    cellList: [{ name: '极客', path: '../share/index' }, { name: '学苑', path: '../share/index' }]
  },

  navigateListener: function(e){
    console.log(e);
    wx.navigateTo({
      url: e.detail.path,
    });
  }
})
