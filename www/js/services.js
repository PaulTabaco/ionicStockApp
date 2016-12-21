angular.module('ionicStock.services', [])
  .factory('stockDataService', function ($q, $http) {

    var getDetailsData = function (ticker) {

      var deferred = $q.defer(),
        url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22" + ticker + "%22)&format=json&env=http://datatables.org/alltables.env";
      console.log("URL:" + url);

      $http.get(url)
        .success(function (json) {
          //console.log(json.query.results.quote);
          var jsonData = json.query.results.quote;
          deferred.resolve(jsonData);
        })
        .error(function (error) {
          console.log("Detail Data Error: " + error);
          deferred.reject();
        });
      return deferred.promise;
    };

    var getPriceData = function (ticker) {

      var deferred = $q.defer(),
        //url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json";
        url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22" + ticker + "%22)&format=json&env=http://datatables.org/alltables.env";
      console.log("URL:" + url);

      $http.get(url)
        .success(function (json) {
          //console.log(json.query.results.quote);
          var jsonData = json.query.results.quote;
          deferred.resolve(jsonData);
        })
        .error(function (error) {
          console.log("Price Data Error: " + error);
          deferred.reject();
        });
       return deferred.promise;
    };

    return  {
      getPriceData: getPriceData,
      getDetailsData: getDetailsData
    } ;
  });



;
