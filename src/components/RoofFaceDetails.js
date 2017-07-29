import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

class RoofFaceDetails extends Component {

	constructor(props) {
		super(props);

		this.handleAzimuthBlur = this.handleAzimuthBlur.bind(this);
		this.handleTiltBlur = this.handleTiltBlur.bind(this);
	}

	handleAzimuthBlur(event) {
		console.log(event.target);
	}

	handleTiltBlur(event) {
		console.log(event.target)
	}

	render() {
		return (
			<div className = 'form-horizontal'>
					<h4>Face {this.props.face.id}</h4>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Azimuth:</label>
						<div className = 'col-sm-8'>
							<Field name = {`azimuth-${this.props.face.id}`}
									className = 'form-control'
									component = 'input'
									type = 'number'
									step = '0.01'
									min = '0'
									max = '360'
									placeholder = 'degrees'
									onBlur = {this.handleAzimuthBlur}
							/>
						</div>
					</div>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Tilt:</label>
						<div className = 'col-sm-8'>
							<Field name = {`tilt-${this.props.face.id}`}
									className = 'form-control'
									component = 'input'
									type = 'number'
									step = '0.01'
									min = '0'
									max = '90'
									placeholder = 'degrees'
									onBlur = {this.handleTiltBlur}
							/>
						</div>
					</div>
			</div>
		);
	}
}

export default RoofFaceDetails;