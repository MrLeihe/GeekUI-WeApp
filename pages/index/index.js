//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groupList: [
      {
        pageTitle: '分享',
        cellList: [{ name: 'share 朋友圈分享图', path: '../moment/index' }]
      },
      {
        pageTitle: '组件',
        cellList: [{ name: 'component 分享组件展示', path: '../component-share/index' }]
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
