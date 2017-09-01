show_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "block";};
    
hide_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "none";};



app.controller('Liste_complete_Ctrl', function ($scope, $http, $timeout) {

    function focuser_a(n) {
        $scope.gridApi3.selection.selectRow($scope.data_dep.data[n - 1]);
        $scope.gridApi3.cellNav.scrollToFocus($scope.data_dep.data[n - 1], $scope.data_dep.columnDefs[0]);
    }



    $scope.data_dep = {
        multiSelect: false,
        enableRowHeaderSelection: false
    };

    $scope.data_dep.columnDefs = [
        {name: 'symbol', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'name', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'rank', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'price_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'price_btc', minWidth: 30, maxWidth: 150, editable: false},
        {name: '24h_volume_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'market_cap_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'percent_change_24h', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'percent_change_7d', minWidth: 30, maxWidth: 150, editable: false},

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
   
        //document.getElementById("Progress").style.display = "block";
       show_modal("Progress");
        var url = "https://api.coinmarketcap.com/v1/ticker/?limit=25";
        $http.get(url).success(function (data) {
        //alert(JSON.stringify(data))
        //alert(data[0].name)
         
           $scope.data_dep.data = data;

            $timeout(function () {
                   focuser_a(1);
                  hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });

    };



    $scope.options = {
        data: [
          {time:1, sales:130,Prix: 1000},
          {time:2, sales:400,Prix: 500},
          {time:3, sales:115,Prix: 100},
          {time:4, sales:117,Prix: 130},
          {time:5, sales:112,Prix: 160},
          {time:6, sales:115,Prix: 100},
          {time:7, sales:116,Prix: 170},
          {time:8, sales:115,Prix: 100}
        ],
        dimensions: {    
            time: {
           axis: 'y'
          },
          sales: {
                type: 'line'
              },
              Prix: {
            type: 'bar'
          },
      
        }
      };

      // optional (direct access to c3js API http://c3js.org/reference.html#api) 
   $scope.instance = null;


});
