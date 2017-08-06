import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {reduxForm, Field} from 'redux-form';

import {evaluatePerformance, updateUtilityRate} from '../actions/actions';
import {getTotalSystemSize, getTotalSystemCost, getEnergySavings, getPaybackPeriod} from '../utils/analysisFunctions'


class Analysis extends Component {

	constructor(props) {
		super(props);

		this.handleUtilityRateChange = this.handleUtilityRateChange.bind(this);
	}

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

	handleUtilityRateChange(event) {
		// console.log(event.target.value)
		this.props.updateUtilityRate(event.target.value);
	}

	render() {

		// console.log(this.props)
		
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

				<h1>Financial Analysis</h1>
				<h4>System Cost: ${getTotalSystemCost(this.props.roofFaces)}</h4>
				<h4>Utility Cost: $
					<Field
						name = 'utility_rate'
						component = 'input'
						type = 'number'
						onBlur = {this.handleUtilityRateChange}
					/>
				</h4>
				<h4>
					Annual Energy Savings: ${getEnergySavings(this.props.ac_annual, this.props.utility_rate)}
				</h4>
				<h4>
					Payback Period: {getPaybackPeriod(this.props.roofFaces, this.props.ac_annual, this.props.utility_rate)}years
				</h4>

				<Link to = '/design'>
					Design New System
				</Link>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roofFaces: state.roofFaces,
		ac_monthly: state.analysis.ac_monthly,
		ac_annual: state.analysis.ac_annual,
		utility_rate: state.analysis.utility_rate,
		initialValues: state.analysis
	}
}

export default connect(mapStateToProps, {evaluatePerformance, updateUtilityRate})(reduxForm({
	form: 'UtilityRateForm',
	enableReinitialize: true
})(Analysis));


