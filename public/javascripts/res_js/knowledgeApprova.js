/**
 * Created by Letg4 on 2017/9/11.
 */
var knlgApprova=angular.module('knlgApprova',['globalconfig',["wangEditor"]]);

knlgApprova.controller('knlgApprovaCtrl',knlgApprovaCtrl);

function knlgApprovaCtrl($scope ) {
var str = location.href; //取得整个地址栏
var num = str.indexOf("?");
str = str.substr(num + 1);
var E = window.wangEditor;
var editor1 = new E('#div1');
var editor2 = new E('#div2');

editor1.customConfig.menus = [];
editor2.customConfig.menus = [];

editor1.create();
editor2.create();
editor2.$textElem.attr('contenteditable', false)
$(function () {




    var url = BASE_URL+"kno/queryKnowledgeById.form?" + str;

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
        success: function (data) {

            document.getElementById("kTitle").innerText = data.kTitle;
            document.getElementById("aa").innerHTML = data.kAnswer;
            document.getElementById("kUseCount").innerText = data.kUseCount;
            // document.getElementById("kUseTimeLast").innerText=data.kUseTimeLast;


            var msg = '';

            msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："


//                $("#myform").after(msg); //将返回信息插入页面对应的元素后
        }
    });

//        $.getJSON(url, function (data) {
//
//            document.getElementById("kTitle").innerText = data.kTitle;
//            document.getElementById("aa").innerHTML = data.kAnswer;
//            document.getElementById("kUseCount").innerText = data.kUseCount;
//            // document.getElementById("kUseTimeLast").innerText=data.kUseTimeLast;
//
//
//            var msg = '';
//
//            msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："
//
//
////                $("#myform").after(msg); //将返回信息插入页面对应的元素后
//        });


});


$(function () {

    var button;
    $("#agree").click(function () {
        button = document.getElementById("agree").value


    });
    $("#disagree").click(function () {
        button = document.getElementById("disagree").value


    });
    $("#knowledge").submit(function () {
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        str = str.substr(num + 4);
        document.getElementById("id").value = str;
        document.getElementById("button").value = button;


        document.getElementById("kApprMemo").value = editor1.txt.text();

        var data = $(this).serialize(); //序列化表单数据

        $.ajax({
            type: "GET",
            url: BASE_URL+"kno/knowledgeApprova.form",
            data:data,
            dataType: "json",
            headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
            success: function (json) {
                var msg = '';

                msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："


//                $("#myform").after(msg); //将返回信息插入页面对应的元素后

            }
        });

//            $.getJSON(BASE_URL+"aknowledgeApprova.form", data, function (json) {
//                var msg = '';
//
//                msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："
//
//
////                $("#myform").after(msg); //将返回信息插入页面对应的元素后
//            });
        alert("审批成功！")
        location.href = "home.html#!/knowledgeRepo/knowledgeList.html";

        return false;
    });
});
$("#back").click(function () {
        location.href = "home.html#!/knowledgeRepo/knowledgeList2.html";
    }
)

};