//size of SunPower X21-335-BLK solar panel
const PANEL_WIDTH = 1.036; //m
const PANEL_HEIGHT = 1.558; //m
const PANEL_AREA = PANEL_WIDTH * PANEL_HEIGHT; 
const PANEL_POWER = 335; //watts

const WATTS_PER_SQ_M = 111; // W/m^2
const COST_PER_WATT = 3.5; //$

//returns system size in kWh
export function getSystemSize(area) {
	var size = area * WATTS_PER_SQ_M / 1000;
	return size;
}

//system size in kWh
export function getTotalSystemSize(faces) {
	var area = 0;
	for (var i in faces) {
		area += faces[i].area;
	}
	return getSystemSize(area);
}

//gets system cost (ouputs dollars)
export function getTotalSystemCost(faces) {
	var area = 0;
	for (var i in faces) {
		area += faces[i].area;
	}
	return getSystemSize(area) * 1000 * COST_PER_WATT; //$
}

export function updateFaceSpecs(face) {
	face.npanels = Math.floor(face.area / PANEL_AREA);
	face.systemSize = getSystemSize(face.npanels * PANEL_AREA);

	return face;
}

//annual energy savings
//inputs: roofFaces, utility rate ($/kWh)
export function getEnergySavings(ac_annual, utilityRate) {
	return ac_annual * utilityRate;
}

//payback period (years)
export function getPaybackPeriod(faces, ac_annual, utilityRate) {
	var cost = getTotalSystemCost(faces);
	var savings = getEnergySavings(ac_annual, utilityRate);
	return cost / savings;
}

