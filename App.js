import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SectionList, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSortMethod, setSelectedSortMethod] = useState('');

  const url = 'https://api.weather.gov/alerts/active?area=CA'; // API URL

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json()) // Convert recieved API into json format
      .then((json) => setData(json.features.map((alert) => { // Create an array of objects, with given fields.
        return {
          id: alert.id,
          effectiveDate: alert.properties.effective,
          sentDate: alert.properties.sent,
          title: alert.properties.headline,
          description: alert.properties.description,
          event: alert.properties.event,
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
          isExpanded: false,
        }
      })))
      .catch((error) => console.error(error)); // catch error
  }, [])

  // sort the data based on selection
  useEffect(() => {
    switch (selectedSortMethod) {
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
        break;
    }
  }, [selectedSortMethod])

  const sections = [
    {
      title: 'US Weather Service Alerts',
      data: data,
    },
  ]

  const handleExpand = (id) => { // Expand selected item to display further details
    setData(data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isExpanded: !item.isExpanded,
        }
      } else {
        return item
      }
    }))
  }

  const handleSort = (sortMethod) => { // Function to call "setSelectedSortMethod", selecting the sorting method.
    setSelectedSortMethod(sortMethod)
  }

  return (
<SafeAreaView style={styles.header}>
  <View style={styles.sortContainer}>
  <Text style={{ color: '#aaa' }}> </Text>
  <Text style={{ color: '#aaa' }}> </Text>
    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center'}}>Sort By:</Text>
    <Picker style={styles.picker}
      selectedValue={selectedSortMethod}
      onValueChange={(itemValue) => handleSort(itemValue)}
      itemStyle={{ backgroundColor: '#322D2D' }}
    >
      <Picker.Item style={{color : 'black'}} label="Select a Value" value="" />
      <Picker.Item style={{color : 'black'}} label="Type" value="type" />
      <Picker.Item style={{color : 'black'}} label="Area" value="area" />
      <Picker.Item style={{color : 'black'}} label="Severity" value="severity" />
    </Picker>
  </View>
  <SectionList
    sections={sections}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => ( // DIsplay data
      <View key={item.id} style={styles.item}>
        <Text style={styles.severity}>{item.severity}</Text>
        <Text style={styles.title} onPress={() => handleExpand(item.id)}>{item.title}</Text>
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Effective Date: {item.effectiveDate}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Onset Date: {item.onsetDate}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Expiry Date: {item.expireDate}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>End Date: {item.ends}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Area: {item.area}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Status: {item.status}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Message Type: {item.messageType}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Category: {item.category}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Certainty: {item.certainty}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Urgency: {item.urgency}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Sender: {item.sender}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}>Sender Name: {item.senderName}</Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: '#aaa' }}> </Text>}
        {item.isExpanded && <Text style={{ color: 'white' }}>{item.description}</Text>}
        <Text style={{ color: '#aaa' }}>{item.event}</Text>
      </View>
    )}
    renderSectionHeader={({ section }) => (
      <Text style={styles.header}>{section.title}</Text>
    )}
  />
</SafeAreaView>

  )
}

const styles = StyleSheet.create({ // style sheet
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
  picker: {
    backgroundColor: '#dfe1e1',
  },
  severity: {
    color: '#aaa', 
    fontWeight: 'bold', 
    textAlign: 'center',
  }
})
