import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from "expo-status-bar";
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera';
import Block from '../block/block.comp';
import { Colors, Sizes } from '../../theme';
import { Text, Icon } from '../../atomic/ions';
import { Button } from '../../atomic/atoms';
import Tabs from '../tabs/tabs.comp';

export interface IProfileProps {
  onCloseCamera?: any,
  onOpenImagePicker?: any
}

const ArCamera: React.FC<IProfileProps> = ({
  onCloseCamera,
  onOpenImagePicker
}) => {

  let refCamera: any = React.createRef()

  const [, setHasPermission] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState(Camera.Constants.FlashMode.off);

  const [isTakingPicture, setTakingPicture] = React.useState(false);
  const [isTakingVideo, setTakingVideo] = React.useState(false);

  const [, setCameraReady] = React.useState(false);
  const [isCameraShown, setCameraShown] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
      setHasPermission(hasCameraPermission);
    })();
  }, []);

  const handleCameraRef = (ref: any) => {
    refCamera = ref;
  };

  const handleCameraReady = () => {
    setCameraReady(true)
  };

  const toggleCamera = () => {
    if (isCameraShown) {
      setCameraShown(false)
      setCameraReady(false)
      onCloseCamera && onCloseCamera()
      refCamera = null
    } else {
      setCameraShown(true)
    }
  }

  const handleShortCapture = async () => {
    if (isTakingVideo)
      return
    setTakingVideo(false)
    setTakingPicture(true)
    try {
      await refCamera.takePictureAsync()
        .then((data: any) => {
          onOpenImagePicker && onOpenImagePicker(data)
        });
      setTakingPicture(false)
    } catch (e) {
      Alert.alert('Could not take picture')
      console.log(e)
      setTakingPicture(false)
    }
  };

  const handleCaptureOut = () => {
    if (isTakingVideo)
      refCamera.stopRecording()
  };

  const handleLongCapture = async () => {
    if (isTakingPicture)
      return
    setTakingPicture(false)
    setTakingVideo(true)
    try {
      await refCamera.recordAsync()
        .then((data: any) => {
          onOpenImagePicker && onOpenImagePicker(data)
        });

      setTakingVideo(false)
    } catch (e) {
      Alert.alert('Could not take video')
      console.log(e)
      setTakingVideo(false)
    }
  };

  const handleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    )
  }

  const handleCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
  }

  return (
    <Block flex>
      {isCameraShown && (
        <Camera
          ref={handleCameraRef}
          type={type}
          flashMode={flashMode}
          onCameraReady={handleCameraReady}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Block absolute style={styles.topContainerLeft}>
        <Block flex center middle>
          <Block>
            <TouchableOpacity onPress={toggleCamera}>
              <Icon family="Ionicons" name="md-close" color="white" size={30} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block absolute style={styles.topContainer}>
        <Block flex center middle>
          <Block>
            <TouchableOpacity onPress={() => handleCameraType}>
              <Icon
                family="Ionicons"
                name={type === Camera.Constants.Type.back ? "ios-reverse-camera" : "ios-camera"}
                color={type === Camera.Constants.Type.back ? "white" : Colors.PRIMARY}
                size={30}
              />
            </TouchableOpacity>
          </Block>
          <Block paddingTop={20}>
            <TouchableOpacity onPress={handleFlashMode}>
              <Icon
                family="MaterialCommunityIcons"
                name={flashMode == Camera.Constants.FlashMode.on ? "flash" : 'flash-off'}
                color={flashMode === Camera.Constants.FlashMode.off ? "white" : Colors.PRIMARY}
                size={25}
              />
            </TouchableOpacity>
          </Block>
          <Block paddingTop={20}>
            <TouchableOpacity onPress={toggleCamera}>
              <Icon family="Octicons" name="settings" color="white" size={25} />
            </TouchableOpacity>
          </Block>
          <Block paddingTop={20}>
            <TouchableOpacity>
              <Icon family="Ionicons" name="ios-timer" color="white" size={25} />
            </TouchableOpacity>
          </Block>
          <Block paddingTop={20} paddingBottom={10}>
            <TouchableOpacity>
              <Icon family="MaterialCommunityIcons" name={'image-auto-adjust'} color="white" size={25} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block absolute style={styles.bottomContainer}>
        <Block row space="between">
          <Block>
            <Button small rounded backgroundless>
              <Text h3>Delete</Text>
            </Button>
          </Block>
          <Block flex absolute style={styles.captureBtnContainer}>
            <TouchableWithoutFeedback
              onPressIn={() => setTakingVideo(true)}
              onPressOut={handleCaptureOut}
              onLongPress={handleLongCapture}
              onPress={handleShortCapture}>
              <Block middle center>
                {isTakingVideo ? 
                  <Block middle center style={[styles.captureBtnSquare]}>
                    <Block style={styles.captureBtnInternal}/> 
                  </Block>
                  : 
                  <Block middle center style={[styles.captureBtn]}>
                    <Block middle center style={[styles.captureBtnActive]} />
                  </Block>
                }
              </Block>
            </TouchableWithoutFeedback>
          </Block>
          <Block>
            <Button small rounded backgroundless>
              <Text h3>Send</Text>
            </Button>
          </Block>
        </Block>
        <Tabs data={tabs} initialIndex={'upload'} borderless/>
      </Block>
    </Block>
  );
}

export default ArCamera;

const tabs = [
  { id: 'upload', title: 'UPLOAD', },
  { id: 'library', title: 'LIBRARY', }
];

const styles = StyleSheet.create({
  topContainerLeft: {
    top: Sizes.BASE * 3,
    left: Sizes.BASE,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  topContainer: {
    top: Sizes.BASE * 3,
    right: Sizes.BASE,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    padding: 10,
    borderRadius: 5
  },
  bottomContainer: {
    bottom: 0,
    right: 0,
    left: 0,
    padding: 30
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 70,
    borderColor: "#FFFFFF"
  },
  captureBtnActive: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY
  },
  captureBtnSquare: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#FFFFFF"
  },
  captureBtnInternal: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY
  },
  captureBtnContainer: { 
    flex: 1,
    position: 'absolute',
    alignSelf: 'center', 
    right: 0,
    left: 0,
    zIndex: -1
  }
});