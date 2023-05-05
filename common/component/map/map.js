var amapFile = require('./amap-wx.130.js');
var utils = require('../../utils/normal.js');
Component({

    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        key: "feed7dfd82fe7ed449d87ae3b3e78c24",
        myAmapFun: null,
        textData: null,
        longitude: null,
        latitude: null,
        mapId: "mapId",
        CurrentPositioning: null,
        NearbyAddress: null,
        target: null,
        markers: [],
        distance: null,
        num: 1,
        scale: null,
        isUser: true,
        iconPath: "",
        isExceed: true,
        hasAuthorization: null,
    },
    methods: {
        //监听地理位置变化
        mapLocation: function () {
            var that = this;
            const _locationChangeFn = function (res) {
                var markers = that.data.markers;
                markers[0].latitude = res.latitude;
                markers[0].longitude = res.longitude;
                that.setData({
                    markers,
                })
                that.GetDistance();
                wx.offLocationChange(_locationChangeFn)
                that.mapLocation2()
            }
            wx.onLocationChange(_locationChangeFn)
        },
        //监听地理位置变化
        mapLocation2: function () {
            var that = this;
            //定时执行每隔40秒获取当前位置（配送员）一次
            that.timer = setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
                const _locationChangeFn = function (res) {
                    var markers = that.data.markers;
                    markers[0].latitude = res.latitude;
                    markers[0].longitude = res.longitude;
                    that.setData({
                        markers,
                    })
                    that.GetDistance();
                    wx.offLocationChange(_locationChangeFn)
                }
                wx.onLocationChange(_locationChangeFn)
            }, 2000)
        },
        // 开启持续定位
        startLocationUpdateBackground() {
            const that = this;
            return new Promise((reslove, reject) => {
                wx.getSetting({
                    complete(e) {
                        if (!e.authSetting["scope.userLocationBackground"]) {
                            wx.showModal({
                                title: '提示',
                                content: '智慧养老小程序需获取您的定位权限',
                                showCancel: true,
                                cancelText: '取消',
                                cancelColor: '#000000', //取消按钮的文字颜色,
                                confirmText: '去授权',
                                confirmColor: '#005826', //确定按钮的文字颜色,
                                success: res => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success(res) {
                                                reslove('success')
                                            },
                                            fail(res) {
                                                reject('fail')
                                            },
                                        })
                                    } else if (res.cancel) {
                                        wx.showToast({
                                            title: '需要用户定位权限',
                                            icon: 'none',
                                            duration: 2000,
                                        })
                                        reject('fail')
                                    }
                                }
                            });
                        } else {
                            that.setData({
                                hasAuthorization: true
                            })
                            wx.startLocationUpdateBackground({
                                success(res) {
                                    that.mapLocation()
                                },
                                fail(res) {

                                }
                            })


                            reslove('success')
                        }
                    }
                })

            })


        },
        // 缩放地图
        bindregionchange(e) {
            const that = this
            const mapCtx = wx.createMapContext(this.data.mapId, this);
            mapCtx.getScale({
                success(e) {
                    if (e.scale <= 13 || e.scale > 17) {
                        that.setData({
                            isExceed: false
                        })
                    } else {
                        that.setData({
                            isExceed: true
                        })
                    }
                }
            })

        },
        // 移动到当前定位
        moveTolocation() {
            const mapCtx = wx.createMapContext(this.data.mapId, this);
            const that = this;
            new Promise(function (reslove, reject) {
                that.setData({
                    scale: 16
                })
                reslove()
            }).then(res => {
                mapCtx.moveToLocation();
            })
        },
        // 获取定位 
        getLocation() {
            const myAmapFun = new amapFile.AMapWX({
                key: this.data.key
            });
            return new Promise((reslove, reject) => {
                myAmapFun.getRegeo({
                    success: (data) => {
                        let textData = {};
                        textData.name = data[0].name;
                        textData.desc = data[0].desc
                        //用户- 从这里进行请求获取服务人员的位置
                        // 服务人员- 从这里进行请求获取用户的位置
                        // 机构- 从这里进行请求获取所有服务人员的位置
                        // 请求开始
                        this.setData({
                            textData: textData,
                            longitude: data[0].longitude,
                            latitude: data[0].latitude,
                            markers: [{
                                    id: 0,
                                    iconPath: "/image/common/map/transparency.png",
                                    longitude: data[0].longitude,
                                    latitude: data[0].latitude,
                                    width: 30, //宽
                                    height: 30, //高
                                    joinCluster: true,
                                    customCallout: {
                                        anchorY: 0,
                                        anchorX: 0,
                                        display: "ALWAYS"
                                    },
                                },
                                {
                                    id: 1,
                                    iconPath: this.data.iconPath,
                                    longitude: data[0].longitude + 0.005,
                                    latitude: data[0].latitude + 0.005,
                                    width: 30, //宽
                                    height: 30, //高
                                    joinCluster: true,
                                    customCallout: {
                                        anchorY: 0,
                                        anchorX: 0,
                                        display: "ALWAYS"
                                    },
                                },
                            ],
                        });
                        // 请求结束

                        // 缩放地图
                        let mapCtx = wx.createMapContext(this.data.mapId, this)
                        mapCtx.includePoints({
                            padding: [70],
                            points: this.data.markers
                        })
                        reslove();
                    },
                    fail: function (info) {
                        console.log("get Location fail", info);
                        reject();
                    }
                });
            })

        },
        GetDistance(e) {
            const that = this;
            const markers = that.data.markers;
            return new Promise((reslove, reject) => {
                that.setData({
                    distance: utils.GetDistance(markers[0], markers[1]),
                })
                reslove()
            })
        }
    },
    attached() {
        const that = this
        // 持续定位权限获取
        that.startLocationUpdateBackground().then(res => {
                if (res == 'success') {
                    // 获取用户当前定位
                    that.getLocation().then(res => {
                        // 计算两者之间的距离
                        that.GetDistance()
                    })
                } else {
                    that.startLocationUpdateBackground()
                }
            }

        )
        //首先获取使用地图者是用户还是服务人员
        if (this.data.isUser) {
            this.setData({
                isUser: true,
                iconPath: "/image/common/map/service.png"
            })
        } else {
            this.setData({
                isUser: false,
                iconPath: "/image/tabbar/index_s.png"
            })
        }


    },
})