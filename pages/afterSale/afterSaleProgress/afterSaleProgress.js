// pages/afterSale/afterSaleProgress/afterSaleProgress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        first: 1,
        second: 1,
        third: 1,
        progress:['提交申请','客服介入','处理中','处理完成'],
        progresstime:['2022-12-12','2022-12-13'],
    },

    onThirdChange(e) {
        this.setData({
            third: e.detail.current
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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