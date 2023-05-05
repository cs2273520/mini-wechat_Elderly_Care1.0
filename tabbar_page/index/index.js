Component({
    data: {
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        interval: 3000,
        duration: 500,
    },
    methods: {
        onTap(e) {
            const {
                index
            } = e.detail;

            console.log(index);
        },
        onChange(e) {
            const {
                current,
                source
            } = e.detail;

            console.log(current, source);
        },
        toOrder() {
            wx.navigateTo({
                url: '/pages/PlaceAnOrder/PlaceAnOrder_1/PlaceAnOrder_1',
            })
        },
    },
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0
                })
            }
        }
    },
    attached() {
        this.getTabBar().setData({
            tabBarShow: true,
        })
    },
})