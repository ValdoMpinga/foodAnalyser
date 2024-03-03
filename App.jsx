import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker'; 
import axios from 'axios';
import EvaluationScreen from './src/screens/EvaluationScreen';

const CaptureButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.captureButton}>
    <Text style={styles.captureButtonText}>SNAP</Text>
  </TouchableOpacity>
);

const App = () => {
  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);

    ImagePicker.openCropper({
      path: data.uri,
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
    }).then(async croppedImage => {
      console.log(croppedImage);
      const croppedImageUri = croppedImage.path;

      const formData = new FormData();
      formData.append('image', {
        uri: croppedImageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      console.log('sending image');
      axios
        .post('http://192.168.1.254:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('Cropped image uploaded successfully:', response);
        })
        .catch(error => {
          console.error('Error uploading cropped image:', error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.buttonContainer}>
              <CaptureButton onPress={async () => await takePicture(camera)} />
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default App;
