import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import Map from './Map';
import RoofFaceDetails from './RoofFaceDetails';
import {addRoofFace} from '../actions/actions';


class Design extends Component {

	renderRoofDetails() {
		return this.props.roofFaces.map(face => {
			// console.log("Face", face)
			return (
				<RoofFaceDetails key = {face.id} face = {face} />
			);
		})
	}


	render() {
		return (
			<div>
				<h2>Design Your Custom Solar Installation</h2>
				<h5>
					Draw polygons over individual roof faces on the map below, then specify the azimuth and tilt for 
					each roof face. When finished, click "Evaulate Total Performance" to view an in-depth financial
					analysis for your customize solar system.
				</h5>

				<div className = "col-sm-6">
					<Map />
				</div>
				<div className = "col-sm-6">
					{this.renderRoofDetails()}

					{this.props.roofFaces.length > 0 ?
						<div>
							<Link to = '/analysis'>
								Get Design Analysis
							</Link>
						</div>
						: ''
					}
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roofFaces: state.roofFaces
	}
}

export default connect(mapStateToProps, {})(reduxForm({
	form: 'roofDetailsForm'
})(Design));

