import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const EvaluationScreen = ({route}) => {
  const [gptEvaluation, setGptEvaluation] = useState('');

  useEffect(() => {
    if (route.params && route.params.gptEvaluation) {
      setGptEvaluation(route.params.gptEvaluation);
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gptEvaluation ? (
        <View style={styles.evaluationContainer}>
          <Text style={styles.header}>Evaluation Results</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Ingredients identified:</Text>
            <Text style={styles.sectionContent}>
              - Sugar, Salt, Artificial flavors, Preservatives
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Health Effects:</Text>
            <Text style={styles.sectionContent}>
              - Sugar: Consuming high amounts of sugar can lead to weight gain,
              increase the risk of obesity, type 2 diabetes, and heart disease.
            </Text>
            <Text style={styles.sectionContent}>
              - Salt: Excessive salt consumption can contribute to high blood
              pressure and increase the risk of stroke and heart disease.
            </Text>
            <Text style={styles.sectionContent}>
              - Artificial flavors: Some artificial flavors may contain
              chemicals that can have negative health effects with long-term
              consumption.
            </Text>
            <Text style={styles.sectionContent}>
              - Preservatives: Preservatives may have low to moderate negative
              health effects, from allergies to digestive issues.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Pros and Cons:</Text>
            <Text style={styles.sectionContent}>- Pros:</Text>
            <Text style={styles.subSectionContent}>
              - Convenience and longer shelf-life.
            </Text>
            <Text style={styles.subSectionContent}>
              - Enhanced taste and flavor profile.
            </Text>
            <Text style={styles.sectionContent}>- Cons:</Text>
            <Text style={styles.subSectionContent}>
              - High sugar and salt content can lead to adverse health effects.
            </Text>
            <Text style={styles.subSectionContent}>
              - Artificial flavors may not provide nutritional benefits and can
              potentially harm health.
            </Text>
            <Text style={styles.subSectionContent}>
              - Long-term consumption of preservatives may have negative health
              impacts.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              Recommended Consumption Frequency:
            </Text>
            <Text style={styles.sectionContent}>
              - It is recommended to consume pre-processed foods containing
              these ingredients occasionally and in moderation to minimize the
              negative health effects associated with them. Regular consumption
              should be limited to prevent adverse health outcomes.
            </Text>
          </View>
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
    backgroundColor: '#ecf0f1', // Changed background color
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
    color: '#333', // Changed text color
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555', // Changed text color
  },
  sectionContent: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 5,
    color: '#333', // Changed text color
  },
  subSectionContent: {
    fontSize: 16,
    marginLeft: 30,
    marginBottom: 5,
    color: '#555', // Changed text color
  },
  nothingToShow: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333', // Changed text color
  },
});

export default EvaluationScreen;
