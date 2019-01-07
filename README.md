<a href="https://luehangs.site/lue_hang/projects/react-native-camera-roll-selector"><img src="https://luehangs.site/images/react-native-camera-roll-selector-main.jpg" alt="react-native-camera-roll-selector"/></a>

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

> An easy and simple to use React Native component providing images selection from camera roll. The images in the camera roll are displayed with a custom high performant masonry layout. Supporting both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

![react-native-camera-roll-selector](https://luehangs.site/videos/react-native-camera-roll-selector-demo.gif)

#### :information_source: Learn more about React Native with project examples along with Cyber Security and Ethical Hacking at [LH LABS](https://www.luehangs.site).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

# Index

### 1.  [Getting Started](#large_blue_diamond-getting-started)
### 2.  [Manual Installation](#large_blue_diamond-manual-installation)
### 3.  [Usage Example](#large_blue_diamond-usage-example)
### 3.  :books: [API](#large_blue_diamond-api)
### 4.  [Props](#large_blue_diamond-props)
### 5.  [Reference](#large_blue_diamond-reference)
### 6.  [Example Project](#large_blue_diamond-example-project)
### 7.  [Author](#large_blue_diamond-author)
### 8.  [Contribute](#large_blue_diamond-contribute)
### 9.  [License](#large_blue_diamond-license)

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

#### :information_source: **No further installation is required for Android.**

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :large_blue_diamond: Manual Installation

#### :information_source: **No further installation is required for Android.**

<br/>

#### :information_source: **THIS IS A REACT NATIVE AND iOS REQUIREMENT.**

1. `react-native-camera-roll-selector` uses React Native's [`CameraRoll`](https://facebook.github.io/react-native/docs/cameraroll) API. It requires the `RCTCameraRoll` library to be linked. Learn more about [Linking Libraries (iOS) clicking here](https://facebook.github.io/react-native/docs/linking-libraries-ios) or read for further instructions.

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

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :large_blue_diamond: Usage Example

Add an ``import`` to the top of the file.

At minimal, declare the ``CameraRollGallery`` component in the ``render()``.

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
                    "Selected images: "
                    selectedImages
                );
            }}
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

## :large_blue_diamond: API

``<CameraRollSelector />`` component accepts the following props...

<br/>

## :large_blue_diamond: Props

#### -  [`callback`](#small_blue_diamond-callback)
#### -  [`imagesPerRow`](#small_blue_diamond-imagesperrow)
#### -  [`initialColToRender`](#small_blue_diamond-initialcoltorender)
#### -  [`initialNumInColsToRender`](#small_blue_diamond-initialnumincolstorender)
#### -  [`spacing`](#small_blue_diamond-spacing)
#### -  [`groupTypes`](#small_blue_diamond-grouptypes)
#### -  [`assetType`](#small_blue_diamond-assettype)
#### -  [`maximum`](#small_blue_diamond-maximum)
#### -  [`selectSingleItem`](#small_blue_diamond-selectsingleitem)
#### -  [`selected`](#small_blue_diamond-selected)
#### -  [`backgroundColor`](#small_blue_diamond-backgroundcolor)
#### -  [`emptyText`](#small_blue_diamond-emptytext)
#### -  [`emptyTextStyle`](#small_blue_diamond-emptytextstyle)
#### -  [`loaderColor`](#small_blue_diamond-loadercolor)
#### -  [`customLoader`](#small_blue_diamond-customloader)
#### -  [`imageContainerStyle`](#small_blue_diamond-imagecontainerstyle)
#### -  [`markerColor`](#small_blue_diamond-markercolor)
#### -  [`customMarker`](#small_blue_diamond-custommarker)
#### -  [`renderIndividualHeader`](#small_blue_diamond-renderindividualheader)
#### -  [`renderIndividualFooter`](#small_blue_diamond-renderindividualfooter)
#### -  [`onPressImage`](#small_blue_diamond-onpressimage)
#### -  [`onLongPressImage`](#small_blue_diamond-onlongpressimage)
#### -  [`containerWidth`](#small_blue_diamond-containerwidth)
#### -  [`permissionDialogTitle`](#small_blue_diamond-permissiondialogtitle)
#### -  [`permissionDialogMessage`](#small_blue_diamond-permissiondialogmessage)
#### -  [`pendingAuthorizedView`](#small_blue_diamond-pendingauthorizedview)
#### -  [`notAuthorizedView`](#small_blue_diamond-notauthorizedview)

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :large_blue_diamond: Reference

# Props

<br/>

### :small_blue_diamond: `callback`

```typescript

(selectedImages: Array, currentSelectedImage: Object) => void

```

Callback function when images was selected. Defaults to `(selectedImages, currentSelectedImage) => { console.log(currentSelectedImage); console.log(selectedImages); }`.

TYPE | REQUIRED
------ | ------
Function | No

<br/>

***
<br/>

### :small_blue_diamond: `imagesPerRow`

Number of images per row. Defaults to `3`.

TYPE | REQUIRED
------ | ------
number | No

<br/>

***
<br/>

### :small_blue_diamond: `initialColToRender`

