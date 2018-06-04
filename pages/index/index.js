//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groupList: [
      {
        pageTitle: '生成图片',
        cellList: [{ name: 'canvas 生成图片', path: '../moment/index' }]
      },
      {
        pageTitle: '组件',
        cellList: [{ name: 'component 组件展示', path: '../component-share/index' }]
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
