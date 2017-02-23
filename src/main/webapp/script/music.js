var App = angular.module('App', []);


App.controller('GenresCtrl', function ($scope, $rootScope,$http) {
	   $http.get('resources/genres').success(function(data) {
		   $rootScope.$broadcast('clearForm');
		   $rootScope.$broadcast('clearGenreForm');
		   $rootScope.$broadcast('disableButtonAlert');
		   $rootScope.genres = data;
		   if ( $scope.selected==null){
			   $rootScope.$broadcast('disableSave');
		   }
	   }).error(function(){
		  $rootScope.$broadcast('error');

	   });
	
	   $scope.jsFunction = function() {
		   $http.get('resources/genres/'+$scope.selected.idGenre).success(function(data) {
			   $rootScope.songs = data;
			   $rootScope.$broadcast('setGenre', { idGenre: $scope.selected.idGenre });
			   $rootScope.$broadcast('fillGenreFields', { genre: $scope.selected });
			   $rootScope.$broadcast('ableSave');
			   $rootScope.$broadcast('clearForm');

		  }).error(function(){
			  $rootScope.$broadcast('error');
		  
		  });
		   
	   }
	  
	   $scope.jsFunctionSong = function() {
	$rootScope.selectedsong=$scope.selectedSong;
	$rootScope.$broadcast('fillFields', { song: $scope.selectedSong });
	   }
	  
	   $scope.$on('refreshSongList', function () {
	    	$http.get('resources/genres/'+$scope.selected.idGenre).success(function(data) {
				   $rootScope.songs = data;
				   $rootScope.$broadcast('setGenre', { idGenre: $scope.selected.idGenre });
				   $rootScope.$broadcast('clearForm');

			  }).error(function(){
				  $rootScope.$broadcast('error');
				  });
	    });  
	   $scope.$on('refreshGenreList', function () {
	    	$http.get('resources/genres').success(function(data) {
	    		 $rootScope.$broadcast('clearGenreForm');
	  		   	$rootScope.genres = data;

			  }).error(function()
					  {
				  $rootScope.$broadcast('error');
					  });
	    });    
	   

});

App.controller('insertSongCtrl', function ($scope,$http,$rootScope) {
    $scope.$on('fillFields', function (event, args) {
    	$scope.songId=args.song.idSong;
    	$scope.songName=args.song.name;
    	$scope.songDescription=args.song.description;
    	$scope.songLink=args.song.youtubeUrl;
    	$scope.checked=false;
    });
    
    $scope.$on('setGenre', function (event, args) {
    	$scope.idGenre=args.idGenre;
    	
    });
    $scope.$on('clearForm', function () {
    	$scope.songId=null;
    	$scope.songName = null;
		$scope.songDescription = null;
		$scope.songLink = null;
    	$scope.checked=true;

        });
    $scope.$on('disableSave', function () {
    
    	$scope.checkedSaveSong=true;

        });
    $scope.$on('ableSave', function () {
        
    	$scope.checkedSaveSong=false;

        });
    
    $scope.insert = function() {
  $scope.songLink='http://www.youtube.com/embed/'+$scope.songLink 
    	if ($scope.songId == null) {
    		var req = {
    	   			 method: 'POST',
    	   			 url: 'resources/songs/'+$scope.idGenre,
    	   			 headers: {
    	   			   'Content-Type': 'application/json'
    	   			 },
    	   			data: {name: $scope.songName,description:$scope.songDescription,youtubeUrl:$scope.songLink }
    	   			}
    	}else{
    		var req = {
   	   			 method: 'POST',
   	   			 url: 'resources/songs/'+$scope.idGenre,
   	   			 headers: {
   	   			   'Content-Type': 'application/json'
   	   			 },
   	   			data: {idSong:$scope.songId, name: $scope.songName,description:$scope.songDescription,youtubeUrl:$scope.songLink }
   	   			}
    		}
    	
        $http(req).success(function(){
        	
			   $rootScope.$broadcast('refreshSongList');
			   $rootScope.$broadcast('personSaved');
        }).error(function(){$rootScope.$broadcast('error');});
       
    }
        
    $scope.deleteSong = function() {
    	 $http.delete('resources/songs/'+$scope.songId).success(function(data) { 
    		 $rootScope.$broadcast('refreshSongList');
    		 $rootScope.$broadcast('personDeleted');
    	 }).error(function(){$rootScope.$broadcast('error');});
    	
    }

   
});







App.controller('insertGenreCtrl', function ($scope,$http,$rootScope) {
	$scope.$on('fillGenreFields', function (event, args) {
		$scope.genreId=args.genre.idGenre;
    	$scope.genreName=args.genre.name;
    	$scope.genreDescription=args.genre.description;
    	$scope.checkedGen=false;
    });
	 $scope.$on('clearGenreForm', function () {
	    	$scope.genreId=null;
	    	$scope.genreName = null;
			$scope.genreDescription = null;
	    	$scope.checkedGen=true;

	        });
    
    $scope.insertGenre = function() {
    	if ($scope.genreId == null) {
    		var req = {
    	   			 method: 'POST',
    	   			 url: 'resources/genres/',
    	   			 headers: {
    	   			   'Content-Type': 'application/json'
    	   			 },
    	   			data: {name: $scope.genreName,description:$scope.genreDescription}
    	   			}
    	}else{
    		var req = {
   	   			 method: 'POST',
   	   			 url: 'resources/genres/',
   	   			 headers: {
   	   			   'Content-Type': 'application/json'
   	   			 },
   	   			data: {idGenre:$scope.genreId, name: $scope.genreName,description:$scope.genreDescription}
   	   			}
    		}
    	
        $http(req).success(function(){
        	
			   $rootScope.$broadcast('refreshGenreList');
			   $rootScope.$broadcast('personSaved');
        }).error(function(){$rootScope.$broadcast('error');});
       
    }
    
    $scope.deleteGenre = function() {
    var conf=confirm("Do you want to delete the Genre? "+$scope.genreName+ " all the songs of this genre will be lost");
    if (conf==true){
   	 $http.delete('resources/genres/'+$scope.genreId).success(function(data) { 
   		 $rootScope.$broadcast('refreshGenreList');
   		 $rootScope.$broadcast('refreshSongList');
   		 $rootScope.$broadcast('personDeleted');
   	 }).error(function(){$rootScope.$broadcast('error');});
    }
   }
   
});



App.controller('alertMessagesController', function ($scope,$rootScope) {
    
    $scope.$on('personSaved', function () {
    	 $rootScope.$broadcast('ableButtonAlert');
        $scope.alerts = [
            { type: 'success', msg: 'Record saved successfully!' }
        ];
    });

    $scope.$on('personDeleted', function () {
     $rootScope.$broadcast('ableButtonAlert');
        $scope.alerts = [
            { type: 'success', msg: 'Record deleted successfully!' }
        ];
       
    });

    $scope.$on('error', function () {
    	 
        $scope.alerts = [
            { type: 'danger', msg: 'There was a problem in the server!' }
        ];
        $rootScope.$broadcast('ableButtonAlert');
    });

    $scope.closeAlert = function (index) {
        $rootScope.$broadcast('disableButtonAlert');
    	$scope.alerts.splice(0); 
    };
    $scope.$on('ableButtonAlert', function () {
    	$scope.buttonAlert=true;

        });
    $scope.$on('disableButtonAlert', function () {
    	$scope.buttonAlert=false;

        });
    
});














    