How many columns to render in the initial batch. Defaults to `imagesPerRow`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `initialNumInColsToRender`

How many items to render in each column in the initial batch. Defaults to `1`.

TYPE | REQUIRED
------ | ------
number | No

<br/>

***
<br/>

### :small_blue_diamond: `spacing`

Gutter size of the column. The spacing is a multiplier of 1% of the available view. Defaults to `1`.

TYPE | REQUIRED
------ | ------
number | No

<br/>

***
<br/>

### :small_blue_diamond: `groupTypes`

The group where the photos will be fetched, one of "Album", "All", "Event", "Faces", "Library", "PhotoStream" and "SavedPhotos". Defaults to `"SavedPhotos"`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `assetType`

The asset type, one of "Photos", "Videos" or "All". Defaults to `"Photos"`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `maximum`

Maximum number of selected images. Defaults to `10`.

TYPE | REQUIRED
------ | ------
number | No

<br/>

***
<br/>

### :small_blue_diamond: `selectSingleItem`

To select only one single image at time or not. Defaults to `false`.

TYPE | REQUIRED
------ | ------
Boolean | No

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

### :small_blue_diamond: `selected`

An object of images in an array that are already selected. Defaults to `[]`.

TYPE | REQUIRED
------ | ------
Array | No

<br/>

***
<br/>

### :small_blue_diamond: `backgroundColor`

Set the color of the background. Defaults to `"white"`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `emptyText`

Text to display instead of a list when there are no photos found. Defaults to `"No photos."`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `emptyTextStyle`

Styles to apply to the `emptyText`. Defaults to `{textAlign: "center"}`.

TYPE | REQUIRED
------ | ------
Object | No

<br/>

***
<br/>

### :small_blue_diamond: `loaderColor`

The foreground color of the initial load spinner. Defaults to `"lightblue"`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `customLoader`

Camera Roll loader component node. Defaults to `<ActivityIndicator />`.

TYPE | REQUIRED
------ | ------
React.Element | No

<br/>

***
<br/>

### :small_blue_diamond: `imageContainerStyle`

The styles object which is added to the Image component. Defaults to `{}`.

TYPE | REQUIRED
------ | ------
Object | No

<br/>

***
<br/>

### :small_blue_diamond: `markerColor`

The color of the marker image. Defaults to `"white"`.

TYPE | REQUIRED
------ | ------
string | No

<br/>

***
<br/>

### :small_blue_diamond: `renderIndividualHeader`

```typescript

(item: Object, index: number) => ?React.Element

```

Custom function that is executed **ABOVE** each individual masonry image.

TYPE | REQUIRED
------ | ------
Function | No

<br/>

***
<br/>

### :small_blue_diamond: `renderIndividualFooter`

```typescript

(item: Object, index: number) => ?React.Element

```

Custom function that is executed **BELOW** each individual masonry image.

TYPE | REQUIRED
------ | ------
Function | No

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

### :small_blue_diamond: `onPressImage`

```typescript

(item: Object, index: number) => void

```

Custom function that is executed after a single tap on the image.

TYPE | REQUIRED
------ | ------
Function | No

<br/>

***
<br/>

### :small_blue_diamond: `onLongPressImage`

```typescript

(item: Object, index: number) => void

```

Custom function that is executed after a long press on the image.

TYPE | REQUIRED
------ | ------
Function | No

<br/>

***
<br/>

### :small_blue_diamond: `customMarker`

Custom selected image marker component.

TYPE | REQUIRED
------ | ------
React.Element | No

<br/>

***
<br/>

### :small_blue_diamond: `containerWidth`

The width of the masonry list layout. Adding this will improve performance.

TYPE | REQUIRED
------ | ------
number | No

<br/>

***
<br/>

### :small_blue_diamond: `permissionDialogTitle`

Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the title of the dialog prompt requesting permissions. Defaults to `"Read Storage Permission"`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `permissionDialogMessage`

Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the content of the dialog prompt requesting permissions. Defaults to `"Needs access to your photos so you can use these awesome services."`.

TYPE | REQUIRED
------ | ------
String | No

<br/>

***
<br/>

### :small_blue_diamond: `pendingAuthorizedView`

Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied. Defaults to `Waiting on access permission to camera roll.` message.

TYPE | REQUIRED
------ | ------
React.Element | No

<br/>

***
<br/>

### :small_blue_diamond: `notAuthorizedView`

Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied completely. Defaults to `Access denied to camera roll.` message.

TYPE | REQUIRED
------ | ------
React.Element | No

<br/>

***
<br/>

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :large_blue_diamond: Example Project

Perform steps 1-2 to run locally:

1. [Clone the Repo](#1-clone-the-repo)
2. [Install and Run](#2-install-and-run)

<br/>

### 1. Clone the Repo

**Clone** `react-native-camera-roll-selector` locally. In a terminal, run:

```bash
$ git clone https://github.com/Luehang/react-native-camera-roll-selector.git react-native-camera-roll-selector
```

<br/>

### 2. Install and Run

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

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
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

### Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-native-camera-roll-selector/issues).

<br/>

### Contributors

Contributors will be posted here.

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
