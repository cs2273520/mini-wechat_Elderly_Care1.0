Page({
    data: {
        step: 0,
        chooseHour: [],
        chooseHourIndex: 0,
        isChooseHour: false,
        page: ['page1', 'page2', 'page3'],
        previousMargin: 0,
        nextMargin: 0,
        serviceMode: null,
        matchMode: null,
        chooseService: [],
        doorTime: "选择上门时间",
        serviceTime: "选择服务时长",
        mode: '',
        datetimeVisible: false,
        datetime: new Date('2021-12-23').getTime(),
        datetimeText: '',
        grade: "advanced",
        isFixed: false,
        toDetail: false,
        isChooseDate: true,
        needservice: [{
            service: '照顾老人',
            isSelect: false
        }, {
            service: '钟点工',
            isSelect: false
        }, {
            service: '住家保姆',
            isSelect: false
        }, {
            service: '医护',
            isSelect: false
        }, {
            service: '做饭做家务',
            isSelect: false
        }, {
            service: '更多',
            isSelect: false
        }],
        ischooseneedservice: false, //是否选择了需要的服务


        askDate: "", //显示已选择的时间
        multiArray: [ //五个数组，有四个选择项 年-月-日-小时-分
            ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            [],
            [

            ]
        ],
        multiIndex: [0, 0, 0, 0, 0], //对应上面选择项，选中的下标
        normalMon: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //正常的月份
        normalHour: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], //正常的小时
        normalMin: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], //正常的分钟
        nowDay: [], //保存当前月份剩余的日期天
        nowMon: [], //保存当前年份剩余的月份
        nowHour: [], //保存当天剩余的小时,
        nowMin: [], //保存当天剩余分钟,
        isSearch:false, //是否是搜索页跳转过来的

    },
    onLoad(query) {
        // 搜索页跳转过来接收参数
        let param=Object.keys(query).length;
        if(param!=0){
            this.setData({
                step:query.step,
                toDetail:true
            })
            if(query.step){
                this.setData({
                    isSearch:true
                })
            }
        }
        


        let arr = []
        for (let i = 1; i <= 24; i++) {
            arr.push(i + '小时')
        }
        this.setData({
            chooseHour: arr
        })




        let page = this;
        //默认选中当前日期
        //获取当前的年-月-日-小时
        let time = new Date();
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let min = time.getMinutes();
        var day = new Date(y, m, 0);
        var daycount = day.getDate(); //获取本月天数
        var days = [];
        var mons = [];
        var hours = [];
        var mins = [];
        //本月剩余天数 比如今天2.24号 days=[24,25,26,27,28]
        for (var i = 0; i <= daycount - d; i++) {
            days.push(d + i)
        }
        //本年剩余月份
        for (var j = 0; j <= 12 - m; j++) {
            mons.push(m + j)
        }
        //今天剩余小时
        for (var k = 0; k <= 24 - h; k++) {
            hours.push(h + k)
        }
        //今天剩余分钟
        for (var l = 0; l <= 60 - min; l++) {
            mins.push(min + l)
        }
        //赋值
        page.setData({
            ["multiArray[2]"]: days,
            ["multiArray[1]"]: mons,
            ["multiArray[3]"]: hours,
            ["multiArray[4]"]: mins,
            nowDay: days,
            nowMon: mons,
            nowHour: hours,
            nowMin: mins
        });



    },




    //确定选择（组装数据)
    bindMultiPickerChange: function (e) {
        let date = this.data.multiArray; //四个选择的数组
        let index = this.data.multiIndex; //对应选中的下标
        //选择第几个年份的值 比如：date[0]是第一个数组（年）[index[0]]选择的下标
        var year = date[0][index[0]];
        var mon = date[1][index[1]];
        var day = date[2][index[2]];
        var hour = date[3][index[3]];
        var min = date[4][index[4]];
        var needdate = '' + year + '-' + mon + '-' + day + ' ' + hour + ':' + min
        this.setData({
            multiIndex: e.detail.value, //当前选择的下标[0,0,1,0]
            askDate: needdate, //2020-2-24 16：00
            isChooseDate: false
        })
    },
    //列改变时
    bindMultiPickerColumnChange: function (e) {
        let that = this;
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        //e.detail.column是第几列、e.detail.value是选择的下标
        data.multiIndex[e.detail.column] = e.detail.value;
        console.log(e.detail.column);
        //选择年月日时
        switch (e.detail.column) {
            case 0: //第一列发生改变时 年
                switch (data.multiIndex[0]) { //switch 选中的数组的第1个值 年
                    case 0: //如果第一列选择的是第一个 下标为0时（即本年）
                        data.multiArray[1] = that.data.nowMon; //月份为本年剩余的月份
                        data.multiArray[2] = that.data.nowDay; //天数为本月剩余的天数
                        data.multiArray[3] = that.data.nowHour; //小时为今天剩余的小时
                        data.multiArray[4] = that.data.nowMin; //分钟为今天剩余的分钟
                        break;
                    default: //第一列选择的不是第一个
                        data.multiArray[1] = that.data.normalMon;
                        data.multiArray[2] = that.getDay(e.detail.value);
                        data.multiArray[3] = that.data.normalHour;
                        data.multiArray[4] = that.data.normalMin;
                        break;
                }
                //更改年份之后，月，日，小时 恢复选择下标为0的数
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                data.multiIndex[3] = 0;
                data.multiIndex[4] = 0;
                break;
            case 1: //第二列发生改变时 月
                switch (data.multiIndex[1]) { //switch 选中的数组的第二个值 月
                    case 0: //第二列 月选择的下标为0时 即本月
                        data.multiArray[2] = that.data.nowDay; //本月剩余天数
                        data.multiArray[3] = that.data.nowHour; //本天剩余小时
                        data.multiArray[4] = that.data.nowMin; //本小时剩余分钟
                        break;
                    default:
                        data.multiArray[2] = that.getDay(e.detail.value); //获取选择月份的天数
                        data.multiArray[3] = that.data.normalHour; //正常小时
                        data.multiArray[4] = that.data.normalMin; //正常分钟
                        break;
                }
                //选择月份后，日期和小时自动恢复选择第一个
                data.multiIndex[2] = 0;
                data.multiIndex[3] = 0;
                data.multiIndex[4] = 0;
                break;
            case 2:
                switch (data.multiIndex[2]) {
                    case 0:
                        data.multiArray[3] = that.data.nowHour;
                        data.multiArray[4] = that.data.nowMin;
                        break;
                    default:
                        data.multiArray[3] = that.data.normalHour;
                        data.multiArray[4] = that.data.normalMin;
                        break;
                }
                data.multiIndex[3] = 0;
                data.multiIndex[4] = 0;
                break;
            case 3:
                switch (data.multiIndex[3]) {
                    case 0:
                        data.multiArray[4] = that.data.nowMin;
                        break;
                    default:
                        data.multiArray[4] = that.data.normalMin;
                        break;
                }
                break;
        }
        this.setData(data);
    },
    //获取月份的天数
    getDay: function (mon) {
        let daysOfMonth = [];
        var Year = this.data.multiArray[0][this.data.multiIndex[0]]; //选择的年
        var mon = this.data.multiArray[1][this.data.multiIndex[1]];
        var day = new Date(Year, mon, 0);
        var daycount = day.getDate()
        for (var i = 1; i <= daycount; i++) {
            daysOfMonth.push(i);
        };
        return daysOfMonth;
    },

    // 选择需要的服务
    chooseNeedService(e) {
        let index = e.currentTarget.dataset.index;
        let item = this.data.needservice[index];
        if (item.service != '更多') {
            item.isSelect = !item.isSelect;
            this.setData({
                needservice: this.data.needservice,
            });
        }


    },


    bindPickerChange(e) {
        if (e) {
            this.setData({
                isChooseHour: true,
                chooseHourIndex: e.detail.value
            })
        }
    },
    toOrder() {
        wx.navigateTo({
            url: '/pages/PlaceAnOrder/PlaceAnOrder_2/PlaceAnOrder_2',
        })
    },
    toSevicePerson() {
        this.setData({
            toDetail: !this.data.toDetail
        })
    },
    scroll(e) {
        if (e.detail.scrollTop > 1) {
            this.setData({
                isFixed: true
            })
        } else {
            this.setData({
                isFixed: false
            })
        }
    },
    lower(e) {},
    grade(e) {
        this.setData({
            grade: e.currentTarget.dataset.word
        })
    },
    showPicker(e) {
        const {
            mode
        } = e?.currentTarget?.dataset;
        this.setData({
            mode,
            [`${mode}Visible`]: true,
        });
    },
    hidePicker() {
        const {
            mode
        } = this.data;
        this.setData({
            [`${mode}Visible`]: false,
        });
    },
    onConfirm(e) {
        const {
            value
        } = e?.detail;
        const {
            mode
        } = this.data;
        console.log('confim', value);
        if (e.currentTarget.dataset.word == "serviceTime") {
            this.setData({
                serviceTime: "",
            })
        } else if (e.currentTarget.dataset.word == "doorTime") {
            this.setData({
                doorTime: ""
            })
        }
        this.setData({
            [mode]: value,
            [`${mode}Text`]: value,
        });
        this.hidePicker();
    },

    onColumnChange(e) {
        console.log('pick', e?.detail?.value);
    },
    choooseService(e) {
        this.setData({
            serviceMode: e.currentTarget.dataset.word
        })
    },
    chooseMath(e) {
        this.setData({
            matchMode: e.currentTarget.dataset.word
        })
    },


    customize(e) {
        this.setData({
            serviceMode: e.currentTarget.dataset.word
        })
    },
    catchTouchMove() {
        return false;
    },
    pre() {
        if (this.data.toDetail) {
            this.setData({
                toDetail: !this.data.toDetail
            })
        } else {
            let num = this.data.step
                --num
            if (this.data.step < 0) {
                num = 0
            }
            this.setData({
                step: num,
            })
        }

    },

    /**
     * 检测是否有选择了需要的服务
     */
    isChooseNeedService() {
        let servicechoose = 0;
        this.data.needservice.forEach((item, index) => {

            if (item.isSelect == true) {
                servicechoose++
            }
        })
        if (servicechoose >= 1) {
            this.setData({
                ischooseneedservice: true
            })

        } else {
            this.setData({
                ischooseneedservice: false
            })
        }
    },


    next() {
        //检测需要的服务是否有勾选
        this.isChooseNeedService();
        // 第一页的元素是否都选择了
        console.log(this.data.step);
        if(this.data.step==0){
            if (this.data.ischooseneedservice == true && this.data.askDate != "" && this.data.isChooseHour && this.data.serviceMode != null) {
               
                let num = this.data.step
                    ++num
                if (this.data.step > 1) {
                    num = 2
                }
                this.setData({
                    step: num
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '您还有需求未选择喔'
                  }) 
                return
            }
        }else if(this.data.step==1){
            if(this.data.matchMode!=null){
                let num = this.data.step
                ++num
            if (this.data.step > 1) {
                num = 2
            }
            this.setData({
                step: num
            })
            }else{
                wx.showModal({
                    title: '提示',
                    content: '您还有需求未选择喔'
                  })
                return
            }
        }
      


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