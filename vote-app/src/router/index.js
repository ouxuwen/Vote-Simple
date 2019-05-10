import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: "Home"
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Home',
            //name: 'Home',
            component: () => import('@/views/Home'),
            beforeRouteEnter(to, from, next) {
                console.log(to, from, next)
                next(vm => {
                    // 通过 `vm` 访问组件实例

                    return true;
                })
            },
            children: [
                {
                    path: '/',
                    redirect: "ScheduleList"
                },
                {
                    path: 'ScheduleList',
                    name: 'ScheduleList',
                    component: () => import('@/views/ScheduleList'),
                },
                {
                    path: 'MySchedule',
                    name: 'MySchedule',
                    component: () => import('@/views/MySchedule'),
                },
                {
                    path: 'UserManagement',
                    name: 'UserManagement',
                    component: () => import('@/views/UserManagement'),
                },

            ]

        }

    ]
})
