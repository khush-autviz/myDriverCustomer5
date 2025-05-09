import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Black, DarkGray, Gold, Gray, LightGold, White} from '../constants/Color';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Location() {
  const navigation: any = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: Black, padding: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Gold} />
        </TouchableOpacity>
        <Text style={{color: Gold, fontSize: 18, paddingLeft: 10}}>Drop</Text>
      </View>
      <View
        style={{
          borderColor: Gold,
          borderWidth: 1,
          marginTop: 20,
          padding: 10,
          //   height: 50,
          borderRadius: 8,
          flexDirection: 'row',
          gap: 20,
        }}>
        <View style={{gap: 20}}>
          <Ionicons name="location" size={20} color="green" />
          <Ionicons name="location" size={20} color="red" />
        </View>
        <View style={{gap: 10, width: '90%'}}>
          <TextInput placeholder="Enter your current location" />
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          <TextInput placeholder="Enter your drop location" />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TripDetails')} style={{marginTop: 20, marginBottom:10, backgroundColor: Gold, borderRadius: 20, padding: 10, width: '45%', flexDirection: 'row', gap:5 }}>
        <Ionicons name="location" size={20} color="purple" />
           <Text style={{fontWeight: '700', color:DarkGray}}>
             Select on map
            </Text>
      </TouchableOpacity>
      <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
});
