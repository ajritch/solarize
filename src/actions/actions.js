// import axios from 'axios';
// import querystring from 'querystring';

export const ADD_ROOF_FACE = 'ADD_ROOF_FACE';
export const EDIT_AZIMUTH_TILT = 'EDIT_AZIMUTH_TILT';

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