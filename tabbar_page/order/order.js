Component({
    pageLifetimes: {
      show() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2
          })
        }
      }
    },
    data: {
        tabPanelstyle: 'display:flex;justify-content:center;align-items:center;min-height: 120px',
      },
      methods:{
        /**
         * 再下单
         */
          orderAgain(){
                wx.navigateTo({
                  url: `/pages/PlaceAnOrder/PlaceAnOrder_1/PlaceAnOrder_1?step=2 &todetail=true`
                })
          },
          /**
           * 跳转售后进度页面
           */
        toProgress(){
            wx.navigateTo({
              url: '/pages/afterSale/afterSaleProgress/afterSaleProgress',
            })
        },
          /**
           * 跳转订单详情
           */
        toDetail(){
            wx.navigateTo({
              url: '/pages/orderDetail/orderDetail'
            })
        },
        onTabsChange(event) {
            console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
          },
        onTabsClick(event) {
            console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
          },
      },
    attached(){
        this.getTabBar().setData({
            tabBarShow:true, 
        })
        wx.setNavigationBarTitle({
            title: '订单管理'
        })
      },
  })
  