//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groupList: [{
      pageTitle: '基础组件',
      cellList: [
        { name: 'marquee 跑马灯', path: '../marquee/index' },
        { name: 'switch 开关按钮', path: '../switch/index' }
        ]
    },
    {
      pageTitle: '画布',
      cellList: [{ name: 'canvas 组件演示', path: '../canvas/index' }]
    },]
  },

  navigateListener: function (e) {
    console.log(e);
    wx.navigateTo({
      url: e.detail.cell.path,
    });
  }
})
