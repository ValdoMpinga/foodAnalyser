import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const CaptureButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.captureButton}>
    <Text style={styles.captureButtonText}>SNAP</Text>
  </TouchableOpacity>
);

const CameraScreen = () => {
  const navigation = useNavigation();

  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    ImagePicker.openCropper({
      path: data.uri,
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
    }).then(async croppedImage => {
      const formData = new FormData();
      formData.append('image', {
        uri: croppedImage.path,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      try {
        console.log('sending image');
        const response = await axios.post(
          'http://192.168.1.254:3000/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Cropped image uploaded successfully:', response);
        navigation.navigate('Evaluation');
      } catch (error) {
        console.error('Error uploading cropped image:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}>
        {({camera, status}) => {
          if (status !== 'READY') return <View />;
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

export default CameraScreen;
