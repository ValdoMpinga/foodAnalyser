import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const EvaluationScreen = ({route}) => {
  const [gptEvaluation, setGptEvaluation] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.gptEvaluation) {
      console.log('Received gptEvaluation:', route.params.gptEvaluation);
      setGptEvaluation(route.params.gptEvaluation);
    }
  }, [route.params]);

  const handleEvaluateAgain = () => {
    navigation.navigate('Camera');
  };

  const renderKeyValuePairs = () => {
    if (!gptEvaluation || Object.keys(gptEvaluation).length === 0) {
      return <Text style={styles.nothingToShow}>Nothing to show</Text>;
    }

    const keyValuePairs = [];

    for (const [key, value] of Object.entries(gptEvaluation)) {
      const title =
        key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ':';
      const content = Array.isArray(value) ? value.join('\n') : value;
      keyValuePairs.push({title, content});
    }

    return (
      <>
        {keyValuePairs.map(({title, content}, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionHeader}>{title}</Text>
            <Text style={styles.sectionContent}>{content}</Text>
          </View>
        ))}
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gptEvaluation ? (
        <View style={styles.evaluationContainer}>
          <Text style={styles.header}>Evaluation Results</Text>
          {renderKeyValuePairs()}
          <TouchableOpacity onPress={handleEvaluateAgain} style={styles.button}>
            <Text style={styles.buttonText}>Evaluate Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.nothingToShow}>Nothing to show</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  evaluationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  nothingToShow: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EvaluationScreen;
