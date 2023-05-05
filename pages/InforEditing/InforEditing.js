// pages/InforEditing.js

var amapFile = require('../../common/component/map/amap-wx.130.js');
const utils = require('../../common/utils/normal');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        key: "feed7dfd82fe7ed449d87ae3b3e78c24", //高德地图api
        userName: '',
        userPhone: '',
        userIdCard: '',
        userLoaction: '',
        userChooseRealtion: '子女', //选择的关系

        checkuserName: "",
        checkuserPhone: '',
        checkuserIdCard: '',
        checkuserLoaction: '',

        checkoldName: "",
        checkoldPhone: '',
        checkoldIdCard: '',
        checkoldLoaction: '',

        oldName: '',
        oldPhone: '',
        oldIdCard: '',
        oldLoaction: '',
        chooseHealth: '健康，能自理', //选择的老人健康情况



        index: 0, //关系下标
        // relation: ['子女', '亲属'],
        relation: ['健康，能自理', '半自理', '不能自理'],
        pageIndex: 0, //当前页

        dialogshow: false, //弹出框
        dialogContent: "请完善信息!"
    },
    // 检测用户姓名
    checkUserName1(e) {
        if (e.detail.value != "") {
            const res = utils.isRealName(e.detail.value)
            if (res) {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserName: true
                    })
                } else {
                    this.setData({
                        checkoldName: true
                    })
                }
            } else {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserName: "请填写真实姓名"
                    })
                } else {
                    this.setData({
                        checkoldName: "请填写真实姓名"
                    })
                }

            }
        } else {
            if (this.data.pageIndex == 0) {
                this.setData({
                    checkuserName: "真实姓名为空"
                })
            } else {
                this.setData({
                    checkoldName: "真实姓名为空"
                })
            }

        }
    },
    // 检测用户手机号
    checkUserPhone1(e) {
        if (e.detail.value != "") {
            const res = utils.isMobile(e.detail.value)
            if (res) {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserPhone: true
                    })
                } else {
                    this.setData({
                        checkoldPhone: true
                    })
                }

            } else {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserPhone: "手机号格式错误"
                    })
                } else {
                    this.setData({
                        checkoldPhone: "手机号格式错误"
                    })
                }

            }
        } else {
            if (this.data.pageIndex == 0) {
                this.setData({
                    checkuserPhone: "手机号不能为空"
                })
            } else {
                this.setData({
                    checkoldPhone: ""
                })
            }

        }
    },

    // 检测用户身份证
    checkuserIdCard1(e) {
        if (e.detail.value != "") {
            const res = utils.Idcard(e.detail.value)
            if (res) {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserIdCard: true
                    })
                } else {
                    this.setData({
                        checkoldIdCard: true
                    })
                }

            } else {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserIdCard: "身份证号格式错误"
                    })
                } else {
                    this.setData({
                        checkoldIdCard: "身份证号格式错误"
                    })
                }

            }
        } else {
            if (this.data.pageIndex == 0) {
                this.setData({
                    checkuserIdCard: "身份号不能为空"
                })
            } else {
                this.setData({
                    checkoldIdCard: "身份号不能为空"
                })
            }

        }
    },

    // 检测用户地址
    checkUserLocation1(e) {
        if (e.detail.value != "") {
            const res = utils.isLocation(e.detail.value)
            console.log(res);
            if (res) {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserLoaction: true
                    })
                } else {
                    this.setData({
                        checkoldLoaction: true
                    })
                }

            } else {
                if (this.data.pageIndex == 0) {
                    this.setData({
                        checkuserLoaction: "请填写详细地址"
                    })
                } else {
                    this.setData({
                        checkoldLoaction: "请填写详细地址"
                    })
                }

            }
        } else {
            if (this.data.pageIndex == 0) {
                this.setData({
                    checkuserLoaction: "地址不能为空"
                })
            } else {
                this.setData({
                    checkoldLoaction: "地址不能为空"
                })
            }

        }
    },



    // 输入时检测用户姓名
    checkUserName: utils.debounce(function (e) {
        this.checkUserName1(e)
    }, 1000),


    checkInfomation: utils.debounce(function (e) {
        this.checkInfomation1(e)
    }, 1000),
    // 输入时候检测用户手机号
    checkUserPhone: utils.debounce(function (e) {
        this.checkUserPhone1(e)
    }, 1000),

    // 输入时候检测用户身份证号
    checkUserIdCard: utils.debounce(function (e) {
        this.checkuserIdCard1(e)
    }, 1000),
    // 输入时候检测用户地址
    checkUserLocation: utils.debounce(function (e) {
        this.checkUserLocation1(e)
    }, 1000),


    // 下一步
    next(e) {
        if (this.data.pageIndex == 0) {
            // 点击下一步
            // 检查是否填满信息
            if (this.data.userName == "" || this.data.userPhone == "" || this.data.userIdCard == "" || this.data.userLoaction == "") {
                this.setData({
                    dialogshow: true,
                })
                // 2s后关闭dialog
                setTimeout(() => {
                    this.setData({
                        dialogshow: false
                    })
                }, 2000)
            } else {
                // 获取定位由于不用触发input的change，所以特殊处理

                if (this.data.checkuserName == true && this.data.checkuserPhone == true && utils.isLocation && this.data.userLoaction && this.data.checkuserIdCard == true) {
                    // 设置标题
                    wx.setNavigationBarTitle({
                        title: '老人信息'
                    })
                    //  更改当前页数
                    this.setData({
                        pageIndex: this.data.pageIndex + 1
                    })
                    // 更改picke的值
                    this.setData({
                        relation: ['健康，能自理', '半自理', '不能自理']
                    })
                }




            }
        } else if (this.data.pageIndex == 1) {
            wx.setNavigationBarTitle({
                title: '用户信息'
            })
            // 上一步
            this.setData({
                pageIndex: this.data.pageIndex - 1
            })
            this.setData({
                relation: ['子女', '亲属']
            })
        }

    },
    // 完成
    nextDone() {
        // 检查是否填满信息
        if (this.data.oldName == "" || this.data.oldIdCard == "" || this.data.oldLoaction == "") {
            this.setData({
                dialogshow: true,
            })
            // 2s后关闭dialog
            setTimeout(() => {
                this.setData({
                    dialogshow: false
                })
            }, 2000)
        } else {
            // 获取定位由于不用触发input的change，所以特殊处理

            if (this.data.checkoldName == true && utils.isLocation && this.data.oldLoaction && this.data.checkoldIdCard == true) {
                // 发送请求数据,得到反馈
                const res = {
                    code: 200,
                    msg: '成功'
                }

                if (res.msg == '成功') {
                    // 弹出提示,跳转到首页
                    this.setData({
                        dialogshow: true
                    })
                    // 2s后关闭dialog
                    setTimeout(() => {
                        this.setData({
                            dialogshow: false,
                            dialogContent: "修改成功!"
                        })
                        // 跳转到首页
                        wx.switchTab({
                            url: '/tabbar_page/index/index'
                        })
                    }, 2000)

                } else {
                    // 弹出提示,跳转到首页
                    this.setData({
                        dialogshow: true
                    })
                    // 2s后关闭dialog
                    setTimeout(() => {
                        this.setData({
                            dialogshow: false,
                            dialogContent: "修改失败，重试!"
                        })
                    }, 2000)
                }

            }
        }
    },


    // 获取当前定位
    getLocation() {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({
            key: this.data.key
        });
        myAmapFun.getRegeo({
            success: function (data) {
                //成功回调

                let province = data[0].regeocodeData.addressComponent.province
                let detaiLocat = data[0].name
                console.log(province);
                console.log(detaiLocat);
                if (that.data.pageIndex == 0) {
                    that.setData({
                        userLoaction: province + detaiLocat
                    })
                } else {
                    that.setData({
                        oldLoaction: province + detaiLocat
                    })
                }

            },
            fail: function (info) {
                //失败回调
                console.log(info)
            }
        })
    },
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value,
            chooseRealtion: this.data.relation[e.detail.value],
            chooseHealth: this.data.relation[e.detail.value]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '用户信息'
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