import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SectionList, SafeAreaView, StatusBar} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = 'https://api.weather.gov/alerts/active?area=CA';

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json.features.map((alert) => {
        return {
          id: alert.id,
          title: alert.properties.headline,
          description: alert.properties.description,
          isExpanded: false,
        };
      })))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const sections = [
    {
      title: 'US Weather Service Alerts',
      data: data,
    },
  ];

  const handleExpand = (id) => {
    setData(data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isExpanded: !item.isExpanded,
        };
      } else {
        return item;
      }
    }));
  };

  return (
    <SafeAreaView>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.title} onPress={() => handleExpand(item.id)}>{item.title}</Text>
            {item.isExpanded && <Text style={{ color: 'white' }}>{item.description}</Text>}
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    backgroundColor: '#322D2D',
    padding: 20,
    marginVertical: 8,
  }
});
