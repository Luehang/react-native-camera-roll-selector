import React from "react";
import {
    PermissionsAndroid,
    CameraRoll,
    Platform,
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
} from "react-native";
import PropTypes from "prop-types";
import MasonryList from "react-native-masonry-list";
import TouchableImageComponent from "./TouchableImageComponent";

export default class CameraRollSelector extends React.PureComponent {
    static propTypes = {
        callback: PropTypes.func,
        imagesPerRow: PropTypes.number,
        initialColToRender: PropTypes.number,
        initialNumInColsToRender: PropTypes.number,
        spacing: PropTypes.number,
        groupTypes: PropTypes.oneOf([
            "Album",
            "All",
            "Event",
            "Faces",
            "Library",
            "PhotoStream",
            "SavedPhotos",
        ]),
        assetType: PropTypes.oneOf([
            "Photos",
            "Videos",
            "All",
        ]),
        maximum: PropTypes.number,
        selectSingleItem: PropTypes.bool,
        selected: PropTypes.array,
        backgroundColor: PropTypes.string,
        emptyText: PropTypes.string,
        emptyTextStyle: Text.propTypes.style,
        loaderColor: PropTypes.string,
        customLoader: PropTypes.oneOfType([
            PropTypes.node,
            // PropTypes.func
        ]),
        imageContainerStyle: PropTypes.object,
        markerColor: PropTypes.string,
        customMarker: PropTypes.element,
        renderIndividualHeader: PropTypes.func,
        renderIndividualFooter: PropTypes.func,
        onPressImage: PropTypes.func,
        onLongPressImage: PropTypes.func,
        containerWidth: PropTypes.number,
        permissionDialogTitle: PropTypes.string,
        permissionDialogMessage: PropTypes.string,
        pendingAuthorizedView: PropTypes.oneOfType([
            PropTypes.node,
            // PropTypes.func
        ]),
        notAuthorizedView: PropTypes.oneOfType([
            PropTypes.node,
            // PropTypes.func
        ]),


    }

