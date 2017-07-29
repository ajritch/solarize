import {
	EVALUATE_PERFORMANCE
} from '../actions/actions';

const INITIAL_STATE = {
	ac_annual: 0,
	ac_monthly: generateEmptyACMonthly()
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
			console.log("reducer", ac_monthly)
			for (var i in ac_monthly) {
				ac_monthly[i].production += parseInt(data.ac_monthly[i])
			}
			console.log("reducer", ac_monthly)
			return {...state, ac_annual: ac_annual, ac_monthly: ac_monthly};
		default:
			return state;
	}
}