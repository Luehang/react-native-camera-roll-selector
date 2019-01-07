import React, { Component } from "react";
import {
    Platform,
    Dimensions,
    Linking,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import CameraRollSelector from "react-native-camera-roll-selector";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

export default class ReactNativeCameraRollSelectorExample extends Component {
    render() {
        return (
            <View
                style={styles.container}
            >
                <View style={[styles.statusBarTop, styles.header, styles.mobileHeader]}>
                    <Text style={styles.title}>CameraRollSelector</Text>
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
                <CameraRollSelector />
            </View>
        );
    }
}

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
    statusBarTop: {
        paddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
    },
    header: {
        height: isIPhoneX() ? 88 : 64,
        backgroundColor: "transparent"
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
});
