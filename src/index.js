import React from "react";
import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
} from "react-native";
import PropTypes from "prop-types";
import MasonryList from "react-native-masonry-list";

import TouchableImageComponent from "./TouchableImageComponent";
import { findUri } from "./utils";

export default class CameraRollSelector extends React.PureComponent {
    static propTypes = {
        enableCameraRoll: PropTypes.bool,
        onGetData: PropTypes.func,
        itemCount: PropTypes.number,
        catchGetPhotosError: PropTypes.func,
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
        enableCameraRoll: true,
        itemCount: 500,
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
        groupTypes: "All",
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
            permissionGranted: !this.props.enableCameraRoll
                ? "granted" : Platform.OS === "ios"
                ? "granted" : "denied",
            initialLoading: true,
            loadingMore: false,
            noMore: false,
        };
    }

    componentWillMount = async () => {
        if (this.props.enableCameraRoll) {
            if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        "title": this.props.permissionDialogTitle,
                        "message": this.props.permissionDialogMessage
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.setState({
                        permissionGranted: "granted"
                    });
                    this.fetch();
                } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                    this.setState({
                        permissionGranted: "denied"
                    });
                } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    this.setState({
                        permissionGranted: "never_ask_again"
                    });
                }
            }
            if (Platform.OS === "ios") {
                this.fetch();
            }
        } else {
            this.fetch();
        }
    }

    fetch = () => {
        if (!this.state.loadingMore) {
            // console.log("fetch");
            this.setState({ loadingMore: true }, () => { this._fetch(); });
        }
    }

    _fetch = () => {
        const { itemCount, groupTypes, assetType, catchGetPhotosError } = this.props;

        const fetchParams = {
            first: itemCount,
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

        if (this.props.enableCameraRoll) {
            var CameraRoll;
            if (parseFloat(require("react-native/package.json").version) >= 0.6) {
                CameraRoll = require("@react-native-community/cameraroll");
            } else {
                CameraRoll = require("react-native").CameraRoll;
            }
            CameraRoll.getPhotos(fetchParams)
                .then((data) => this._appendImages(data))
                .catch((e) => {
                    catchGetPhotosError &&
                        catchGetPhotosError(e);
                });
        } else {
            this._appendRemoteImages({
                itemCount: fetchParams.first,
                groupTypes: fetchParams.groupTypes,
                assetType: fetchParams.assetType
            });
        }
    }

    _appendImages = (data) => {
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

    _appendRemoteImages = () => {
        // console.log("_appendRemoteImages");
        var newState = {
            loadingMore: false,
            initialLoading: false,
        };
    
        var data = this.props.onGetData
            && this.props.onGetData();
    
        if (typeof data === "object") {
            var assets = data.assets;
            if (
                !data.pageInfo
                || (data.pageInfo && !data.pageInfo.hasNextPage)
            ) {
                newState.noMore = true;
            }
    
            if (assets && assets.length > 0) {
                var extractedData = assets
                    .filter((asset) => findUri(asset) ? true : false);
        
                newState.data = this.state.data.concat(extractedData);
                // console.log(newState.data.length);
            }
        }
    
        this.setState(newState);
    }

    render() {
        const {
            enableCameraRoll,
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

        if (this.state.initialLoading) {
            return (
                <View style={[styles.loader, {backgroundColor}]}>
                    { customLoader || <ActivityIndicator size="large" color={loaderColor} style={styles.spinner} /> }
                </View>
            );
        }

        const flatListOrEmptyText = this.state.data.length > 0 ? (
            <MasonryList
                sorted={true}
                itemSource={enableCameraRoll ? ["node", "image"] : undefined}
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
                onEndReached={(info) => {
                    this._onEndReached(info);
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

    _onEndReached = (info) => {
        if (!this.state.noMore) {
            this.fetch(info);
        }
    }

    _isMaxSelected = () => {
        const { maximum } = this.props;

        return maximum === this.state.selected.length;
    }

    _selectImage = (image) => {
        const {
            enableCameraRoll,
            maximum,
            callback,
            selectSingleItem
        } = this.props;
        const selected = this.state.selected;

        const index = enableCameraRoll
            ? this._arrayObjectIndexOf(selected, "uri", image.node.image.uri)
            : this._arrayObjectIndexOf(selected, "uri", image.source.uri);

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

    _arrayObjectIndexOf = (array, property, value) => {
        const { enableCameraRoll } = this.props;
        if (enableCameraRoll) {
            return array.map((o) => { return o.node.image[property]; }).indexOf(value);
        }
        return array.map((o) => { return o.source[property]; }).indexOf(value);
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
