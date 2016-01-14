console.log(typeof angular);

var mainApp = angular.module('CCapp', []);

//Service for Get Book List
mainApp.factory('getBookListService', function($http) {
   return {
        getBooks: function() {
			 var getBooksListAjax = $http.get('http://127.0.0.1:8081/api/books');
             var getBooksListResult = getBooksListAjax.then(function(result) {
                            //resolve the promise as the data
							//result = JSON.parse(result);
                            if('NULL' != result){
								return result.data;
							}
							
             });
             //return the promise directly.
             return getBooksListResult;
        }
   }
});


//Service for Adding Book 
mainApp.factory('addBookServ', function($http) {
   return {
        add: function(bookData) {
			 var addBookAjax = $http.post('http://127.0.0.1:8081/api/books',bookData)
							.then(function(result) {
								//resolve the promise as the data
								//result = JSON.parse(result);
								if('NULL' != result){
									return result.data;
								}
             });
             //return the promise directly.
             return addBookAjax;
        }
   }
});


//Controller
mainApp.controller('table_controller', function($scope, $http, getBookListService, addBookServ) {
		
	//Using getBookListService 
	getBookListService.getBooks().then(function(responsBooks){
			$scope.books = responsBooks;
			//console.log($scope.books);
	});
	
	//Adding Book
	$scope.submit = function($http){
			
			//create new Book
			var book = {"title":"" , "description":"" , "authors": [ ]};
			book.title = $scope.addBook.title;
			book.description = $scope.addBook.description;
			book.authors = $scope.addBook.authorsList.split(",");
			
			//Calling service
			addBookServ.add(book).then(function(data){
					//SUCCESS : Updated Table displays Creating new book	
					if('success' == data.response.message && 'null' != data.item[0].id)
						getBookListService.getBooks().then(function(responsBooks){
							$scope.books = responsBooks;
					});
				});
		
	}
	
	//Delete book
	$scope.delete = function(){
		//Delete AJAX call goes here
		//ng-value='UUId' carries UUID for AJAX call
	};
});

	
	
		
			