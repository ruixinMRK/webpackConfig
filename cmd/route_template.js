import Login from 'src/module/login';
const brandAudit = (resolve) =>
    import ( /* webpackChunkName: "brand_audit" */ 'src/module/brand/brand_audit');
const loginHead = (resolve) =>
    import ( /* webpackChunkName:"brand_head" */ 'src/module/brand/brand_head');
const brandBuild = (resolve) =>
    import ( /* webpackChunkName:"brand_build"*/ 'src/module/brand/brand_build');
const unbrandBuild = (resolve) =>
    import ( /* webpackChunkName:"unbrand_build" */ 'src/module/brand/unbrand_build');
const unbrandBuildUi = (resolve) =>
    import ( /* webpackChunkName:"unbrand_build" */ 'src/module/brand/unbrand_build_ui');
const aside = (resolve) =>
    import ( /* webpackChunkName:"aside" */ 'src/module/common/aside');
const detailsHeader = (resolve) =>
    import ( /* webpackChunkName:"details_header" */ 'src/module/common/details_header');
const mainCon = (resolve) =>
    import ( /* webpackChunkName:"main_con" */ 'src/module/common/main_con');
//首页概况
const homePage = (resolve) =>
    import ( /* webpackChunkName:"survey" */ 'src/module/home_page/survey');
//商品配置
const goodsManager = (resolve) =>
    import ( /* webpackChunkName:"details_con" */ 'src/module/goods_config/details_con');
const attrManager = (resolve) =>
    import ( /* webpackChunkName:"attr_manager" */ 'src/module/goods_config/attr_manager')
const packageManager = (resolve) =>
    import ( /* webpackChunkName:"package_manager" */ 'src/module/goods_config/package_manager')
const categoryManager = (resolve) =>
    import ( /* webpackChunkName:"category_manager" */ 'src/module/goods_config/category_manager')
const inventoryManager = (resolve) =>
    import ( /* webpackChunkName:"invcontrol" */ 'src/module/goods_config/invcontrol')
const marker = (resolve) =>
    import ( /* webpackChunkName:"marker" */ 'src/module/goods_config/marker')
const multiChannelMenu = (resolve) =>
    import ( /* webpackChunkName:"more_menu" */ 'src/module/goods_config/more_menu')


const warrant = (resolve) =>
    import ( /* webpackChunkName:"warrant" */ 'src/module/outfood/accredit/warrant'); //授权主页
const mtWarrant = (resolve) =>
    import ( /* webpackChunkName:"iframe_warrant" */ 'src/module/outfood/accredit/iframe_warrant'); //美团授权
const relmain = (resolve) =>
    import ( /* webpackChunkName:"warrant_relmain" */ 'src/module/outfood/accredit/warrant_relmain'); //授权    
const warranRelation = (resolve) =>
    import ( /* webpackChunkName:"warrant_relation" */ 'src/module/outfood/accredit/warrant_relation'); //饿了么，百度关联菜品
const warrantConfig = (resolve) =>
    import ( /* webpackChunkName:"warrant_config" */ 'src/module/outfood/accredit/warrant_config'); //美团店铺配置   
const goodsfig = (resolve) =>
    import ( /* webpackChunkName:"warrant_goodsfig" */ 'src/module/outfood/accredit/warrant_goodsfig'); //美团店铺配置 
const packConfig = (resolve) =>
    import ( /* webpackChunkName:"pack_config" */ 'src/module/outfood/accredit/pack_config'); //美团店铺配置  
const elebaidu = (resolve) =>
    import ( /* webpackChunkName:"elebaidu_relation" */ 'src/module/outfood/accredit/elebaidu_relation'); //       
'${const}'
let con = {
    template: "<router-view name= 'content'/>"
}
let details_header = {
    template: "<router-view name= 'details_header'/>"
}
let details_con = {
    template: `
        <div>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" style = 'padding-bottom:20px;'/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" style = 'padding-bottom:20px;'/>
        </div>
        `

}
// 配置路由
export default [{
        path: '/',
        components: {
            content: Login
        }
    },
    {
        path: '/brandAudit',
        components: {
            header: loginHead,
            content: con
        },
        children: [{
                path: '',
                components: {
                    content: brandAudit
                }
            },
            {
                path: 'brandBuild',
                components: {
                    content: brandBuild
                }
            },
            {
                path: 'unbrandBuild',
                components: {
                    content: unbrandBuild
                }
            },
            {
                path: 'unbrandBuildUi',
                components: {
                    content: unbrandBuildUi
                }
            }
        ]
    },
    {
        path: '/admin/authorization/relation',
        components: {
            content: relmain //饿了么，百度菜品关联，解除授权
        },
        children: [{
                path: '',
                components: {
                    nextCon: warranRelation
                }
            },
            {
                path: 'config',
                components: {
                    nextCon: warrantConfig
                }
            },
            {
                path: 'goodsfig',
                components: {
                    nextCon: goodsfig
                }
            },
            {
                path: 'packConfig',
                components: {
                    nextCon: packConfig
                }
            },
            {
                path: 'relationele',
                components: {
                    nextCon: elebaidu
                }
            }
        ]
    },
    {
        path: '/admin',
        components: {
            header: loginHead,
            content: mainCon
        },
        children: [{
            path: '',
            components: {
                aside: aside,
                details_header: detailsHeader,
                details_con: details_con
            },
            children: '${Array}'
        }, '${redirect}']
    }
];