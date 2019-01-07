import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent";

export default class TouchableImageComponent extends React.PureComponent {
	static propTypes = {
		data: PropTypes.object.isRequired,
		source: PropTypes.any.isRequired,
		style: PropTypes.object.isRequired,
		isMaxSelected: PropTypes.func.isRequired,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.object,
		customImageProps: PropTypes.object,
		customMarker: PropTypes.element,
		onPressImage: PropTypes.func,
		onLongPressImage: PropTypes.func
	}

	state = {
		selected: false
	}

	_onPressImage(data, index) {
		const { onPressImage, isMaxSelected } = this.props;
		const isMax = isMaxSelected();

		if (!isMax && !this.state.selected) {
			this.setState({ selected: true });
		} else if (!isMax && this.state.selected) {
			this.setState({ selected: false });
		} else if (isMax && this.state.selected) {
			this.setState({ selected: false });
		}
		onPressImage && onPressImage(data, index);
	}

	render() {
		const {
			data, source, style, imageContainerStyle,
			markerColor, customMarker,
			onLongPressImage, customImageComponent,
			customImageProps
		} = this.props;

		const marker = customMarker
			? customMarker
			: <View style={[styles.marker, { borderRadius: 100, overflow: "hidden" }]}>
				<Image
					style={{ width: 25, height: 25, backgroundColor: markerColor }}
					source={require("./../assets/checkmark.png")}
				/>
			</View>;

		return (
			<TouchableOpacity
				onPress={() => this._onPressImage(data, data.index)}
				onLongPress={() => onLongPressImage && onLongPressImage(data, data.index)}>
				<ImageComponent
					source={source}
					style={style}
					imageContainerStyle={imageContainerStyle}
					customImageComponent={customImageComponent}
					customImageProps={customImageProps}
				/>
				{ this.state.selected && marker }
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	marker: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "transparent",
		zIndex: 1000
	},
});
