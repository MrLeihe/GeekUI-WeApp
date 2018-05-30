//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title: '分享',
    cellList: [{ name: '极客', path: '../share/index' }, { name: '学苑', path: '../share/index' }]
  },

  navigateTap: function(e){
    console.log(e.target.dataset.path);
    wx.navigateTo({
      url: e.target.dataset.path,
    })
  }
})
