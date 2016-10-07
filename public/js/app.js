var app = angular.module('app', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('pink');
    });

app.controller('mainCtrl'
    , function ($scope, $http) {
        $scope.chatInput = {};
        var chatElement = angular.element( document.querySelector( '#chatElement' ) );
        var chatWindow = angular.element( document.querySelector( '#chatWindow' ) )
        $scope.sendText = function (text) {
            if (text) {
                var data = {
                    text : text
                }
                $http.post('/chatResponse', data)
                    .then(function(response){
                        var text = response.data.text[0] || "pardon me please";
                        chatElement.append("<div class='watson' layout='row' layout-align='start center'><span flex='60'><h1 flex class='fill-container'>" + text + "</h1></div>");
                        scrollDown();
                    }, function(err){
                        console.log(err)
                    });

                $scope.chatInput = {
                    text: text,
                    id: "u"
                }
                console.log($scope.chatInput);
                chatElement.append("<div class='user' layout='row' layout-align='end center'><span flex='60'><h1 flex class='fill-container'>" + $scope.chatInput.text + "</h1></div>");
            }
            $scope.chatInput = {};
            scrollDown();
        };

        function scrollDown(){
            document.getElementById("chatWindow").scrollTop = document.getElementById("chatWindow").scrollHeight;
        }
    }
)