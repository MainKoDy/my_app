import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SectionList, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('time'); // new state variable

  const url = 'https://api.weather.gov/alerts/active?area=CA';

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json.features.map((alert) => {
        return {
          id: alert.id,
          effectiveDate: alert.properties.effective,
          sentDate: alert.properties.sent,
          title: alert.properties.headline,
          description: alert.properties.description,
          event: alert.properties.event,
          isExpanded: false,
          area: alert.properties.areaDesc,
          onsetDate: alert.properties.onset,
          expireDate: alert.properties.expires,
          ends: alert.properties.ends,
          status: alert.properties.status,
          messageType: alert.properties.messageType,
          category: alert.properties.category,
          severity: alert.properties.severity,
          certainty: alert.properties.certainty,
          urgency: alert.properties.urgency,
          sender: alert.properties.sender,
          senderName: alert.properties.senderName,
        };
      })))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // sort data based on current sortBy state
  useEffect(() => {
    switch (sortBy) {
      case 'type':
        setData([...data].sort((a, b) => a.event.localeCompare(b.event)));
        break;
      case 'area':
        setData([...data].sort((a, b) => a.area.localeCompare(b.area)));
        break;
      case 'severity':
        setData([...data].sort((a, b) => a.severity.localeCompare(b.severity)));
        break;
      default:
        // handle invalid sortBy value
        break;
    }
  }, [sortBy]);

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

  const handleSort = (sortMethod) => {
    setSortBy(sortMethod);
  };

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'type' && styles.activeSortButton]}
          onPress={() => handleSort('type')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'type' && styles.activeSortButtonText]}>Sort by Type</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'area' && styles.activeSortButton]}
          onPress={() => handleSort('area')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'area' && styles.activeSortButtonText]}>Sort by Area</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'severity' && styles.activeSortButton]}
          onPress={() => handleSort('severity')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'severity' && styles.activeSortButtonText]}>Sort by Severity</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.item}>
            <Text style={{ color: '#aaa', fontWeight: 'bold', textAlign: 'Center'}}>{item.severity}</Text>
            <Text style={styles.title} onPress={() => handleExpand(item.id)}>{item.title}</Text>
            {item.isExpanded && <Text style={{ color: 'white' }}>Effective Date: {item.effectiveDate}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Onset Date: {item.onsetDate}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Expiry Date: {item.expireDate}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>End Date: {item.ends}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Area: {item.area}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Status: {item.status}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Message Type: {item.messageType}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Category: {item.category}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Certainty: {item.certainty}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Urgency: {item.urgency}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Sender: {item.sender}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>Sender Name: {item.senderName}</Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}> </Text>}
            {item.isExpanded && <Text style={{ color: 'white' }}>{item.description}</Text>}



            <Text style={{ color: '#aaa' }}>{item.event}</Text> {/* display event type */}
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
    padding: 15,
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
  },
});
