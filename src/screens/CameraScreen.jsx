import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {BarIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons'; 

const CaptureButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.captureButton}>
    <Text style={styles.captureButtonText}>Capture</Text>
  </TouchableOpacity>
);

const InfoButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.infoButton}>
    <Icon name="information-circle-outline" size={24} color="yellow" />
  </TouchableOpacity>
);

const CameraScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const takePicture = async camera => {
    setLoading(true);
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    const formData = new FormData();
    formData.append('image', {
      uri: data.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      console.log('sending image');
      const response = await axios.post(
        'http://192.168.1.2:3001/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Image uploaded successfully:');

      console.log(typeof response.data);

      navigation.navigate('Evaluation', {gptEvaluation: response.data});
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        mirrorImage={false}>
        {({camera, status}) => {
          if (status !== 'READY') return <View />;
          return (
            <>
              <View style={styles.buttonContainer}>
                <CaptureButton
                  onPress={async () => await takePicture(camera)}
                />
              </View>
              {loading && (
                <View style={styles.loadingContainer}>
                  <BarIndicator color="#5F64D3" />
                </View>
              )}
              <View style={styles.infoButtonContainer}>
                <Animated.View
                  style={[
                    styles.infoButton,
                    {transform: [{scale: scaleAnim}]},
                  ]}>
                  <InfoButton
                    onPress={() => console.log('Info button pressed')}
                  />
                </Animated.View>
              </View>
            </>
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
  infoButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  infoButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default CameraScreen;
