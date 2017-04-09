import {combineReducers} from 'redux';

import roofFacesReducer from './reducer_roof_faces'

const rootReducer = combineReducers({

	//replace this with other reducers, once created
	roofFaces: roofFacesReducer
});

export default rootReducer;