// import axios from 'axios';
// import querystring from 'querystring';

export const ADD_ROOF_FACE = 'ADD_ROOF_FACE';

//function to add new roof face
export function addRoofFace(roofFace) {
	console.log("addRoofFace:", roofFace)
	return {
		type: ADD_ROOF_FACE,
		payload: roofFace
	}
}