



app.controller('Dep_Ctrl', function ($scope, $http, $timeout) {


    $scope.data_dep = {
        multiSelect: false,
        enableRowHeaderSelection: false
    };

    $scope.data_dep.columnDefs = [
        {name: 'DEP', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'COEF', minWidth: 30, maxWidth: 150, editable: false},
        {
            name: 'Delete',
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.deleteRow(row)"> Sup</button>'
        }

    ];


    $scope.data_dep.onRegisterApi = function (gridApi) {
        $scope.gridApi3 = gridApi;

        gridApi.cellNav.on.navigate($scope, function (newRowCol) {
            $scope.gridApi3.selection.selectRow(newRowCol.row.entity);

        });
    };


    $scope.deleteRow = function (row) {
        // var row=$scope.data_dep.cellNav.getFocusedCell().row.entity.id-1;
        alert('fait');
        var index = $scope.data_dep.data.indexOf(row.entity);
        $scope.data_dep.data.splice(index, 1);
    };

    $scope.addNewItem = function () {
        $scope.data_dep.data.push({name: 'Test add ', title: 'Test add'});
    };

    $scope.insertNewItem = function () {
        $scope.data_dep.data.splice(1, 0, {name: 'Test insert ', title: 'Test insert'});
    };


    $scope.read_mysql_dep = function () {
        show_modal("Progress");
        var url = "/read_table/RB_Coef_departement";
        $http.get(url).success(function (data) {
            $scope.data_dep.data = data;

            $timeout(function () {
                //    focuser_a(1);
                hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });

    };


});
