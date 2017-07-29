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

export function getTotalSystemSize(faces) {
	var size = 0;
	for (var i in faces) {
		size += faces[i].area;
	}
	return size;
}

export function updateFaceSpecs(face) {
	face.npanels = Math.floor(face.area / PANEL_AREA);
	face.systemSize = getSystemSize(face.npanels * PANEL_AREA);

	return face;
}

