app.controller('AnalysisController', function($scope, $http, $location, sharedProperties, solarFactory) {

	$scope.utilityRate = 0.14; //$/kWh

	//get roofFaces from shared properties
	$scope.roofFaces = sharedProperties.getProperty('roofFaces');

	//if no roofFaces yet, redirect to design page
	if (!$scope.roofFaces || $scope.roofFaces.length == 0) {
		$location.path('/design');
	} 

	//AC energy production by system
	$scope.annualProduction = 0;
	$scope.monthlyProduction = new Array(12).fill(0);

	//callback to set production info and update financial info
	function setProductionInfo(results) {
		$scope.annualProduction += results.data.outputs.ac_annual;
		for (var i = 0; i < 12; i++) {
			$scope.monthlyProduction[i] += results.data.outputs.ac_monthly[i];
		}
		$scope.annualEnergySavings = $scope.annualProduction * $scope.utilityRate;
		$scope.paybackPeriod = getPaybackPeriod($scope.systemCost, $scope.annualEnergySavings);
		updateCashflow($scope.systemCost, $scope.annualEnergySavings);
	}

	//evaluate the performance of the roofFaces
	//TODO: include checks for proper user input
	solarFactory.evaluatePerformance($scope.roofFaces, setProductionInfo);

	//user clicks to design new system
	$scope.backToDesign = function() {
		$location.path('/');
	}

	//////
	//FINANCIAL ANALYSIS

	$scope.systemSize = solarFactory.getTotalSystemSize($scope.roofFaces);

	//TODO: fix so exactly two decimal places!
	$scope.systemCost = solarFactory.getSystemCost($scope.systemSize);

	//data for charts
	$scope.monthData = [$scope.monthlyProduction];
	$scope.monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.monthSeries = ["Monthly Production"];
	

	//update energy savings and cashflow when utilityRate is changed
	$scope.updateSavings = function() {
		$scope.annualEnergySavings = $scope.annualProduction * $scope.utilityRate;
		$scope.paybackPeriod = getPaybackPeriod($scope.systemCost, $scope.annualEnergySavings);
		updateCashflow($scope.systemCost, $scope.annualEnergySavings);
	}

	//function to get payback period
	getPaybackPeriod = function(cost, annualSavings) {
		return cost / annualSavings;
	}

	//function to calculate cashflow and update chart parameters
	updateCashflow = function(cost, annualSavings) {
		var paybackPeriod = getPaybackPeriod(cost, annualSavings);
		var cashflow = [-1 * cost];
		for (var i = 1; i < paybackPeriod + 11; i++) {
			cashflow.push(cashflow[i - 1] + annualSavings);
		}

		$scope.cashflowData = [cashflow];
		$scope.cashflowLabels = [];
		for (var i = 0; i < paybackPeriod + 11; i++) {
			$scope.cashflowLabels.push(i);
		}
		$scope.cashflowSeries = ["Cumulative Cashflow"];
	}



});