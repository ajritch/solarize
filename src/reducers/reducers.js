import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import roofFacesReducer from './reducer_roof_faces'

const rootReducer = combineReducers({

	roofFaces: roofFacesReducer,
	form: formReducer
});

export default rootReducer;