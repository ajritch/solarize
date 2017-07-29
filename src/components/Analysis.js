import React, {Component} from 'react';
import {connect} from 'react-redux';

class Analysis extends Component {
	render() {
		return (
			<div className = 'analysis-page'>
				Custom Solar Analysis
			</div>
		);
	}
}

export default connect(null)(Analysis);

