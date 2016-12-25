angular.module('ionicStock.services', [])

  .factory ('encodeURIService', function () {
      return {
        encode: function (string){
          return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
        }
      };
  })

  .factory('dateService', function ($filter) {

    var currentDate = function () {
      var d = new Date();
      var date = $filter('date')(d, 'yyyy-MM-dd');
      return date;
    };

    var oneYearAgoDate = function () {
      var d = new Date(new Date().setDate(new Date().getDate() - 365));
      var date = $filter('date')(d, 'yyyy-MM-dd');
      return date;
    };

    return {
      currentDate: currentDate,
      oneYearAgoDate: oneYearAgoDate
    }
  })


  .factory('stockDataService', function ($q, $http, encodeURIService) {

    var getDetailsData = function (ticker) {

      var deferred = $q.defer(),
        query = 'select * from yahoo.finance.quotes where symbol IN ("' + ticker + '")' ,
        url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';

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
