/**
 * Created by Letg4 on 2017/9/6.
 */

var ulistapp=angular.module('ulistapp',['globalconfig','ui.router']);

ulistapp.controller("uGridCtrl",uGridCtrl);
function uGridCtrl($scope,$state,$http) {


    jQuery(function ($) {
        var user_query_url='user/query.form';
        var grid_selector = "#grid-table";
        var pager_selector = "#grid-pager";
        var grid_searcher ="#grid-search";
        var colNames=['用户ID','用户名称','用户密码','用户描述','创建者','删除状态','创建时间','最后一次登录时间'];
        var colModel=[
//                {name:'edit',index:'',width:80, fixed:true, sortable:false, resize:false,
//                    formatter: function (cellvalue,options,rowObject) {
//                        var html="<button class='fm-button' onclick='goEdit(\""+rowObject.id+"\")' ng-click='toEdit($event)'>修改</button>";
//                        return html;
//                    }},
            {name:'id',index:'id',key:true,width:60,hidden:true,editable:false},
            {name:'uName',index:'uName',width:80,editable:true,editoptions:{size:"40",maxlength:"50"}},
            {name:'uPassword',index:'uPassword',width:80,hidden:true,editable:true,editoptions:{size:"40",maxlength:"50"}},
            {name:'uDescription',index:'uDescription',width:140,sortable:false,editable:true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}},
            {name:'createUser',index:'createUser',width:60,editable:false,
                formatter:function (cellvalue,options,rowObject){
                    var crtuser=angular.fromJson(cellvalue);
                    if (crtuser===null){
                        return "无";
                    }
                    return cellvalue.uName;
                }   },
            {name:'deleteStatus',index:'deleteStatus',width:50,edittype:"checkbox",
                formatter:function (cellvalue,options,rowObject) {
                    var color="",cev="未删除";
                    if (cellvalue===0){
                        color="red";
                        cev="已删除";
                    }
                    var total="<span style='color:"+color+"'>"+cev+"</span>"
                    return total;
                }},
            {name:'createTime',index:'createTime',width:110,editable:false,sorttype:"date"},
            {name:'uLastOnLine',index:'uLastOnLine',width:110,editable:false,sorttype:"date"}
        ];
        var prmNames={
            page:"currentPage",    // 表示请求页码的参数名称
            rows:"pageSize",    // 表示请求行数的参数名称
            sort: "sidx", // 表示用于排序的列名的参数名称
            order: "sord", // 表示采用的排序方式的参数名称
            search:"search", // 表示是否是搜索请求的参数名称
            nd:"nd", // 表示已经发送请求的次数的参数名称
            id:"id", // 表示当在编辑数据模块中发送数据时，使用的id的名称
            oper:"oper",    // operation参数名称（我暂时还没用到）
            editoper:"edit", // 当在edit模式中提交数据时，操作的名称
            addoper:"add", // 当在add模式中提交数据时，操作的名称
            deloper:"del", // 当在delete模式中提交数据时，操作的名称
            subgridid:"id", // 当点击以载入数据到子表时，传递的数据名称
            npage: null,
            totalrows:"totalCounts" // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
        };
        var jsonReaderConfig={
            root: "content",   // json中代表实际模型数据的入口
            page: "currentPage",   // json中代表当前页码的数据
            total: "totalPage", // json中代表页码总数的数据
            records: "totalCounts", // json中代表数据行总数的数据
            cell: "cell",
            id: "id",
            userdata: "userdata",
            repeatitems: false
        };
        var currUid=window.sessionStorage.getItem("currUser");
        var currUser=JSON.parse(currUid);
        jQuery(grid_selector).jqGrid({
            ajaxGridOptions:{
                beforeSend:function(jqXHR, settings) {
                    var currUid=window.sessionStorage.getItem("currUser");
                    var currUser=JSON.parse(currUid);
                    jqXHR.setRequestHeader("Current-UserId",currUser.id);
                }
            },
            url: BASE_URL+user_query_url,
            mtype:"POST",
            datatype: "json",
            height: 500,
            colNames: colNames,
            colModel: colModel,
            viewrecords: true,
            rowNum: 15,
            rowList: [10, 15, 20, 25, 30],
            pager: pager_selector,
            multiselect: false,
            multiboxonly: true,
            caption: "用户列表",
            autowidth: true,
            rownumbers:true,
            prmNames: prmNames,
            jsonReader: jsonReaderConfig,
            loadComplete : function() {
                var table = this;
                setTimeout(function(){
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                }, 0);
            },
            // loadBeforeSend:  function(jqXHR, settings) {
            //     var currUid=window.sessionStorage.getItem("currUser");
            //     var currUser=JSON.parse(currUid);
            //     jqXHR.setRequestHeader("Current-UserId",currUser.id);
            // },
            editurl:BASE_URL+"user/delete.form"
        });
        jQuery(grid_selector).jqGrid('navGrid',pager_selector,{
            edit: false,
            editicon : 'icon-pencil gray',
            add: false,
            addicon : 'icon-plus-sign purple',
            del: false,
            delicon : 'icon-trash red',
            search: false,
            searchicon : 'icon-search orange',
            refresh: true,
            refreshicon : 'icon-refresh green',
            view: false,
            viewicon : 'icon-zoom-in grey'
        },{},{},{})
            .navButtonAdd(pager_selector,{
                caption:"",
                buttonicon:"icon-plus-sign purple",
                onClickButton:function () {
                    window.location.href="#!/user/userAdd.html";
                },
                title:"新建用户",
                position:"first"
            })
            .navButtonAdd(pager_selector,{
                caption:"",
                buttonicon:"icon-trash red",
                onClickButton:function () {
                    var selid=jQuery('#grid-table').jqGrid('getGridParam','selrow');
                    if (selid==null||selid===""){
                        toastr.warning("未选取用户");
                        return;
                    }
                    confirm(function (selid) {
                        $http({
                            method: "POST",
                            url: BASE_URL+"user/delete.form",
                            headers : {
                                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
                            },
                            data:$.param({
                                id:selid
                            })
                        }).then(function (response) {
                            jQuery('#grid-table').jqGrid('delRowData',selid);
                            toastr.success("删除成功！");
                        },function (response) {
                            if (response.status===403){
                                toastr.warning("删除失败！您所在的用户组没有此权限");
                            }
                            toastr.error("删除失败！错误代码及信息:"+response.status);
                        })
                    },selid)
                },
                title:"删除用户",
                position:"first"
            })
            .navButtonAdd(pager_selector,{
                caption:"",
                buttonicon:"icon-pencil gray",
                onClickButton:function () {
                    var selid=jQuery('#grid-table').jqGrid('getGridParam','selrow');
                    if (selid==null||selid===""){
                        toastr.warning("未选取用户");
                        return;
                    }
                    window.location.href="#!/user/userAdd.html?edit=true&editId="+selid;
                },
                title:"编辑用户",
                position:"first"
            })
            .navButtonAdd(pager_selector,{
                caption:"",
                buttonicon:"icon-user brown",
                onClickButton:function () {
                    var selid=jQuery('#grid-table').jqGrid('getGridParam','selrow');
                    if (selid==null||selid===""){
                        toastr.warning("未选取用户");
                        return;
                    }
                    window.location.href="#!/user/userRole.html?edit=true&editId="+selid;
                },
                title:"设置用户角色",
                position:"first"
            });


        jQuery(grid_searcher).filterGrid(grid_selector,{
//                gridModel: true,
            filterModel:[{
                label:'用户名称',
                name:'uName',
                stype:'text'
            }],
            formtype: 'horizontal',
            autosearch: false,
            buttonclass: 'fm-button btn-purple',
            enableSearch: true,
            enableClear: true
        });

        function confirm(fun, params) {
            if ($("#myConfirm").length > 0) {
                $("#myConfirm").remove();
            }
            var html = "<div class='modal fade' id='myConfirm' >"
                + "<div class='modal-dialog' style='z-index:2901; margin-top:60px; width:400px; '>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'  style='font-size:16px; '>"
                + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
                + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
                + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
                + "是否确定要删除？"
                + "</div>"
                + "<div class='modal-footer ' style=''>"
                + "<button class='btn btn-danger' id='confirmOk'>确定</button>"
                + "<button class='btn btn-info' data-dismiss='modal'>取消</button>"
                + "</div>" + "</div></div></div>";
            $("body").append(html);

            $("#myConfirm").modal("show");

            $("#confirmOk").on("click", function() {
                $("#myConfirm").modal("hide");
                fun(params); // 执行函数
            });
        }


        function style_delete_form(form) {
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
            buttons.eq(1).prepend('<i class="icon-remove"></i>')
        }


        function styleCheckbox(table) {
            /**
             $(table).find('input:checkbox').addClass('ace')
             .wrap('<label />')
             .after('<span class="lbl align-top" />')


             $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
             .find('input.cbox[type=checkbox]').addClass('ace')
             .wrap('<label />').after('<span class="lbl align-top" />');
             */
        }

        function updateActionIcons(table) {
            /**
             var replacement =
             {
                 'ui-icon-pencil' : 'icon-pencil blue',
                 'ui-icon-trash' : 'icon-trash red',
                 'ui-icon-disk' : 'icon-ok green',
                 'ui-icon-cancel' : 'icon-remove red'
             };
             $(table).find('.ui-pg-div span.ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
             */
        }

        function updatePagerIcons(table) {
            var replacement =
                {
                    'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
                    'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
                    'ui-icon-seek-next' : 'icon-angle-right bigger-140',
                    'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
                };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({container:'body'});
            $(table).find('.ui-pg-div').tooltip({container:'body'});
        }

    });
    function goEdit(rowid) {
        window.location.href="#!/user/userAdd.html?edit=true&editId="+rowid;
    }

    $scope.toEdit = function (event) {
        var thistr = $(event.target).parents("tr.jqgrow").eq(0);
        var rowid = thistr.attr("id");
        $state.go('新建用户', {edit: true, editId: rowid});
    }
}