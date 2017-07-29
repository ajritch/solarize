import axios from 'axios';
import qs from 'qs';

export const ADD_ROOF_FACE = 'ADD_ROOF_FACE';
export const EDIT_AZIMUTH_TILT = 'EDIT_AZIMUTH_TILT';
export const EVALUATE_PERFORMANCE = 'EVALUATE_PERFORMANCE';

//function to add new roof face
export function addRoofFace(roofFace) {
	console.log("addRoofFace:", roofFace)
	return {
		type: ADD_ROOF_FACE,
		payload: roofFace
	}
}

export function editAzimuthTilt(info) {
	console.log("editRoofFace:", info)
	return {
		type: EDIT_AZIMUTH_TILT,
		payload: info
	}
}


//evaluate system performance
//input: single roof face
export function evaluatePerformance(face) {
	console.log("evaluating performance!", face)

	//get information from PVWatts API
	var API_KEY = "GyY7WlSyWkU1kacFSJ4zEUc9yebI2pLR2oFeFCFa";
	var url = "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=" + API_KEY;
	url += "&lat=" + face.lat + "&lon=" + face.lon;
	url += "&system_capacity=" + face.systemSize;
	url += "&azimuth=" + face.azimuth + "&tilt=" + face.tilt;
	url += "&array_type=1" + "&module_type=0" + "&losses=0";	

	const config = {
		method: 'get',
		url: url
	}

	const request = axios(config);

	return {
		type: EVALUATE_PERFORMANCE,
		payload: request
	}
}