var app = angular.module('lazyloadConfig', ['oc.lazyLoad']);
app.constant('Modules_Config', [
    {
        name: 'jqGrid',
        serie: true,
        files: [
            "/stylesheets/jquery-ui-1.10.3.full.min.css",
            "/plugins/jqGrid/css/ui.jqgrid.css",
            "/stylesheets/ace/ace.min.css",
            "/stylesheets/ace/ace-rtl.min.css",
            "/stylesheets/ace/ace-my-skins.css",
            "/javascripts/jquery-ui-1.10.3.full.min.js",
            "/plugins/jqGrid/js/jquery.jqGrid.min.js",
            "/plugins/jqGrid/js/grid.locale-cn.js",
            "/plugins/jqGrid/js/grid.addons.js"
        ]
    }, {
        name: 'select2',
        serie: true,
        files: [
            "/plugins/select2/css/select2.css",
            "/plugins/select2/js/select2.js",
            "/plugins/select2/js/i18n/zh-CN.js"
        ]
    }, {
        name: 'toastr',
        serie: true,
        files: [
            "/plugins/toastr/toastr.css",
            "/plugins/toastr/toastr.min.js"
        ]
    }, {
        name: 'jBox',
        serie: true,
        files: [
            "/plugins/jBox/jBox.css",
            "/plugins/jBox/jBox.min.js"
        ]
    }, {
        name: 'treeview',
        serie: true,
        files: [
            "/plugins/treeview/TreeView.min.js"
        ]
    }, {
        name: 'bootstrap-treeview',
        serie: true,
        files: [
            "/plugins/bootstrap-treeview/bootstrap-treeview.min.css",
            "/plugins/bootstrap-treeview/bootstrap-treeview.min.js"
        ]
    }, {
        name: 'bootstrap-validator',
        serie: true,
        files: [
            "/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "/plugins/bootstrap-validator/js/bootstrapValidator.min.js"
        ]
    },{
        name: 'wangEditor',
        serie: true,
        files: [
            "/javascripts/wangEditor.min.js"
        ]
    }, {
        name: 'res_search',
        serie: true,
        files: [
            "/javascripts/bootstrap/bootstrap-typeahead.js",
            "/javascripts/res_js/search.js"
        ]
    }, {
        name: 'res_knowledgeDetail',
        serie: true,
        files: [
            "/javascripts/res_js/detail.js"
        ]
    },{
        name:'res_userList',
        serie:true,
        files:[
            "/javascripts/controllers/userListCtrl.js"
        ]
    },{
        name:'res_resourceList',
        serie:true,
        files:[
            "/javascripts/controllers/resourceListCtrl.js"
        ]
    },{
        name:'res_roleList',
        serie:true,
        files:[
            "/javascripts/controllers/roleListCtrl.js"
        ]
    },{
        name:'res_userAdd',
        serie:true,
        files:[
            "/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "/javascripts/controllers/userAddCtrl.js"
        ]
    },{
        name:'res_roleAdd',
        serie:true,
        files:[
            // "/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            // "/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "/javascripts/controllers/roleAddCtrl.js"
        ]
    },{
        name:'res_resourceAdd',
        serie:true,
        files:[
            "/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "/javascripts/controllers/resourceAddCtrl.js"
        ]
    },{
        name:'res_roleAuth',
        serie:true,
        files:[
            "/javascripts/controllers/roleAuthCtrl.js"
        ]
    },{
        name:'res_userRole',
        serie:true,
        files:[
            "/javascripts/controllers/userRoleCtrl.js"
        ]
    }, {
        name: 'res_knowledgeAdd',
        serie: true,
        files: [
            "/javascripts/res_js/knowledgeAdd.js"
        ]
    },
    // {
    //     name:'res_knowledgeEdit',
    //     serie:true,
    //     files:[
    //         "/javascripts/res_js/knowledgeEdit.js"
    //     ]
    // },
    // {
    //     name:'res_knowledgeApprova',
    //     serie:true,
    //     files:[
    //         "/javascripts/res_js/knowledgeApprova.js"
    //     ]
    // },
    {
        name:'res_knowledgeList',
        serie:true,
        files:[
            "/javascripts/res_js/knowledgeList.js"
        ]
    },{
        name:'res_knowledgeList2',
        serie:true,
        files:[
            "/javascripts/res_js/knowledgeList2.js"
        ]
    }
]);