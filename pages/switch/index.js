// pages/switch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sync: {
      checked: false
    },
    panelStr: 'Switch'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  syncChange({ detail }) {
    this.setData({
      'sync.checked': detail.checked
    });
  },
})