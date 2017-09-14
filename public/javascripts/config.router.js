var app=angular.module('mainRouter',['ui.router','lazyloadConfig']);


app.config(function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug:true,
        events:false,
        modules:Modules_Config
    });
    $urlRouterProvider.otherwise("/search.html");
    $stateProvider

        .state("知识管理",{
            url:"/knowledgeRepo/knowledgeList.html",
            templateUrl:"knowledgeRepo/knowledgeList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_knowledgeList"]);
                }
            }
        })
            .state("知识审批",{
            url:"/knowledgeRepo/knowledgeList2.html",
            templateUrl:"knowledgeRepo/knowledgeList2.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_knowledgeList2"]);
                }
            }
        })

        .state("知识添加",{
        url:"/knowledgeRepo/knowledgeAdd.html",
        templateUrl:"knowledgeRepo/knowledgeAdd.html",
        resolve:{
            deps:function ($ocLazyLoad) {
                return $ocLazyLoad.load(["res_knowledgeAdd"]);
            }
        }

    })
        .state("知识编辑",{
            url:"/knowledgeRepo/knowledgeEdit.html",
            templateUrl:"knowledgeRepo/knowledgeEdit.html",
            resolve:{
                // deps:function ($ocLazyLoad) {
                //     return $ocLazyLoad.load(["res_knowledgeEdit"]);
                // }
            }

        })

        .state("知识审批批",{
            url:"/knowledgeRepo/knowledgeApprova.html",
            templateUrl:"knowledgeRepo/knowledgeApprova.html",
            resolve:{
                // deps:function ($ocLazyLoad) {
                //     return $ocLazyLoad.load(["res_knowledgeApprova"]);
                // }
            }

        })

        .state("用户管理",{
            url:"/user/userList.html",
            templateUrl:"user/userList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_userList"]);
                }
            }
        })
        .state("知识搜索",{
            url:"/search.html",
            templateUrl:"search.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_search"]);
                }
            }
        })
        .state("knowledgeDetail",{
            url:"/knowledgeDetail.html",
            templateUrl:"knowledgeDetail.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_knowledgeDetail"])
                }
            }
        })
        .state("用户添加",{
            url:"/user/userAdd.html",
            templateUrl:"user/userAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["select2","toastr","res_userAdd"])
                }
            }
        })
        .state("资源管理",{
            url:"/resource/resourceList.html",
            templateUrl:"resource/resourceList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_resourceList"])
                }
            }
        }).state("角色管理",{
            url:"/role/roleList.html",
            templateUrl:"role/roleList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_roleList"])
                }
            }
        })
        .state("新建资源",{
            url:"/resource/resourceAdd.html",
            templateUrl:"resource/resourceAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_resourceAdd"])
                }
            }
        })
        .state("新建角色",{
            url:"/role/roleAdd.html",
            templateUrl:"role/roleAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_roleAdd"])
                }
            }
        })
        .state("角色授权",{
            url:"/role/roleAuthor.html",
            templateUrl:"role/roleAuthor.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","bootstrap-treeview","res_roleAuth"])
                }
            }
        })
        .state("设置用户角色",{
            url:"/user/userRole.html",
            templateUrl:"user/userRole.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","bootstrap-treeview","res_userRole"])
                }
            }
        })

});