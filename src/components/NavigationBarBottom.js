import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function BottomNav() {

const navigation = useNavigation();

  const handleDevices = () => {
    navigation.navigate('ViewDevices');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="dollar" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <SimpleLineIcons name="energy" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleDevices()}>
        <MaterialIcons name="add-to-queue" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});
