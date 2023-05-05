// pages/orderDetail/orderDetail.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: [3, 3, 0],
        texts: ['1分', '2分', '3分', '4分', '5分'],
        isevaluated:false,//是否已经评价,
        position: [
            { value: 'top', text: '顶部弹出' },
            { value: 'left', text: '左侧弹出' },
            { value: 'center', text: '中间弹出' },
            { value: 'bottom', text: '底部弹出' },
            { value: 'right', text: '右侧弹出' },
          ],
          cur: {},
    },
    /**
     * 弹出售后选择页面
     */
    handlePopup(e) {
        const { item } = e.currentTarget.dataset;
  
        this.setData(
          {
            cur: item,
          },
          () => {
            this.setData({ visible: true });
          },
        );
      },
      onVisibleChange(e) {
        this.setData({
          visible: e.detail.visible,
        });
      },
      /**
       * 在线客服
       */
      toOnlineService(){
          wx.navigateTo({
            url: '/pages/afterSale/onlineService/onlineService',
          })
      },
      /**
       * 在下申请
       */
      toApply(){
        wx.navigateTo({
            url: '/pages/afterSale/applyService/applyService',
          })
      },

    onChange(e) {
        const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      this.setData({
        [`value[${index}]`]: value,
      });
      },
      /**
       * 点击提交按钮
       */
      toEvaluated(){
          this.setData({
              isevaluated:true
          })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: '订单详情',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})