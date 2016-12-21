angular.module('ionicStock.services', [])
  .factory('stockDataService', function ($q, $http) {

    var getPriceData = function (ticker) {

      var defierred = $q.defer(),
        url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22" + ticker + "%22)&format=json&env=http://datatables.org/alltables.env";
      console.log("URL:" + url);

      $http.get(url)
        .success(function (json) {

          //console.log(json.query.results.quote);

          var jsonData = json.query.results.quote;
          defierred.resolve(jsonData);
        })
        .error(function (error) {
          console.log("Price Data Error: " + error);
          defierred.reject();
        });
       return defierred.promise;
    };

    return  {
      getPriceData: getPriceData
    } ;
  });



;
