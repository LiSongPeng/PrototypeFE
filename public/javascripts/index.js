/**
 * Created by Letg4 on 2017/8/28.
 */
var indexapp = angular.module('indexapp', ['mainRouter', 'globalconfig']);
// indexapp.config(function ($httpProvider) {
//     var currUid=window.sessionStorage.getItem("currUser");
//     console.log(currUid);
//     $httpProvider.defaults.headers.common = { 'Current-UserId' : currUid.id }
// });
indexapp.controller('navController', ['$scope', function ($scope) {
    $scope.currUser = JSON.parse(window.sessionStorage.getItem('currUser'));
    $scope.quit = function () {
        window.sessionStorage.removeItem("currUser");
        window.location.href = "index.html";
    };
}]);
indexapp.controller('mainCtrl', mainController);
// indexapp.controller('loginboxCtrl',loginboxController);
indexapp.controller('navListCtrl', ['$scope', '$rootScope', navController]);
indexapp.controller('breadcrumbCtrl', ['$scope', breadcrumbCtrl]);