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
        enableSelect: PropTypes.bool,
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
        onEndReached: PropTypes.func,
        onEndReachedThreshold: PropTypes.number,
        refreshing: PropTypes.bool,
        onRefresh: PropTypes.func,
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
        itemCount: 25,
        callback: (selectedImages, currentSelectedImage) => {
            /* eslint-disable no-console */
            console.log(currentSelectedImage);
            console.log(selectedImages);
            /* eslint-enable no-console */
        },
        enableSelect: true,
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
            totalCount: 0
        };
    }

    componentDidMount = async () => {
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
        const { itemCount, groupTypes, assetType } = this.props;
        const { totalCount } = this.state;

        const fetchParams = {
            first: totalCount + itemCount,
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
            this._fetchImages(fetchParams);
        } else {
            this._fetchRemoteImages({
                previousCount: totalCount,
                itemCount: this.props.itemCount,
                groupTypes: fetchParams.groupTypes,
                assetType: fetchParams.assetType
            });
        }
    }

    _fetchImages = async (fetchParams) => {
        const { catchGetPhotosError } = this.props;
        const { totalCount } = this.state;

        const newState = {
            loadingMore: false,
            initialLoading: false,
        };

        var data = await new Promise((resolve) => {
            var CameraRoll;
            if (parseFloat(require("react-native/package.json").version) >= 0.6) {
                CameraRoll = require("@react-native-community/cameraroll");
            } else {
                CameraRoll = require("react-native").CameraRoll;
            }
            CameraRoll.getPhotos(fetchParams)
                .then((data) => {
                    const images = data.edges;
                    const parseData = images
                    .slice(totalCount)
                    .map((item) => {
                        return {
                            node: item.node,
                            ...item.node,
                            ...item.node.image
                        };
                    });
                    resolve({
                        assets: parseData,
                        page_info: data.page_info
                    });
                })
                .catch((e) => {
                    catchGetPhotosError &&
                        catchGetPhotosError(e);
                });
        });

        if (typeof data === "object") {
            var assets = data.assets;

            if (assets.length > 0) {
                var extractedData = assets
                    .map((asset, index) => {
                        return {
                            index: index,
                            id: Math.random().toString(36).substring(7),
                            source: {
                                uri: asset.uri
                            },
                            uri: asset.uri,
                            ...asset,
                        };
                    });

                newState.totalCount = totalCount + extractedData.length;
                newState.data = this.state.data.concat(extractedData);
            }
        }

        // newState.lastCursor = data.page_info.end_cursor;

        if (!data.page_info.has_next_page) {
            newState.noMore = true;
        }

        this.setState(newState);
    }

    _fetchRemoteImages = async (fetchParams) => {
        // console.log("_appendRemoteImages");
        const { totalCount } = this.state;
        var newState = {
            loadingMore: false,
            initialLoading: false,
        };
        var data;

        if (this.props.onGetData) {
            data = await new Promise((resolve) => {
                this.props.onGetData(fetchParams, resolve);
            });
        }

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
                newState.totalCount = totalCount + extractedData.length;
                // console.log(newState.data.length);
            }
        }

        this.setState(newState);
    }

    render() {
        const {
            enableSelect,
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
            onEndReached,
            onEndReachedThreshold,
            refreshing,
            onRefresh,
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
                images={this.state.data}
                columns={imagesPerRow}
                initialColToRender={initialColToRender ? initialColToRender : imagesPerRow}
                initialNumInColsToRender={initialNumInColsToRender}
                spacing={spacing}
                backgroundColor={backgroundColor}
                containerWidth={containerWidth}
                renderIndividualHeader={renderIndividualHeader}
                renderIndividualFooter={renderIndividualFooter}
                completeCustomComponent={({ source, style, data }) => {
                    return (
                        <TouchableImageComponent
                            enableSelect={enableSelect}
                            data={data}
                            source={source}
                            style={style}
                            isMaxSelected={this._isMaxSelected.bind(this)}
                            onPressImage={(item, i) => {
                                if (enableSelect) {
                                    this._selectImage(item);
                                }
                                onPressImage && onPressImage(item, i);
                            }}
                            onLongPressImage={onLongPressImage}
                            imageContainerStyle={imageContainerStyle}
                            markerColor={markerColor}
                            customMarker={customMarker}
                        />
                    );
                }}
                onEndReached={(info) => {
                    this._onEndReached(info);
                    onEndReached && onEndReached(info);
                }}
				onEndReachedThreshold={onEndReachedThreshold}
				refreshing={refreshing}
				onRefresh={onRefresh}
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
