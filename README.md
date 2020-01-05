<a href="https://luehangs.site/lue_hang/projects/react-native-camera-roll-selector"><img src="https://luehangs.site/images/react-native-camera-roll-selector-main.jpg" alt="react-native-camera-roll-selector"/></a>

<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

An easy and simple to use React Native component providing images selection from camera roll. The images in the camera roll are displayed with a custom high performant masonry layout. Supporting both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

Check out the [docs](https://luehangs.site/lue_hang/projects/react-native-camera-roll-selector) for a complete documentation.

- Choose a custom way to get images or use default CameraRoll getter.
- Optimized for large list rendering of images.
- Smart algorithm for eveningly laying out images.
- Pull to Refresh.
- Scroll loading.
- Support for rendering all local and remote images with no missing images.
- Support for dynamic device rotation.
- Easily customizable.
- Supports both iOS and Android.

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

![react-native-camera-roll-selector](https://luehangs.site/videos/react-native-camera-roll-selector-demo.gif)

![react-native-camera-roll-selector landscape](https://luehangs.site/videos/react-native-camera-roll-selector-landscape.gif)

#### :information_source: Learn more about React Native with project examples along with Cyber Security and Ethical Hacking at [LueHsoft](https://www.luehangs.site).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

# Index

### 1.  [Getting Started](#large_blue_diamond-getting-started)
### 2.  [Example Usage Customization](#tada-example-usage-customization)
### 3.  [Example Usage With Provided CameraRoll](#tada-example-usage-with-provided-cameraroll)
### 4.  [API](#nut_and_bolt-api)
### 5.  :books: [Props](#books-props)
### 6.  [Installation For Provided CameraRoll](#gem-installation-for-provided-cameraroll)
### 7.  [Example Project](#large_blue_diamond-example-project)
### 8.  [Author](#large_blue_diamond-author)
### 9.  [Contribute](#large_blue_diamond-contribute)
### 10. [License](#large_blue_diamond-license)

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: Getting Started

Type in the following to the command line to install the dependency.

```bash
$ npm install --save react-native-camera-roll-selector
```

or

```bash
$ yarn add react-native-camera-roll-selector
```

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :tada: Example Usage Customization

**Version \*2.0.0 update**

> If you like [`react-native-camera-roll-selector`](https://github.com/Luehang/react-native-camera-roll-selector), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-selector). Thanks.

```javascript
import CameraRollSelector from "react-native-camera-roll-selector";

//...
render() {
    return (
        <CameraRollSelector
            enableCameraRoll={false} // default true
            // Get data logic goes here.
            // This will get trigger initially
            // and when it reached the end
            // if there is more.
            onGetData={() => {
                return {
                    assets: [
                        // Can be used with different image object fieldnames.
                        // Ex. source, source.uri, uri, URI, url, URL
                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                        // { source: require("yourApp/image.png"),
                        //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                        //     // to include a dimensions field with the
                        //     // actual width and height of the image or
                        //     // it will throw an error.
                        //     dimensions: { width: 1080, height: 1920 } },
                        { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                        { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                        { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                        { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                        { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                    ],
                    pageInfo: {
                        hasNextPage: false
                    }
                }
            }}
            callback={(selectedImages, currentSelectedImage) => {
                console.log(
                    "Current selected image: ",
                    currentSelectedImage
                );
                console.log(
                    "Selected images: ",
                    selectedImages
                );
            }}

            // OPTIONAL PROP USAGE.
            enableSelect={true} // default true
            imagesPerRow={3} // default 3
            spacing={1} // default 1
        />
    );
}
//...
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :tada: Example Usage With Provided CameraRoll

:information_source: Additional installation is required to install additional package and link binaries. Follow the [Installation section](#gem-installation-for-provided-cameraroll).

> If you like [`react-native-camera-roll-selector`](https://github.com/Luehang/react-native-camera-roll-selector), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-selector). Thanks.

```javascript
import CameraRollSelector from "react-native-camera-roll-selector";

//...
render() {
    return (
        <CameraRollSelector
            callback={(selectedImages, currentSelectedImage) => {
                console.log(
                    "Current selected image: ",
                    currentSelectedImage
                );
                console.log(
                    "Selected images: ",
                    selectedImages
                );
            }}

            // OPTIONAL PROP USAGE.
            enableSelect={true} // default true
            imagesPerRow={3} // default 3
            spacing={1} // default 1
        />
    );
}
//...
```

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :nut_and_bolt: API

``<CameraRollSelector />`` component accepts the following props...

<br/>

# :books: Props

> If you like [`react-native-camera-roll-selector`](https://github.com/Luehang/react-native-camera-roll-selector), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-selector). Thanks.

<br/>

| Props | Description | Type | Default |
| ----- | ----------- | ---- | ------- |
| `callback`                           | Callback function when images was selected. `(selectedImages: Array, currentSelectedImage: Object) => void` | `Function` | (selectedImages, currentSelectedImage) => { console.log(currentSelectedImage); console.log(selectedImages); } |
| `enableSelect`                       | Enable or disable the image selector. **Version \*2.1.0 update** | `boolean` | true |
| `enableCameraRoll`                   | Enable the provide default CameraRoll. **Version \*2.0.0 update** | `boolean` | true |
| `onGetData`                          | Custom function to render provided images. `({ itemCount: number, groupTypes: string, assetType: string }) => { assets: object, pageInfo: { hasNextPage: boolean } }` Find an example at the [example section](#tada-example-usage-customization). **Version \*2.0.0 update** | `Function` | |
| `imagesPerRow`                       | Number of images per row. | `number` | 3 |
| `initialColToRender`                 | How many columns to render in the initial batch. | `number` | imagesPerRow |
| `initialNumInColsToRender`           | How many items to render in each column in the initial batch. | `number` | 1 |
| `spacing`                            | Gutter size of the column. The spacing is a multiplier of 1% of the available view. | `number` | 1 |
| `itemCount`                          | The number of item to fetch and render. **Version \*2.0.0 update** | `number` | 500 |
| `groupTypes`                         | The group where the photos will be fetched, one of "Album", "All", "Event", "Faces", "Library", "PhotoStream" and "SavedPhotos". | `string` | "All" |
| `assetType`                          | The asset type, one of "Photos", "Videos" or "All". | `string` | "Photos" |
| `maximum`                            | Maximum number of selected images. | `number` | 10 |
| `selectSingleItem`                   | To select only one single image at time or not. | `boolean` | false |
| `selected`                           | An object of images in an array that are already selected. | `array` | [] |
| `backgroundColor`                    | Set the color of the background. | `string` | "white" |
| `emptyText`                          | Text to display instead of a list when there are no photos found. | `string` | "No photos." |
| `emptyTextStyle`                     | Styles to apply to the `emptyText`. | `object` | {textAlign: "center"} |
| `loaderColor`                        | The foreground color of the initial load spinner. | `string` | "lightblue" |
| `customLoader`                       | Camera Roll loader component node. | `React.Element` | `<ActivityIndicator />` |
| `imageContainerStyle`                | The styles object which is added to the Image component. | `object` | {} |
| `markerColor`                        | The color of the marker image. | `string` | "white" |
| `renderIndividualHeader`             | Custom function that is executed **ABOVE** each individual masonry image. `(item: Object, index: number) => ?React.Element` | `Function` | |
| `renderIndividualFooter`             | Custom function that is executed **BELOW** each individual masonry image. `(item: Object, index: number) => ?React.Element` | `Function` | |
| `onPressImage`                       | Custom function that is executed after a single tap on the image. `(item: Object, index: number) => void` | `Function` | |
| `onLongPressImage`                   | Custom function that is executed after a long press on the image. `(item: Object, index: number) => void` | `Function` | |
| `customMarker`                       | Custom selected image marker component. | `React.Element` | |
| `containerWidth`                     | The width of the masonry list layout. Adding this will improve performance. | `number` | |
| `onEndReached`                       | Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content. `(info: {distanceFromEnd: number}) => void` **Version \*2.1.0 update** | `function` | |
| `onEndReachedThreshold`              | How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of 0.5 will trigger `onEndReached` when the end of the content is within half the visible length of the list. **Version \*2.1.0 update** | `number` | |
| `refreshing`                         | Set this true while waiting for new data from a refresh. **Version \*2.1.0 update** | `boolean` | false |
| `onRefresh`                          | If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the `refreshing` prop correctly. **Version \*2.1.0 update** | `function` | |

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

### :small_blue_diamond: Props WITH DEFAULT CAMERAROLL

Inorder to use these props, make sure `enableCameraRoll` prop is set to `true`.

> If you like [`react-native-camera-roll-selector`](https://github.com/Luehang/react-native-camera-roll-selector), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-selector). Thanks.

<br/>

| Props | Description | Type | Default |
| ----- | ----------- | ---- | ------- |
| `catchGetPhotosError`                | Custom function to catch errors from getting and loading images.  `(error) => void` **Version \*2.0.0 update** | `Function` | |
| `permissionDialogTitle`              | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the title of the dialog prompt requesting permissions. | `string` | "Read Storage Permission" |
| `permissionDialogMessage`            | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the content of the dialog prompt requesting permissions. | `string` | "Needs access to your photos so you can use these awesome services." |
| `pendingAuthorizedView`              | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied. | `React.Element` | Defaults to `Waiting on access permission to camera roll.` message. |
| `notAuthorizedView`                   | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied completely. | `React.Element` | Defaults to `Access denied to camera roll.` message. |

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :gem: Installation For Provided CameraRoll

### `react-native` >= 0.60

<details>
<summary>Android Installation</summary>
</br>

#### Install

```javascript
$ npm install @react-native-community/cameraroll --save
```

#### Linking

Autolinking will just do the job.

<br/>

#### :information_source: **Android REQUIREMENT.**

User's permission is required to access the Camera Roll.  Add the following to `AndroidManifest.xml` which can be found in `android/app/src/main`.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

</details>

<details>
<summary>iOS Installation</summary>
</br>

#### Install

```javascript
$ npm install @react-native-community/cameraroll --save
```

#### Linking

Autolinking will just do the job.

<br/>

#### :information_source: **Important:** On devices running **iOS 10 or later**.

 User's permission is required to access the Camera Roll.  Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in **Xcode**.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requesting access to the photo library.</string>
    <!-- ... -->
</dict>
```

<br/>

#### :information_source: **Optional:** On devices running **iOS 11 or later**.

It is required to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`.  After that, define a string that describes how your app will use this data.  By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Requesting write-only access permission.</string>
    <!-- ... -->
</dict>
```

</details>

### `react-native` < 0.60

<details>
<summary>Android Installation</summary>
</br>

#### :information_source: **Android REQUIREMENT.**

User's permission is required to access the Camera Roll.  Add the following to `AndroidManifest.xml` which can be found in `android/app/src/main`.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

</details>

<details>
<summary>iOS Installation</summary>
</br>

#### :information_source: **iOS REQUIREMENT.**

1. `react-native-camera-roll-gallery` uses React Native's [`CameraRoll`](https://facebook.github.io/react-native/docs/cameraroll) API. It requires the `RCTCameraRoll` library to be linked. Learn more about [Linking Libraries (iOS) clicking here](https://facebook.github.io/react-native/docs/linking-libraries-ios) or read for further instructions.

<br/>

2. Access the `node_modules/react-native/Libraries/CameraRoll` directory and look for `RCTCameraRoll.xcodeproj`.  Drag this file to your project on Xcode (usually under the `Libraries` group on Xcode).

![iOS Linking Libraries: Add to Libraries](https://luehangs.site/images/add-to-libraries.jpg)

<br/>

3. Click on your main `.xcodeproj` project file and select the `Build Phases` tab and drag the static library from the `Products` folder inside the library you are importing to `Link Binary With Libraries`.

![iOS Linking Libraries: Add to Build Phases](https://luehangs.site/images/add-to-build-phases.jpg)

<br/>

#### :information_source: **Important:** On devices running **iOS 10 or later**.

 User's permission is required to access the Camera Roll.  Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in **Xcode**.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requesting access to the photo library.</string>
    <!-- ... -->
</dict>
```

<br/>

#### :information_source: **Optional:** On devices running **iOS 11 or later**.

It is required to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`.  After that, define a string that describes how your app will use this data.  By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Requesting write-only access permission.</string>
    <!-- ... -->
</dict>
```

</details>

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :large_blue_diamond: Example Project

Perform steps 1-2 to run locally:

<details>
<summary>1. Clone the Repo</summary>
</br>

**Clone** `react-native-camera-roll-selector` locally. In a terminal, run:

```bash
$ git clone https://github.com/Luehang/react-native-camera-roll-selector.git react-native-camera-roll-selector
```

</details>

<details>
<summary>2. Install and Run</summary>
</br>

```bash
$ cd react-native-camera-roll-selector/example/
```

#### iOS - Mac - Install & Run

	1. check out the code
	2. npm install
	3. npm run ios

#### Android - Mac - Install & Run

	1. check out the code
	2. npm install
	3. emulator running in separate terminal
	4. npm run android

</details>

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :large_blue_diamond: Author

<a href="https://www.facebook.com/lue.hang">
<img src="https://www.luehangs.site/images/lue-hang2018-circle-150px.png"/>
</a>

Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: Contribute

[Pull requests](https://github.com/Luehang/react-native-camera-roll-selector/pulls) are welcomed.

<br/>

### :large_blue_diamond: Contributors

Contributors will be posted here.

<br/>

### :small_blue_diamond: Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-native-camera-roll-selector/issues).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