    static defaultProps = {
        callback: (selectedImages, currentSelectedImage) => {
            /* eslint-disable no-console */
            console.log(currentSelectedImage);
            console.log(selectedImages);
            /* eslint-enable no-console */
        },
        imagesPerRow: 3,
        initialColToRender: null,
        initialNumInColsToRender: 1,
        spacing: 1,
        groupTypes: "SavedPhotos",
        assetType: "Photos",
        backgroundColor: "white",
        emptyText: "No photos.",
        loaderColor: "lightblue",
        maximum: 10,
        selectSingleItem: false,
        selected: [],
        imageContainerStyle: {},
        markerColor: "white",
        permissionDialogTitle: "Read Storage Permission",
        permissionDialogMessage: "Needs access to your photos " +
            "so you can use these awesome services.",
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selected: this.props.selected,
            lastCursor: null,
            permissionGranted: Platform.OS === "ios" ? "granted" : "denied",
            initialLoading: true,
            loadingMore: false,
            noMore: false,
        };
    }

    componentWillMount = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    "title": this.props.permissionDialogTitle,
                    "message": this.props.permissionDialogMessage
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ permissionGranted: "granted" });
            } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                if (this.state.permissionGranted !== "denied") {
                    this.setState({ permissionGranted: "denied" });
                }
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                this.setState({ permissionGranted: "never_ask_again" });
            }
        }
        this.fetch();
    }

    fetch() {
        if (!this.state.loadingMore) {
            this.setState({loadingMore: true}, () => { this._fetch(); });
        }
    }

    _fetch() {
        const { groupTypes, assetType } = this.props;

        const fetchParams = {
            first: 1000,
            groupTypes: groupTypes,
            assetType: assetType,
        };

        if (Platform.OS === "android") {
            // not supported in android
            delete fetchParams.groupTypes;
        }

        if (this.state.lastCursor) {
            fetchParams.after = this.state.lastCursor;
        }

        CameraRoll.getPhotos(fetchParams)
            // eslint-disable-next-line no-console
            .then((data) => this._appendImages(data), (e) => console.log(e));
    }

    _appendImages(data) {
        const assets = data.edges;

        const newState = {
            loadingMore: false,
            initialLoading: false,
        };

        if (!data.page_info.has_next_page) {
            newState.noMore = true;
        }

        if (assets.length > 0) {
            newState.lastCursor = data.page_info.end_cursor;
            const extractedData = this.state.data.concat(assets);
            newState.data = extractedData;
        }

        this.setState(newState);
    }

    render() {
        const {
            imagesPerRow,
            initialColToRender,
            initialNumInColsToRender,
            spacing,
            backgroundColor,
            emptyText,
            emptyTextStyle,
            loaderColor,
            customLoader,
            imageContainerStyle,
            markerColor,
            customMarker,
            renderIndividualHeader,
            renderIndividualFooter,
            onPressImage,
            onLongPressImage,
            containerWidth,
            pendingAuthorizedView,
            notAuthorizedView
        } = this.props;

        if (this.state.initialLoading) {
            return (
                <View style={[styles.loader, {backgroundColor}]}>
                    { customLoader || <ActivityIndicator size="large" color={loaderColor} style={styles.spinner} /> }
                </View>
            );
        }

        if (this.state.permissionGranted === "denied") {
            return (
                <View style={[styles.error, {backgroundColor}]}>
                    { pendingAuthorizedView || <Text style={{textAlign: "center"}}>Waiting on access permission to camera roll.</Text> }
                </View>
            );
        }

        if (this.state.permissionGranted === "never_ask_again") {
            return (
                <View style={[styles.error, {backgroundColor}]}>
                    { notAuthorizedView || <Text style={{textAlign: "center"}}>Access denied to camera roll.</Text> }
                </View>
            );
        }

        const flatListOrEmptyText = this.state.data.length > 0 ? (
            <MasonryList
                sorted={true}
                itemSource={["node", "image"]}
                images={this.state.data}
                columns={imagesPerRow}
                initialColToRender={initialColToRender ? initialColToRender : imagesPerRow}
                initialNumInColsToRender={initialNumInColsToRender}
                spacing={spacing}
                backgroundColor={backgroundColor}
                containerWidth={containerWidth}
                renderIndividualHeader={renderIndividualHeader}
                renderIndividualFooter={renderIndividualFooter}
                onPressImage={onPressImage}
                onLongPressImage={onLongPressImage}
                completeCustomComponent={({ source, style, data }) => {
                    return (
                        <TouchableImageComponent
                            data={data}
                            source={source}
                            style={style}
                            isMaxSelected={this._isMaxSelected.bind(this)}
                            onPressImage={(item) => this._selectImage(item)}
                            imageContainerStyle={imageContainerStyle}
                            markerColor={markerColor}
                            customMarker={customMarker}
                        />
                    );
                }}
            />
        ) : (
            <View style={[styles.error, {backgroundColor}]}>
                <Text style={[{textAlign: "center"}, emptyTextStyle]}>{emptyText}</Text>
            </View>
        );

        return (
            <View
                style={styles.wrapper}>
                {flatListOrEmptyText}
            </View>
        );
    }

    // _onEndReached = () => {
    //   if (!this.state.noMore) {
    //     this.fetch();
    //   }
    // }

    _isMaxSelected() {
        const { maximum } = this.props;

        return maximum === this.state.selected.length;
    }

    _selectImage(image) {
        const { maximum, callback, selectSingleItem } = this.props;

        const selected = this.state.selected,
            index = this._arrayObjectIndexOf(selected, "uri", image.node.image.uri);

        if (index >= 0) {
            selected.splice(index, 1);
        } else {
            if (selectSingleItem) {
                selected.splice(0,selected.length);
            }
            if (selected.length < maximum) {
                selected.push(image);
            }
        }

        this.setState({
            selected: selected
        });

        callback(selected, image);
    }

    _arrayObjectIndexOf(array, property, value) {
        return array.map((o) => { return o.node.image[property]; }).indexOf(value);
    }

}

const styles = StyleSheet.create({
    wrapper:{
        flexGrow: 1
    },
    loader: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        flexGrow: 1,
    }
});
