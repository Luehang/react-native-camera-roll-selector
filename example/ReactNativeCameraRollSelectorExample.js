import React, { Component } from "react";
import {
    Platform,
    Dimensions,
    Linking,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Modal,
    Slider,
    Switch
} from "react-native";
import CameraRollSelector from "react-native-camera-roll-selector";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

const settingsIcon = require("./assets/outline_settings_white_36pt_2x.png");

function isIPhoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return (
        Platform.OS === "ios" &&
        ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
        (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#368FFA"
    },
    header: {
        height: isIPhoneX() ? 88 : 64,
        backgroundColor: "transparent"
    },
    headerBody: {
        flex: 1,
        alignItems: "center",
    },
    mobileHeader: {
        width: deviceWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    listTab: {
        height: 32,
        flexDirection: "row",
        borderTopLeftRadius: 7.5,
        borderTopRightRadius: 7.5,
        backgroundColor: "#fff",
        marginBottom: -5
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tabTextUnderline: {
        borderBottomWidth: 2,
        borderBottomColor: "#e53935"
    },
    tabTextOn: {
        fontSize: 10,
        color: "#e53935"
    },
    tabTextOff: {
        fontSize: 10,
        color: "grey"
    },
    title: {
        fontSize: 25
    },
    horizontal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: 30
    }
});

export default class ReactNativeCameraRollSelectorExample extends Component {
    state = {
        isSettings: true,
        imagesPerRow: 2,
        spacing: 2,
        isContainerWidth: false,
        containerWidth: undefined,
        statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
    }

    onLayoutChange = (ev) => {
        const { width, height } = ev.nativeEvent.layout;
        let maxComp = Math.max(width, height);

        if (width >= maxComp) {
            this.setState({
                statusBarPaddingTop: 0
            });
        } else if (width < maxComp) {
            this.setState({
                statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
            });
        }
    }

    render() {
        const {
            isSettings,
            imagesPerRow,
            spacing,
            isContainerWidth,
            containerWidth,
            statusBarPaddingTop
        } = this.state;

        return (
            <View
                onLayout={(ev) => this.onLayoutChange(ev)}
                style={styles.container}
            >
                <View style={[styles.header, styles.mobileHeader, { paddingTop: statusBarPaddingTop }]}>
                    <Image
                        source={{ uri: "https://luehangs.site/images/lue-hang2018-square.jpg" }}
                        style={{height: 35, width: 35, marginLeft: 10, borderRadius: 20}} />
                    <View style={styles.headerBody}>
                        <Text style={styles.title}>CameraRollSelector</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {}}>
                        <Image
                            source={settingsIcon}
                            style={{height: 35, width: 35, marginRight: 10}}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.listTab}>
                    <TouchableWithoutFeedback
                        style={{borderTopLeftRadius: 7.5,}}
                        onPress={() => Linking.openURL("https://luehangs.site")}>
                            <View style={styles.tab}>
                                <View style={{paddingBottom: 3}}>
                                    <Text style={styles.tabTextOff}>REMOTE</Text>
                                </View>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.tab}>
                            <View style={[styles.tabTextUnderline, {paddingBottom: 3}]}>
                                <Text style={styles.tabTextOn}>CAMERA ROLL</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <CameraRollSelector
                    imagesPerRow={imagesPerRow}
                    spacing={spacing}
                    containerWidth={isContainerWidth ? containerWidth : undefined}
                />
                {/* <Modal animationType="fade"
                    transparent={true}
                    visible={isSettings}
                    presentationStyle="overFullScreen"
                    style={{ paddingTop: statusBarPaddingTop }}>
                    <View style={styles.horizontal}>
                        <Text style={{fontSize: 20, color: "#0277bd", fontWeight: "bold"}}>imagesPerRow</Text>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={2}
                            maximumValue={7}
                            value={imagesPerRow}
                            onValueChange={val => this.setState({ imagesPerRow: val })}
                        />
                        <Text style={{fontSize: 25, color: "#009688", fontWeight: "bold", alignSelf: "flex-end"}}>
                            {imagesPerRow}
                        </Text>
                        <Text style={{fontSize: 20, color: "#0277bd", fontWeight: "bold"}}>spacing</Text>
                        <Slider
                            style={{ width: 300 }}
                            step={0.5}
                            minimumValue={1}
                            maximumValue={5}
                            value={spacing}
                            onValueChange={val => this.setState({ spacing: val })}
                        />
                        <Text style={{fontSize: 25, color: "#009688", fontWeight: "bold", alignSelf: "flex-end"}}>
                            {spacing}
                        </Text>
                        <Text style={{fontSize: 20, color: "#0277bd", fontWeight: "bold"}}>containerWidth</Text>
                        <View style={{flexDirection: "row", marginVertical: 5}}>
                            <Text style={{flex: 1, fontSize: 20, color: "#0277bd", fontWeight: "bold", textAlign: "left"}}>enable</Text>
                            <Switch
                                onValueChange={(val) => this.setState({ isContainerWidth: val })}
                                value={isContainerWidth}
                            />
                        </View>
                        <Slider
                            style={{ width: 300 }}
                            step={50}
                            minimumValue={50}
                            maximumValue={deviceWidth}
                            value={containerWidth}
                            onValueChange={val => this.setState({ containerWidth: val })}
                        />
                        <Text style={{fontSize: 25, color: "#009688", fontWeight: "bold", alignSelf: "flex-end"}}>
                            {containerWidth ? containerWidth : "undefined"}
                        </Text>
                    </View>
                </Modal> */}
            </View>
        );
    }
}
