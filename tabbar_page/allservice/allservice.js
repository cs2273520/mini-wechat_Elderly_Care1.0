const image = 'https://tdesign.gtimg.com/miniprogram/images/example1.png';
const items = new Array(12).fill({
    label: '标题文字',
    image
}, 0, 12);
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images/';

Component({
    data: {
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        interval: 3000,
        duration: 500,
        offsetTopList: [],
        sideBarIndex: 0,
        scrollTop: 0,
        categories: [{
                label: '热门',
                title: '热门',
                items,
            },
            {
                label: '保洁',
                title: '保洁',
                badgeProps: {
                    dot: true,
                },
                items: items.slice(0, 9),
            },
            {
                label: '保姆月嫂',
                title: '保姆月嫂',
                items: items.slice(0, 9),
            },
            {
                label: '家庭洗护',
                title: '家庭洗护',
                badgeProps: {
                    count: 6,
                },
                items: items.slice(0, 6),
            },
            {
                label: '便民服务',
                title: '便民服务',
                items: items.slice(0, 3),
            },
        ],
        isToSearch:false,
        searchsearch:['空调清洗','除甲醇','深度保洁','全屋大扫除','开荒保洁','日常保洁'],
        search:""
    },
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 1
                })
            }
        }
    },
    attached() {
        this.getTabBar().setData({
            tabBarShow: true,
        }),
        wx.setNavigationBarTitle({
            title: '全部服务'
        })
        const query = wx.createSelectorQuery().in(this);
        query.selectAll('.title').boundingClientRect((rects) => {
            this.data.offsetTopList = rects.map((item) => item.top);
          }).exec();
      },    
      methods:{
        /**
         * 点击搜索
         */
        toSearch(){
            this.setData({
                isToSearch:true
            })
         },
         /**
          * 点击取消搜索
          */
         cancelSearch(){
            this.setData({
                isToSearch:false
            })
         },
         /**
          * 搜索框输入
          */
         search(){

         },
        /**
         * 点击确认，跳转搜索
         */
         confirmSearch(){
             wx.navigateTo({
               url: `/pages/PlaceAnOrder/PlaceAnOrder_1/PlaceAnOrder_1?step=2`
             })
         },

        onSideBarChange(e) {
            const { value } = e.detail;
            this.setData({ 
                sideBarIndex: value, 
                scrollTop: this.data.offsetTopList[value]-50 });
          },
          onScroll(e) {
            const { scrollTop } = e.detail;
            const threshold = 50; // 下一个标题与顶部的距离
        
            if (scrollTop < threshold) {
              this.setData({ sideBarIndex: 0 });
              return;
            }
        
            const index = this.data.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);
           
            if (index > -1) {
              this.setData({ sideBarIndex: index });
            }
          },
      },
    
      

    
})