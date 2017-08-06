import {
	EVALUATE_PERFORMANCE,
	UPDATE_UTILITY_RATE
} from '../actions/actions';

const INITIAL_STATE = {
	ac_annual: 0,
	ac_monthly: generateEmptyACMonthly(),
	utility_rate: 0.14
}


function generateEmptyACMonthly() {
	const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var ac_monthly = new Array(12).fill(0);
	for (var i in ac_monthly) {
		ac_monthly[i] = {
			name: monthLabels[i],
			production: 0
		}
	}
	return ac_monthly;
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case EVALUATE_PERFORMANCE:
			// console.log(action.payload);
			const data = action.payload.data.outputs;
			var ac_annual = state.ac_annual + data.ac_annual;
			var ac_monthly = state.ac_monthly;
			for (var i in ac_monthly) {
				ac_monthly[i].production += parseInt(data.ac_monthly[i])
			}
			return {...state, ac_annual: ac_annual, ac_monthly: ac_monthly};
		
		case UPDATE_UTILITY_RATE:
			return {...state, utility_rate: action.payload}

		default:
			return state;
	}
}