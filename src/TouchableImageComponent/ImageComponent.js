import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import Injector from "./Injector";

export default class ImageComponent extends React.PureComponent {
	static propTypes = {
		source: PropTypes.any.isRequired,
		style: PropTypes.object.isRequired,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.object,
		customImageProps: PropTypes.object
	}

	render() {
		const {
			source,
			style,
			imageContainerStyle,
			customImageComponent,
			customImageProps
		} = this.props;
		const imageProps = {
			source: source,
			resizeMethod: "auto",
			style: {
				...style,
				backgroundColor: "gainsboro",
				...imageContainerStyle
			}
		};

		return (
			<Injector
				defaultComponent={Image}
				defaultProps={imageProps}
				injectant={customImageComponent}
				injectantProps={customImageProps}
			/>
		);
	}
}
