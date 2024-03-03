import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EvaluationScreen from './src/screens/EvaluationScreen';
import CameraScreen from './src/screens/CameraScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{title: 'Camera'}}
        />
        <Stack.Screen
          name="Evaluation"
          component={EvaluationScreen}
          options={{title: 'Evaluation'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
