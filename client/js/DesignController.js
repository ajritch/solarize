app.controller('DesignController', function($scope, $location, sharedProperties, solarFactory) {

	//TODO: save polygons on map so user can go back and adjust design
	$scope.roofFaces = [];

	//function to initialize map
	//TODO: allow user to set coordinates
		//or use user's location as coordinates
	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.441, lng: -122.152},
			zoom: 18
		});

		var drawingManager = new google.maps.drawing.DrawingManager({
			// drawingMode: google.maps.drawing.OverlayType.MARKER,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: ['polygon']
			}
		});

		//add listener to map for polygon completion
		google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon, event) {
			//area in square meters
			var path = polygon.getPath();
			var area = google.maps.geometry.spherical.computeArea(path);

			//add new face!
			var face = {};
			face.area = area;
			face.id = $scope.roofFaces.length + 1;

			//TODO: change to lat/lon of polygon center
			//for not just using coords of first vertex
			face.lat = path.getAt(0).lat();
			face.lon = path.getAt(0).lng();

			$scope.roofFaces.push(face);
			$scope.$apply()
		})

		drawingManager.setMap(map);
	}

	//initialize the map on page load
	initMap();


	//user clicks to evaluate total performance
	//TODO: include checks for valid and complete user input
	$scope.evaluatePerformance = function() {
		//make $scope.roofFaces a shared property
		sharedProperties.setProperty('roofFaces', $scope.roofFaces);
		//switch to analysis page
		$location.path('/analysis')
	}

})