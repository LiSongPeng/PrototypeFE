/**
 * Created by Letg4 on 2017/9/11.
 */
//当 datatype 为"local" 时需填写
var knlgList2=angular.module('knlgList2',['globalconfig',['jqGrid']]);

knlgList2.controller('knlgList2Ctrl',knlgList2Ctrl);
function knlgList2Ctrl($scope) {
    var grid_data = [{
        id: "00001",
        kTitle: "你好",
        kAnswer: "你也好",
        kUseCount: "2",
        kUseTimeLast: "2017-5-7",
        kApprStatus: "录入待审批",
        kApprUserId: "00002",
        kApprTime: "2017-4-9",
        kApprMemo: "常用",
        createUserId: "00003",
        createTime: "2015-6-8"
    }];
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    $(document).ready(function () {
        $("#grid-table").jqGrid({
            ajaxGridOptions: {
                beforeSend: function (jqXHR, settings) {
                    var currUid = window.sessionStorage.getItem("currUser");
                    var currUser = JSON.parse(currUid);
                    jqXHR.setRequestHeader("Current-UserId", currUser.id);
                }
            },

            url: BASE_URL + "kno/selectPage2.form",


            mtype: "GET",
            //data: grid_data, //当 datatype 为"local" 时需填写
            datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
//            jsonp:"callback",
            height: "auto", //高度，表格高度。可为数值、百分比或'auto'

            colNames: ['知识id', '知识标题', '使用次数', '最后一次使用时间', '审批状态', '审批人', '审批时间', '审批意见', '创建人', '创建时间'],
            colModel: [

                {name: "id", index: "id", hidden: true, width: 100, editable: false},
                {name: "kTitle", index: "kTitle", width: 100, editable: true},
                //{name: "kAnswer", index: "kAnswer", width: 170, sorttype: "double", editable: true},
                {name: "kUseCount", index: "kUseCount", width: 100, editable: true},
                {
                    name: "kUserTimeLast",
                    index: "kUserTimeLast",
                    width: 220,
                    sortable: false,
                    editable: true,
                    formatter: function (cellvalue, options, row) {
                        return new Date(cellvalue).toLocaleString()
                    }
                },
                {name: "kApprStatus", index: "kApprStatus", width: 150, editable: true},
                {name: "kApprUserId", index: "kApprUserId", width: 150, editable: true},
                {
                    name: "kApprTime",
                    index: "kApprTime",
                    width: 220,
                    editable: true,
                    formatter: function (cellvalue, options, row) {
                        return new Date(cellvalue).toLocaleString()
                    }
                },
                {name: "kApprMemo", index: "kApprMemo", width: 150, editable: true},
                {name: "createUserId", index: "createUserId", width: 150, editable: true},
                {
                    name: "createTime",
                    index: "createTime",
                    width: 220,
                    editable: true,
                    formatter: function (cellvalue, options, row) {
                        return new Date(cellvalue).toLocaleString()
                    }
                }],
            viewrecords: true, //是否在浏览导航栏显示记录总数
            //scroll: 1,
            rowNum: 8, //每页显示记录数
            rowList: [10, 20, 30], //用于改变显示行数的下拉列表框的元素数组。
            pager: pager_selector, //分页、按钮所在的浏览导航栏
            altRows: true, //设置为交替行表格,默认为false
            multiselect: true, //是否多选
            multiboxonly: true, //是否只能点击复选框多选
            //sortname:'id',//默认的排序列名
            //sortorder:'asc',//默认的排序方式（asc升序，desc降序）
            caption: "知识管理", //表名
            autowidth: true, //自动宽
//
            repeatitems: false,
            jsonReader: {

                root: "content",
                page: "currentPage",
                total: "totalPages",
                records: "totalCounts"
            },
            loadComplete: function () {
                var table = this;
                setTimeout(function () {
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                }, 0);
            },


            gridComplete: function () {
                //单选处理
                if (true) {
                    var gridId = grid_selector.substring(1);
                    $("#cb_" + gridId).hide();//隐藏全选按钮
                    $(grid_selector).find("td[aria-describedby='" + gridId + "_cb']").find("input[type='checkbox']").prop("type", "radio");//将checkbox替换为radio
                    $(grid_selector).find("td[aria-describedby='" + gridId + "_cb']").find("input[type='radio']").prop("name", gridId);//radio设为同一名字
                }

            },

            beforeSelectRow: function () {
                //单选处理
                if (true) {
                    // $(grid_selector).jqGrid('clearSelect'); //执行自定义的函数（下面会讲）
                    $(grid_selector).find(".ui-state-highlight").removeClass("ui-state-highlight").removeAttr("aria-selected"); //样式控制
                    return true;
                }
            }


        });
//浏览导航栏添加功能部分代码

        jQuery(grid_selector).jqGrid('navGrid', pager_selector, {
                edit: false,
                editicon: 'icon-pencil gray',
                add: false,
                addicon: 'icon-plus-sign purple',
                del: false,
                delicon: 'icon-trash red',
                search: false,
                searchicon: 'icon-search orange',
                refresh: true,
                refreshicon: 'icon-refresh green',
                view: false,
                viewicon: 'icon-zoom-in grey'
            },

            {}, // edit options
            {}, // add options
            {}, // delete options
            {})
            .navButtonAdd(pager_selector, {
                caption: "",
                buttonicon: "icon-pencil gray",
                onClickButton: function () {
                    var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

                    if (ids == '') {
                        alert("请选择需要编辑的内容");

                        location.href = "home.html#!/knowledgeRepo/knowledgeList2.html"

                    } else {

                        location.href = "home.html#!/knowledgeRepo/knowledgeApprova.html?id=" + ids
                    }
                },
//                title:"知识编辑",
                position: "first"
            }, {});

        function style_edit_form(form) {
            //enable datepicker on "sdate" field and switches for "stock" field
//                form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
//                    .end().find('input[name=stock]')
//                    .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

            //update buttons classes
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
            buttons.eq(1).prepend('<i class="icon-remove"></i>')

            buttons = form.next().find('.navButton a');
            buttons.find('.ui-icon').remove();
            buttons.eq(0).append('<i class="icon-chevron-left"></i>');
            buttons.eq(1).append('<i class="icon-chevron-right"></i>');
        }

        function style_delete_form(form) {
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
            buttons.eq(1).prepend('<i class="icon-remove"></i>')
        }

        function style_search_filters(form) {
            form.find('.delete-rule').val('X');
            form.find('.add-rule').addClass('btn btn-xs btn-primary');
            form.find('.add-group').addClass('btn btn-xs btn-success');
            form.find('.delete-group').addClass('btn btn-xs btn-danger');
        }

        function style_search_form(form) {
            var dialog = form.closest('.ui-jqdialog');
            var buttons = dialog.find('.EditTable')
            buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
            buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
            buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
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
                    'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
                    'ui-icon-seek-prev': 'icon-angle-left bigger-140',
                    'ui-icon-seek-next': 'icon-angle-right bigger-140',
                    'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
                };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({container: 'body'});
            $(table).find('.ui-pg-div').tooltip({container: 'body'});
        }


    });
};