import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

class RoofFaceDetails extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<form className = 'form-horizontal'>
					<h4>Face {this.props.face.id}</h4>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Azimuth:</label>
						<div className = 'col-sm-8'>
							<input type = 'number' className = 'form-control' step = "0.01" min = "0" max = "360" placeholder = "degrees" required />
						</div>
					</div>
					<div className = 'form-group'>
						<label className = 'control-label col-sm-4'>Tilt:</label>
						<div className = 'col-sm-8'>
							<input type = 'number' className = 'form-control' step = "0.01" min = "0" max = "90" placeholder = "degrees" required />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default RoofFaceDetails;