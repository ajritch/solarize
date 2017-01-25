app.factory('solarFactory', function($http) {
	var factory = {};

	//size of SunPower X21-335-BLK solar panel
	var panelWidth = 1.036; //m
	var panelHeight = 1.558; //m
	var panelArea = panelWidth * panelHeight; 
	var panelPower = 335; //watts

	var WATTS_PER_SQ_M = 111; // W/m^2
	var COST_PER_WATT = 3.5; //$

	//return system size in kW
	getSystemSize = function(area) {
		var size = area * WATTS_PER_SQ_M / 1000;
		return size;
	}

	//function to get only the faces with tilt/azimuth
	function getValidFaces(faces) {
		var validFaces = [];
		for (var i = 0; i < faces.length; i++) {
			if (faces[i].azimuth && faces[i].tilt) {

				//calculate: how many panels will fit?
				//TODO: fix to take into account geometry, not just total area
				faces[i].npanels = Math.floor(faces[i].area / panelArea);
				faces[i].systemSize = getSystemSize(faces[i].npanels * panelArea);

				validFaces.push(faces[i]);
			}
		}
		return validFaces;
	}

	//evaluate system performance
	//input: array of roof faces
	factory.evaluatePerformance = function(faces, callback) {

		//only consider faces that have both azimuth and tilt inputs
		var validFaces = getValidFaces(faces);

		//get information from PVWatts API FOR EACH VALID FACE
		for (var i = 0; i < validFaces.length; i++) {
			var API_KEY = "GyY7WlSyWkU1kacFSJ4zEUc9yebI2pLR2oFeFCFa";
			var url = "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=" + API_KEY;
			url += "&lat=" + validFaces[i].lat + "&lon=" + validFaces[i].lon;
			url += "&system_capacity=" + validFaces[i].systemSize;
			url += "&azimuth=" + validFaces[i].azimuth + "&tilt=" + validFaces[i].tilt;
			url += "&array_type=1" + "&module_type=0" + "&losses=0";

			$http.get(url).then(function(results) {
				callback(results);
			});	
		}

	}

	///////
	//FINANCIAL ANALYSES

	//NOTE: this could be done more efficiently in one function
		//to avoid repeated for loop; I chose this method for
		//code clarity because the computations are relatively inexpensive

	//total cost of system
	//input: systemSize in kW
	//returns: cost in $
	factory.getSystemCost = function(systemSize) {
		return systemSize * 1000 * COST_PER_WATT; //$
	}

	//total size of system (kW)
	//only take into consideration roof faces with input tilt/azimuth
	//(same as for production calculation)
	//input: array of roof faces
	//returns: total system size for all faces (int; kW)
	factory.getTotalSystemSize = function(faces) {
		var validFaces = getValidFaces(faces);
		var size = 0;
		for (var i = 0; i < validFaces.length; i++) {
			size += validFaces[i].systemSize;
		}
		return size;
	}

	//annual energy savings
	//inputs: energy production (kWh), utility rate ($/kWh)
	factory.getEnergySavings = function(energyProd, utilityRate) {
		return energyProd * utilityRate;
	}


	return factory;
});