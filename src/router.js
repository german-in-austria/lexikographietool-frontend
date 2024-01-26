import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";
import VueMeta from 'vue-meta'

import Search from "@/views/Search";

Vue.use(VueRouter);
Vue.use(VueMeta,{
    keyName: 'head'
})
const router = new VueRouter({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },

    routes: [{
        path: '/start',
        name: 'start',

        component: () => import(/*webpackChunkName: "Start"*/ "./views/Start.vue")

    },
        {
            path: '/collections',
            name: 'collections',
            component: () => import(/*webpackChunkName: "Collections"*/ "./views/Collections.vue"),

            meta: {requiresAuth: true}
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import(/*webpackChunkName: "Dashboard"*/ "./views/Dashboard.vue"),

            meta: {requiresAuth: true}
        },
        {
            path: '/search/:search',
            name: 'search',
            component: Search,
            meta: {requiresAuth: false}
        },
        {
            path: '/',
            name: 'Home',
            component: () => import(/*webpackChunkName: "Collections"*/ "./views/Lexemes.vue"),
            meta: {requiresAuth: false}
        }, {
            path: '/collections/:id',
            name: 'collection',
            component: () => import(/*webpackChunkName: "CollectionsDetail"*/ "./views/CollectionsDetail.vue"),

            meta: {requiresAuth: true}
        }, {
            path: '/groups/:id',
            name: 'group',
            component: () => import(/*webpackChunkName: "GroupDetail"*/ "./views/GroupDetail.vue"),

            meta: {requiresAuth: true}
        }, {
            path: '/groups/join/:id/:hash',
            name: 'groupJoin',
            component: () => import(/*webpackChunkName: "GroupJoin"*/ "./views/GroupJoin.vue"),

            meta: {requiresAuth: true}
        }, {
            path: '/groups',
            name: 'groups',
            component: () => import(/*webpackChunkName: "Groups"*/ "./views/Groups.vue"),

            meta: {requiresAuth: true}
        }, {
            path: '/lexeme/:id',
            name: 'lexeme',
            component: () => import(/*webpackChunkName: "LexemeDetail"*/ "./views/LexemeDetail.vue"),
        }, {
            path: '/posting/:id',
            name: 'post',
            component: () => import(/*webpackChunkName: "PostDetail"*/ "./views/PostDetail.vue"),

        },
        {
            path: '/lexeme_Edit/:id',
            name: 'lexemeEdit',
            meta: {requiresAuth: true},
            component: () => import(/*webpackChunkName: "LexemeEdit"*/ "./views/LexemeEdit.vue"),

        },
        {
            path: '/account/:username',
            name: 'sccount',
            component: () => import(/*webpackChunkName: "AccountDetail"*/ "./views/AccountDetail"),

        },
        {
            path: '/postings',
            name: 'postings',
            component: () => import(/*webpackChunkName: "Postings"*/ "./views/Postings.vue"),

        }
        ,
        {
            path: '/card-create',
            name: 'card-create',
            meta: {requiresAuth: true},
            component: () => import(/*webpackChunkName: "CardCreate"*/ "./components/CardCreate.vue"),

        },
        {
            path: '/lexemes',
            name: 'lexemes',
            component: () => import(/*webpackChunkName: "Lexemes"*/ "./views/Lexemes.vue"),

            meta: {requiresAuth: false}
        },

        {
            path: '/account',
            name: 'account',
            component: () => import(/*webpackChunkName: "Settings"*/ "./views/Settings.vue"),

            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/*webpackChunkName: "Login"*/ "./views/Login.vue"),

        }, {
            path: '/reports',
            name: 'reports',
            meta: {requiresSuperUser: true},
            component: () => import(/*webpackChunkName: "Reports"*/ "./views/Reports.vue"),


        }, {
            path: '/highscore',
            name: 'highscore',
            component: () => import(/*webpackChunkName: "Highscore"*/ "./views/Highscore.vue"),


        },
        {
            path: '/imprint',
            name: 'imprint',
            component: () => import(/*webpackChunkName: "Imprint"*/ "./views/Imprint.vue"),


        },
        {
            path: '/faq',
            name: 'faq',
            component: () => import(/*webpackChunkName: "FAQ"*/ "./views/FAQ.vue"),


        },{
            path: '/dataprotection',
            name: 'dataprotection',
            component: () => import(/*webpackChunkName: "DataProtection"*/ "./views/DataProtection.vue"),


        },
    ]
})
router.beforeEach((to, from, next) => {


        if (to.matched.some(record => record.meta.requiresAuth)) {
            const isAuthenticated = store.getters['auth/authenticated'];

            if (!isAuthenticated) {
                next({
                    name: "login",
                    query: {
                        nextUrl: to.fullPath,
                    }
                });
            }
        }

    if (to.matched.some(record => record.meta.requiresSuperUser)) {
        const isSuperUser = store.getters['auth/isSuperUser'];

        if (!isSuperUser) {
            next({
                name: "login",
                query: {
                    nextUrl: to.fullPath,
                }
            });
        }
    }
        next();
    }
)

export default router
