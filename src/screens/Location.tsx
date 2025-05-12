// Location.tsx
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Black, Gold, White } from '../constants/Color';
import { useAuthStore } from '../store/authStore';
import PlacesSearch from '../test/PlaceSearch'; // Import the updated PlacesSearch component

interface Suggestion {
  description: string;
  place_id: string;
}

export default function Location() {
  const navigation: any = useNavigation();
  const setPickupLocation = useAuthStore((state) => state.setPickupLocation);
  const setDestinationLocation = useAuthStore((state) => state.setDestinationLocation);

  const [pickupSelected, setPickupSelected] = useState(false);
  const [dropSelected, setDropSelected] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeType, setActiveType] = useState<'pickup' | 'drop' | null>(null);

  const placesSearchRef = useRef<any>(null); // Create a ref for PlacesSearch component

  const handleSelect = (coords: { lat: number; lng: number }, description: string) => {
    if (activeType === 'pickup') {
      setPickupLocation({ lat: coords.lat, lng: coords.lng, description });
      setPickupSelected(true);
      setActiveType(null);
    } else if (activeType === 'drop') {
      if (!pickupSelected) {
        Alert.alert('Please select your pickup location first');
        return;
      }
      setDestinationLocation({ lat: coords.lat, lng: coords.lng, description });
      setDropSelected(true);
      setActiveType(null);
    }
    setSuggestions([]);
  };

  // Navigate when both locations are selected
  if (pickupSelected && dropSelected) {
    setTimeout(() => navigation.navigate('TripDetails'), 100);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={20} color={Gold} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Select Locations</Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <View style={styles.iconColumn}>
          <Ionicons name="location" size={20} color="green" />
          <Ionicons name="location" size={20} color="red" />
        </View>

        <View style={{ gap: 15, width: '90%' }}>
          {/* Pickup Location */}
          <PlacesSearch
            ref={placesSearchRef} // Pass ref to PlacesSearch
            placeholder="Pickup location"
            onPlaceSelected={handleSelect}
            setSuggestions={setSuggestions}
            setActive={() => setActiveType('pickup')}
          />

          {/* Drop Location */}
          <PlacesSearch
            ref={placesSearchRef} // Pass ref to PlacesSearch
            placeholder="Drop location"
            onPlaceSelected={handleSelect}
            setSuggestions={setSuggestions}
            setActive={() => setActiveType('drop')}
          />
        </View>
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  // Now directly call `fetchPlaceDetails` via the ref
                  placesSearchRef.current.fetchPlaceDetails(item.place_id, item.description)
                }>
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Black,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: Gold,
    fontSize: 18,
    paddingLeft: 10,
  },
  inputContainer: {
    borderColor: Gold,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 20,
  },
  iconColumn: {
    gap: 20,
  },
  suggestionBox: {
    marginTop: 10,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
  },
  suggestionText: {
    color: White,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});

