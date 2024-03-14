import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const EvaluationScreen = ({route}) => {
  const [gptEvaluation, setGptEvaluation] = useState('');

useEffect(() => {
  if (route.params && route.params.gptEvaluation) {
    console.log('Received gptEvaluation:', route.params.gptEvaluation);
    setGptEvaluation(route.params.gptEvaluation);
  }
}, [route.params]);


const renderKeyValuePairs = () => {
  if (!gptEvaluation || Object.keys(gptEvaluation).length === 0) {
    return <Text style={styles.nothingToShow}>Nothing to show</Text>;
  }

  const keyValuePairs = [];

  for (const [key, value] of Object.entries(gptEvaluation)) {
    // Create a title string with the key
    const title = `${key}:`;
    // Determine if the value is an array or a string
    const content = Array.isArray(value) ? value.join('\n') : value;
    // Add the title and content to the array
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
});

export default EvaluationScreen;

// const dataTemplate = {
//   identified_ingredients: [],
//   health_impact: [],
//   pros_and_cons: {
//     short_term: [],
//     long_term: [],
//   },
//   recommended_consumption: '',
// };

// const dataTemplate = {
//   identified_ingredients: [
//     'fécula de pata e',
//     'maltodextrina',
//     'fructosa',
//     'especias en polvo',
//     'corrector de la acidez (E-262ii)',
//     'aceite vegetal',
//     'aroma de humo',
//     'acidulante (E-330)',
//     'colorantes (E-160a, E-160d)',
//     'antioxidante (E-306)',
//   ],
//   health_impact:
//     'The identified ingredients may have short-term and long-term negative health impacts if consumed excessively. Some of the ingredients like fructosa and maltodextrina are sources of added sugars and may contribute to health issues like obesity and diabetes when consumed in large amounts.',
//   pros_and_cons_short_term:
//     'Short-term consumption may provide flavor and texture to the food, but it can also lead to a quick spike in blood sugar levels due to ingredients like fructosa.',
//   pros_and_cons_long_term:
//     'Long-term consumption of these ingredients, especially in processed foods, may contribute to chronic health conditions like obesity, diabetes, and cardiovascular diseases.',
//   recommended_consumption:
//     'It is recommended to consume products containing these ingredients in moderation. It is advisable to limit the intake of processed foods high in added sugars, such as fructosa and maltodextrina, to maintain a balanced and healthy diet.',
// };

// const data = {
// identified_ingredients": [
//     "água",
//     "farinha de trigo",
//     "fécula de batata"
//   ],
//   "health_impact": "The identified ingredients are generally safe for consumption.",
//   "pros_and_cons_short_term": "Short-term consumption of these ingredients is unlikely to have negative effects.",
//   "pros_and_cons_long_term": "Long-term consumption can contribute to a balanced diet.",
//   "recommended_consumption": "Recommended to consume ingredients in moderation as part of a varied diet."
// };
