import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addRoofFace} from '../actions/actions';


class Map extends Component {

	constructor(props) {
		super(props);
		this.initMap = this.initMap.bind(this);
		this.onRoofFaceComplete = this.onRoofFaceComplete.bind(this);
	}

	
	componentDidMount() {
		this.initMap();
	}

	//function to initialize map
	//TODO: allow user to set coordinates
		//or use user's location as coordinates
	initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.441, lng: -122.152},
			zoom: 18
		});

		var drawingManager = new google.maps.drawing.DrawingManager({
			// drawingMode: google.maps.drawing.OverlayType.MARKER,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: ['polygon']
			}
		});

		//add listener to map for polygon completion
		google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon, event) => {
			this.onRoofFaceComplete(polygon, event)
		})

		drawingManager.setMap(map);
	}

	onRoofFaceComplete(polygon, event) {
		//area in square meters
		var path = polygon.getPath();
		var area = google.maps.geometry.spherical.computeArea(path);

		//add new face!
		var face = {};
		face.area = area;
		face.id = this.props.roofFaces.length + 1;

		//TODO: change to lat/lon of polygon center
		//for not just using coords of first vertex
		face.lat = path.getAt(0).lat();
		face.lon = path.getAt(0).lng();

		//update app state roofFaces
		this.props.addRoofFace(face);
	}


	render() {
		return (
			<div id = "map">
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roofFaces: state.roofFaces
	}
}

export default connect(mapStateToProps, {addRoofFace})(Map);
