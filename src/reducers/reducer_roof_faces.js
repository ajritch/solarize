import {ADD_ROOF_FACE, EDIT_AZIMUTH_TILT} from '../actions/actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_ROOF_FACE:
			return [...state, action.payload];

		case EDIT_AZIMUTH_TILT:
			var faces = state;
			
		default: 
			return state;
	}
}