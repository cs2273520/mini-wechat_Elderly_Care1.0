Component({
    pageLifetimes: {
      show() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 3
          })
        }
      }
    },
    
    methods:{
        // 跳转个人信息编辑页面
    editor(){
        wx.navigateTo({
            url: '/pages/InforEditing/InforEditing'
          })
    },
    },


    attached(){
        this.getTabBar().setData({
            tabBarShow:true, 
        }),
        wx.setNavigationBarTitle({
            title: '个人中心'
        })
      },
      
  })
  