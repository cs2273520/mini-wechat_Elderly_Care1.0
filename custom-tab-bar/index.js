var app = getApp()
Component({
  data: {
    selected: 0,
    color: "#ffffff",
    selectedColor: "#1aad19",
    tabBarShow:false,
    list: [{
      pagePath: "/tabbar_page/index/index",
      iconPath: "/image/tabbar/index.png",
      selectedIconPath: "/image/tabbar/index_s.png",
      text: "首页"
    }, {
      pagePath: "/tabbar_page/allservice/allservice",
      iconPath: "/image/tabbar/server.png",
      selectedIconPath: "/image/tabbar/server_s.png",
      text: "全部服务"
    },
    {
        pagePath: "/tabbar_page/order/order",
        iconPath: "/image/tabbar/order.png",
        selectedIconPath: "/image/tabbar/order_s.png",
        text: "订单管理"
      },
      {
        pagePath: "/tabbar_page/center/center",
        iconPath: "/image/tabbar/center.png",
        selectedIconPath: "/image/tabbar/center_s.png",
        text: "个人"
      }
]
  },
  attached() {
  },
 
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  },
 
})