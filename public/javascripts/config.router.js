var app=angular.module('mainRouter',['ui.router','lazyloadConfig']);


app.config(function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug:true,
        events:false,
        modules:Modules_Config
    });
    $urlRouterProvider.otherwise("/search.html");
    $stateProvider
        .state("用户管理",{
            url:"/embed/user/userList.html",
            templateUrl:"embed/user/userList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_userList"]);
                }
            }
        })
        .state("用户添加",{
            url:"/embed/user/userAdd.html",
            templateUrl:"embed/user/userAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["select2","toastr","res_userAdd"])
                }
            }
        })
        .state("资源管理",{
            url:"embed/resource/resourceList.html",
            templateUrl:"embed/resource/resourceList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_resourceList"])
                }
            }
        }).state("角色管理",{
            url:"/embed/role/roleList.html",
            templateUrl:"embed/role/roleList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_roleList"])
                }
            }
        })
        .state("新建资源",{
            url:"embed/resource/resourceAdd.html",
            templateUrl:"embed/resource/resourceAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_resourceAdd"])
                }
            }
        })
        .state("新建角色",{
            url:"embed/role/roleAdd.html",
            templateUrl:"embed/role/roleAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_roleAdd"])
                }
            }
        })
        .state("角色授权",{
            url:"/embed/role/roleAuthor.html",
            templateUrl:"embed/role/roleAuthor.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","bootstrap-treeview","res_roleAuth"])
                }
            }
        })
        .state("设置用户角色",{
            url:"/embed/user/userRole.html",
            templateUrl:"embed/user/userRole.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","bootstrap-treeview","res_userRole"])
                }
            }
        })

});