import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import roofFacesReducer from './reducer_roof_faces';
import analysisReducer from './reducer_analysis';

const rootReducer = combineReducers({

	roofFaces: roofFacesReducer,
	analysis: analysisReducer,
	form: formReducer
});

export default rootReducer;