import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 FlatList,
 TextInput,
} from 'react-native';

const AddCharge = () => {
 const [currencyType, setCurrencyType] = useState('');
 const [fixedCharges, setFixedCharges] = useState([]);

 const addFixedCharge = () => {
    setFixedCharges([...fixedCharges, '']);
 };

 const renderFixedCharge = ({ item, index }) => {
    return (
      <View style={styles.inputRow}>
        <Text style={styles.label}>Fixed Charge {index + 1}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            let updatedFixedCharges = [...fixedCharges];
            updatedFixedCharges[index] = text;
            setFixedCharges(updatedFixedCharges);
          }}
          value={item}
        />
      </View>
    );
 };

 return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Currency Type</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCurrencyType}
          value={currencyType}
        />
      </View>
      <FlatList
        data={fixedCharges}
        renderItem={renderFixedCharge}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addIcon} onPress={addFixedCharge}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
 },
 inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
 },
 label: {
    fontSize: 18,
 },
 input: {
    borderBottomWidth: 1,
    padding: 5,
 },
 addIcon: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
 },
 addText: {
    fontSize: 24,
 },
});

export default AddCharge;