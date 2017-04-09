import {ADD_ROOF_FACE} from '../actions/actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_ROOF_FACE:
			return [...state, action.payload];
		default: 
			return state;
	}
}