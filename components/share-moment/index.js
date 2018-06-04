// components/share-moment/index.js
/**
 * 生成分享到朋友圈的图
 */

const app = getApp();
const stringUtil = require('../../utils/stringUtil.js');

var windowWidth;
var windowHeight;
const TEXT_COLOR = '#000000';
const WHITE = '#FFFFFF';
const THEME_COLOR = '#FF555C';
const GRAY_COLOR = '#333333';
const TINT_COLOR = '#747474';

const temp = 0.01;
//图片长宽比
const scale = 1.78;
//背景图高度
const bgScale = 0.5;
//头像和宽的比
const avatarWidthScale = 0.368;
const avatarHeightScale = 0.117;
//头像白色圆形背景
const avatarBgWidthScale = 0.38;
const avatarStrokeWidth = 4;
//昵称高度比
const nicknameHeightScale = 0.34 + 5 * temp;
//第一行文字高度
const topTextScale = 0.515 + 3 * temp;
//分享内容
const contentScale = 0.585 + 3 * temp;
const contentScale2 = 0.620 + 3 * temp;
//二维码直径
const qrCodeWidthScale = 0.341;
//二维码高度
const qrCodeHeightScale = 0.69;
//极客文字
const bpbScale = 0.91 + temp * 2;
//识别文字
const decodeScale = 0.935 + temp * 2;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //头像 url (必须)
    avatar: {
      type: String,
      value: null
    },

    //昵称 (必须)
    nickname: {
      type: String,
      value: null
    },
    
    //隐藏显示，会触发事件
    showShareModel: {
      type: Boolean,
      value: false,
      observer: '_propertyChange'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    detailStr: {
      tip: '大吉大利，今晚吃鸡',
      content: '在极客学苑开启你的超神之路',
      contentOther: '晚上一起吃鸡，不见不散!',
      bpbMini: '极客学苑小程序',
      clickToMini: '(长按开启超神模式)'
    },
    canvasHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
    targetSharePath: null,
    QRPath: '../../image/geek-qr.jpg',
    avatarPath: null,
    realShow: false
  },

  ready: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowWidth * scale;
        that.setData({
          canvasHeight: windowHeight,
          imageWidth: windowWidth * 0.7,
          imageHeight: windowHeight * 0.7
        })
      },
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 控件显示并且没有生成图片时，使用 canvas 生成图片
     */
    _propertyChange: function (newVal, oldVal) {
      console.log('_propertyChange---------->' + newVal);
      if (newVal) {
        if (!this.data.targetSharePath) {
          this.shareMoments();
        } else {
          this.setData({
            realShow: true
          })
        }
      }
    },

    /**
     * 生成分享图到朋友圈
     */
    shareMoments: function () {
      var that = this;
      //没有分享图先用 canvas 生成，否则直接预览
      if (that.data.targetSharePath) {
        that.setData({
          showShareModel: true
        })
      } else {
        that.showLoading();
        that.downloadAvatar();
      }
    },

    showErrorModel: function (content) {
      this.hideLoading();
      if (!content) {
        content = '网络错误';
      }
      wx.showModal({
        title: '提示',
        content: content,
      })
      //改变状态，不然不会触发 _propertyChange
      this.setData({
        showShareModel: false
      })
    },

    showLoading: function () {
      wx.showLoading({
        title: '极客加载中...',
      })
    },

    hideLoading: function () {
      wx.hideLoading();
    },

    /**
     * 下载头像
     */
    downloadAvatar: function () {
      var that = this;
      wx.downloadFile({
        url: that.data.avatar,
        success: function (res) {
          that.setData({
            avatarPath: res.tempFilePath
          })
          that.drawImage();
        },
        fail: function () {
          that.showErrorModel();
        }
      })
    },

    drawImage: function () {
      var that = this;
      //
      const ctx = wx.createCanvasContext('myCanvas', this);
      var bgPath = '../../image/share-bg.png';
      ctx.setFillStyle(WHITE);
      ctx.fillRect(0, 0, windowWidth, windowHeight);

      //绘制背景图片
      ctx.drawImage(bgPath, 0, 0, windowWidth, windowHeight * bgScale);

      //头像背景圆
      ctx.arc(windowWidth / 2, avatarWidthScale / 2 * windowWidth + avatarHeightScale * windowHeight, (avatarWidthScale / 2) * windowWidth + avatarStrokeWidth, 0, 2 * Math.PI);
      ctx.setFillStyle(WHITE);
      ctx.fill();

      //先绘制圆，裁剪成圆形图片
      ctx.save();
      ctx.beginPath();
      //圆的原点x坐标，y坐标，半径，起始弧度，终止弧度
      ctx.arc(windowWidth / 2, avatarWidthScale / 2 * windowWidth + avatarHeightScale * windowHeight, (avatarWidthScale / 2) * windowWidth, 0, 2 * Math.PI);
      ctx.setStrokeStyle(WHITE);
      ctx.stroke();
      ctx.clip();
      //绘制头像
      //图片路径，左上角x坐标，左上角y坐标，宽，高
      var avatarWidth = avatarWidthScale * windowWidth;//头像半径
      ctx.drawImage(that.data.avatarPath, windowWidth * (0.5 - avatarWidthScale / 2), avatarHeightScale * windowHeight, avatarWidth, avatarWidth);
      ctx.restore();

      //绘制 content
      ctx.setFillStyle(GRAY_COLOR);
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      ctx.fillText(that.data.detailStr.content, windowWidth / 2, contentScale * windowHeight);
      ctx.setFillStyle(GRAY_COLOR);
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      ctx.fillText(that.data.detailStr.contentOther, windowWidth / 2, contentScale2 * windowHeight);

      //绘制二维码
      ctx.drawImage(that.data.QRPath, windowWidth * (0.5 - qrCodeWidthScale / 2), qrCodeHeightScale * windowHeight, qrCodeWidthScale * windowWidth, qrCodeWidthScale * windowWidth);
      console.log('font------------>' + wx.canIUse('canvasContext.font'));

      //绘制 按压提示文字
      ctx.setFillStyle(TINT_COLOR);
      ctx.setFontSize(14);
      ctx.setTextAlign('center');
      ctx.fillText(that.data.detailStr.clickToMini, windowWidth / 2, decodeScale * windowHeight);

      //绘制加粗文字--------------------------------------------------------------
      //绘制昵称
      that.setFontStyle(ctx, 'bold');
      ctx.setFillStyle(WHITE);
      ctx.setFontSize(20);
      ctx.setTextAlign('center');
      ctx.fillText(stringUtil.substringStr(that.data.nickname), windowWidth / 2, nicknameHeightScale * windowHeight);

      //绘制文字一起赚
      ctx.setFillStyle(THEME_COLOR);
      ctx.setFontSize(24);
      ctx.setTextAlign('center');
      ctx.fillText(that.data.detailStr.tip, windowWidth / 2, topTextScale * windowHeight);

      //绘制 Geek小程序
      ctx.setFillStyle(TINT_COLOR);
      ctx.setFontSize(16);
      ctx.setTextAlign('center');
      ctx.fillText(that.data.detailStr.bpbMini, windowWidth / 2, bpbScale * windowHeight);

      //绘制到 canvas 上
      ctx.draw(false, function () {
        console.log('callback--------------->');
        that.saveCanvasImage();
      });
    },

    /**
     * 改变字体样式
     */
    setFontStyle: function (ctx, fontWeight) {
      if (wx.canIUse('canvasContext.font')) {
        ctx.font = 'normal ' + fontWeight + ' ' + '14px' + ' sans-serif';
      }
    },

    //转化为图片
    saveCanvasImage: function () {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          that.setData({
            targetSharePath: res.tempFilePath,
            realShow: true
          })
        },
        complete: function () {
          that.hideLoading();
        }
      }, this)
    },

    /**
     * 保存到相册
     */
    saveImageTap: function () {
      var that = this;
      that.requestAlbumScope();
    },


    /**
     * 检测相册权限
     */
    requestAlbumScope: function () {
      var that = this;
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.writePhotosAlbum']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            that.saveImageToPhotosAlbum();
          } else {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success(res) {
                that.saveImageToPhotosAlbum();
              },
              fail() {
                wx.showModal({
                  title: '提示',
                  content: '你需要授权才能保存图片到相册',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {
                          if (res.authSetting['scope.writePhotosAlbum']) {
                            that.saveImageToPhotosAlbum();
                          } else {
                            //用户未同意保存图片权限
                          }
                        },
                        fail: function () {
                          //用户未同意保存图片权限
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    },

    saveImageToPhotosAlbum: function () {
      var that = this;
      wx.saveImageToPhotosAlbum({
        filePath: that.data.targetSharePath,
        success: function () {
          wx.showModal({
            title: '',
            content: '✌️图片保存成功，\n快去分享到朋友圈吧',
            showCancel: false
          })
          that.hideDialog();
        }
      })
    },

    closeModel: function () {
      this.hideDialog();
    },

    hideDialog: function () {
      this.setData({
        realShow: false,
        showShareModel: false
      })
    }
  }
})
