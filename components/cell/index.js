// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cellList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cellTap: function(e){
      console.log(e);
      var myEventDetail = { cell: e.currentTarget.dataset.path};// detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('navigate', myEventDetail, myEventOption);
    }
  }
})
