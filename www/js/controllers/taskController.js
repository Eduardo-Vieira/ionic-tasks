angular.module('starter', ['ionic'])

.controller('taskController', function($scope, $ionicPopup, $ionicListDelegate) {
    var tasks = new getTasks();
    $scope.lista = tasks.items;
    $scope.removeStatus = false;
    $scope.showMarked = false;

    function getItem(item, novo) {

        var title = novo ? 'Nova Tarefa' : 'Editar Tarefa';

        $scope.data = {};
        $scope.data.newTask = item.nome;

        $ionicPopup.show({
            title:title,
            scope: $scope,
            template: "<input type='text' placeholder='Tarefa' autofocus=true ng-model='data.newTask'>",
            buttons: [
                { text: "Ok",
                  onTap: function(e) {
                      item.nome = $scope.data.newTask;
                      if(novo) {
                      tasks.add(item);
                    }
                    tasks.save();
                  }
                },
                {text: "Cancel"}
            ]
        });
        $ionicListDelegate.closeOptionButtons();
    };

    $scope.onHideItem = function(item) {
            return item.finalizada && !$scope.showMarked;
    };

    $scope.onItemAdd = function() {
        var item = {nome: '', finalizada: false};
        getItem(item,true);
    };

    $scope.onEditItem = function(item) {
        getItem(item);
    };

    $scope.onMarkTask = function(item) {
        item.finalizada = !item.finalizada;
        tasks.save();
    };

    $scope.onItemRemove = function(item) {
        tasks.remove(item);
        tasks.save();
    }

    $scope.onClickRemove = function() {
        $scope.removeStatus = !$scope.removeStatus;
    };

});
