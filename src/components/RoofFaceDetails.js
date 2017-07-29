import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import {editAzimuthTilt} from '../actions/actions';

class RoofFaceDetails extends Component {

	constructor(props) {
		super(props);

		this.handleAzimuthBlur = this.handleAzimuthBlur.bind(this);
		this.handleTiltBlur = this.handleTiltBlur.bind(this);
	}

	handleAzimuthBlur(event, face_id) {
		this.props.editAzimuthTilt({
			id: face_id,
			azimuth: event.target.value
		})
	}

	handleTiltBlur(event, face_id) {
		this.props.editAzimuthTilt({
			id: face_id,
			tilt: event.target.value
		})
	}

	render() {

		const face_id = this.props.face.id;

		return (
			<div className = 'form-horizontal'>
					<h4>Face {this.props.face.id}</h4>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Azimuth:</label>
						<div className = 'col-sm-8'>
							<Field name = {`azimuth-${face_id}`}
									className = 'form-control'
									component = 'input'
									type = 'number'
									step = '0.01'
									min = '0'
									max = '360'
									placeholder = 'degrees'
									onBlur = {(e) => this.handleAzimuthBlur(e, face_id)}
							/>
						</div>
					</div>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Tilt:</label>
						<div className = 'col-sm-8'>
							<Field name = {`tilt-${face_id}`}
									className = 'form-control'
									component = 'input'
									type = 'number'
									step = '0.01'
									min = '0'
									max = '90'
									placeholder = 'degrees'
									onBlur = {(e) => this.handleTiltBlur(e, face_id)}
							/>
						</div>
					</div>
			</div>
		);
	}
}

export default connect(null, {editAzimuthTilt})(RoofFaceDetails);
