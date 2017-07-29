import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import {evaluatePerformance} from '../actions/actions';
import {getTotalSystemSize} from '../utils/analysisFunctions'

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


class Analysis extends Component {

	componentDidMount() {
		const {roofFaces} = this.props;
		if (!roofFaces || roofFaces.length < 1) {
			browserHistory.push('/design');
			return;
		}
		if (roofFaces[0].azimuth && roofFaces[0].tilt) {
			this.props.evaluatePerformance(roofFaces[0])
		}
	}
	componentWillReceiveProps(nextProps) {
		const {roofFaces} = nextProps;
		if (!roofFaces || roofFaces.length < 1) {
			browserHistory.push('/design');
			return;
		}
		if (roofFaces != this.props.roofFaces && roofFaces[0].tilt && roofFaces[0].azimuth) {
			this.props.evaluatePerformace(roofFaces[0]);
		}
	}

	render() {
		console.log("AC_MONTHLY", this.props.ac_monthly)
		console.log(data)
		return (
			<div className = 'analysis-page'>
				<h1>Performance Analysis</h1>

				<h4>SystemSize: {getTotalSystemSize(this.props.roofFaces)}kW</h4>

				<h4>Annual Energy Production (AC): {this.props.ac_annual}kWh</h4>
				<h4>Monthly Energy Production (AC):</h4>

				<AreaChart
					height = {300}
					width = {800}
					data = {this.props.ac_monthly}
				>
					<XAxis dataKey = "name" />
					<YAxis 
						domain = {[0, 'dataMax']}
					/>
					<Area type = 'monotone' dataKey = 'production' stroke = '#207068' fill = '#629a95' />
				</AreaChart>


			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roofFaces: state.roofFaces,
		ac_monthly: state.analysis.ac_monthly,
		ac_annual: state.analysis.ac_annual
	}
}

export default connect(mapStateToProps, {evaluatePerformance})(Analysis);

