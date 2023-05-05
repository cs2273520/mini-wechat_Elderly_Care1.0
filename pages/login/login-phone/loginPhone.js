// // pages/login/login-phone/loginPhone.js
const utils = require('../../../common/utils/normal');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled: false,
        getCode: "获取验证码",
        toLogin: true,
        name: "",
        phone: "",
        code: "",
        checkname: "", //用户名提示
        checkphone: "", //电话提示
        checkcode: "", //验证码错误
        dialogshow: false //弹出框显示隐藏
    },
    // 清空表格数据
    clearForm() {
        this.setData({
            name: "",
            phone: "",
            code: "",
            checkname: "",
            checkphone: "",
            checkcode: ""
        })
    },

    // 点击注册，显示注册页面
    toRegister() {
        // 清空上一页的数据
        this.clearForm()
        // 更改标题
        wx.setNavigationBarTitle({
            title: '手机号注册'
        })
        this.setData({
            toLogin: false
        })
    },
    // 点击登录，显示登录页面
    toLogin() {
        // 清空上一页的数据
        this.clearForm()
        // 更改标题
        wx.setNavigationBarTitle({
            title: '手机号登录'
        })
        this.setData({
            toLogin: true
        })
    },
    // 点击获取验证码
    checkAndSend() {
        if (this.data.checkphone == true) {
            // 将手机号发送 



            // 将手机号发送 
            this.setData({
                disabled: true,
                dialogshow: true,
            })
            // 4s后关闭dialog
            setTimeout(() => {
                this.setData({
                    dialogshow: false
                })
            }, 4000)
            let times = 5;
            let timer = setInterval(() => {
                this.setData({
                        getCode: times + 's'
                    })
                    --times;
                if (times < 0) {
                    clearInterval(timer)
                    this.setData({
                        disabled: false,
                        getCode: "获取验证码"
                    })
                }
            }, 1000)
        } else {
            console.log(this.data.checkphone);
            this.setData({
                checkphone: '手机号不能为空'
            })
        }
    },
    // 检测用户名
    checkName1(e) {
        if (e.detail.value != "") {
            const res = utils.isName(e.detail.value)
            if (res) {
                this.setData({
                    disabled: false,
                    checkname: true
                })
            } else {
                this.setData({
                    disabled: true,
                    checkname: "用户名为数字、字母，6-10位"
                })
            }
        } else {
            this.setData({
                checkname: "用户名不能为空"
            })
        }
    },

    // 检测手机号
    checkPhone1(e) {
        if (e.detail.value != "") {
            const res = utils.isMobile(e.detail.value)
            if (res) {
                this.setData({
                    disabled: false,
                    checkphone: true
                })
            } else {
                this.setData({
                    disabled: true,
                    checkphone: "手机号格式错误"
                })
            }
        } else {
            this.setData({
                checkphone: "手机号不能为空"
            })
        }
    },
    // 检测验证码
    checkCode1(e) {
        if (e.detail.value != "") {
            const res = utils.isCode(e.detail.value)
            if (res) {
                this.setData({
                    disabled: false,
                    checkcode: true
                })
            } else {
                this.setData({
                    disabled: true,
                    checkcode: "验证码格式错误"
                })
            }
        } else {
            this.setData({
                checkcode: "验证码不能为空"
            })
        }
    },

    // 输入时候检测用户名
    checkName: utils.debounce(function (e) {
        this.checkName1(e)
    }, 1000),
    // 输入时候检测手机号
    checkPhone: utils.debounce(function (e) {
        this.checkPhone1(e)
    }, 1000),
    // 输入时检测验证码
    checkCode :utils.debounce(function (e) {
        this.checkCode1(e)
    }, 1000),
    // 点击登录注册按钮
    toLoginSubmit(e) {
        if (this.data.toLogin) {
            // 登录
            if (this.data.checkphone == true && this.data.checkcode ==true) {
            
                // 验证成功后  获取用户code   
                wx.login({
                    success: (res) => {
                        //   发送数据+用户code，等待后端进行验证码的校验 写在这里

                        //   发送数据+用户code，等待后端进行验证码的校验


                        // 模拟后端数据 验证码错误
                        let res1 = {
                            msg: '登录成功'
                        }
                        if (res1.msg == '验证码错误') {
                            this.setData({
                                checkcode: '验证码错误'
                            })
                        } else if (res1.msg == '登录成功') {
                            // 将后端返回的token进行本地存储
                            wx.setStorage({
                                key: "token",
                                data: "测试数据"
                            })
                            wx.getStorage({
                                key: 'token',
                                success(res) {
                                    console.log(res.data)
                                }
                            })
                            // 跳转到首页
                            wx.switchTab({
                                url: '/tabbar_page/index/index'
                            })
                        }

                    },
                })


            } else {
                this.checkPhone1({
                    detail: {
                        value: e.detail.value.phone
                    }
                })
                this.checkCode1({
                    detail: {
                        value: e.detail.value.code
                    }
                })
            }
        } else {
            // 注册
            if (this.data.checkname == true && this.data.checkphone == true && this.data.checkcode ==true) {
                // 验证成功后  获取用户code   
                wx.login({
                    success: (res) => {
                        //   发送数据+用户code，等待后端进行验证码的校验 写在这里

                        //   发送数据+用户code，等待后端进行验证码的校验
                        // 模拟数据 成功
                        // 模拟后端数据 验证码错误
                        let res1 = {
                            msg: '注册成功'
                        }
                        if (res1.msg == '验证码错误') {
                            this.setData({
                                checkcode: '验证码错误'
                            })
                        } else if (res1.msg == '注册成功') {
                            // 将后端返回的token进行本地存储
                            wx.setStorage({
                                key: "token",
                                data: "测试数据"
                            })
                            wx.getStorage({
                                key: 'token',
                                success(res) {
                                    console.log(res.data)
                                }
                            })
                            // 跳转到首页
                            wx.switchTab({
                                url: '/tabbar_page/index/index'
                            })
                        }

                    },
                })


            } else {

                this.checkName1({
                    detail: {
                        value: e.detail.value.name
                    }
                })
                this.checkPhone1({
                    detail: {
                        value: e.detail.value.phone
                    }
                })
                this.checkCode1({
                    detail: {
                        value: e.detail.value.code
                    }
                })
            }
        }
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '手机号登录'
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