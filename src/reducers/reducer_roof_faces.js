import _ from 'lodash';

import {ADD_ROOF_FACE, EDIT_AZIMUTH_TILT} from '../actions/actions';
import {updateFaceSpecs} from '../utils/analysisFunctions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_ROOF_FACE:
			var face = updateFaceSpecs(action.payload);
			return [...state, face];

		case EDIT_AZIMUTH_TILT:
			const info = action.payload;
			var faces = state;
			var index = _.findIndex(faces, (obj) => {
				return obj.id == info.id
			})
			var face = faces[index];
			if (_.has(info, 'azimuth')) {
				face['azimuth'] = info.azimuth;
			}
			if (_.has(info, 'tilt')) {
				face['tilt'] = info.tilt;
			}
			if (index > -1) {
				faces[index] = face;
			}

			return faces;
			
		default: 
			return state;
	}
}