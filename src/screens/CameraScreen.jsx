import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
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

const InfoDialog = ({visible, onClose}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.infoDialogContainer}>
      <View style={styles.infoDialog}>
        <Text style={styles.infoDialogTitle}>Food Quality Evaluation Tool</Text>
        <Text style={styles.infoDialogText}>
          Welcome to our Food Quality Evaluation Tool! This application helps
          you make informed decisions about the nutritional quality and
          potential health impacts of the foods you consume.
        </Text>
        <Text style={styles.infoDialogSteps}>
          Steps:
          {'\n'}1. Capture Image{'\n'}2. Text Extraction{'\n'}3. Processing
          {'\n'}4. Results
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.infoDialogButton}>
          <Text style={styles.infoDialogButtonText}>Got it!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);



const CameraScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);
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
                  <InfoButton onPress={() => setInfoDialogVisible(true)} />
                </Animated.View>
              </View>
            </>
          );
        }}
      </RNCamera>
      <InfoDialog
        visible={infoDialogVisible}
        onClose={() => setInfoDialogVisible(false)}
      />
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
  infoDialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoDialog: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  infoDialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark text color
  },

  infoDialogText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
    color: '#555', // Dark text color
  },

  infoDialogSteps: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
    color: '#555', // Dark text color
  },

  infoDialogButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  infoDialogButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '50%', // Adjust width if needed
    alignSelf: 'center', // Center button horizontally
  },

  infoDialogButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CameraScreen;
