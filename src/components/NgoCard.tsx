import { NgoDetailsData } from "../models/Ngo";
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import { useRouter } from 'expo-router';

interface NgoCardProps {
  ngo: NgoDetailsData;
}

const { width } = Dimensions.get("window");

const NgoCard = ({ ngo }: NgoCardProps) =>{

   const router = useRouter();

   /*
    const handlePress = () => {
        router.push(`/ngoDetail/${ngo.id}`);
    };
    */

  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true} // Enables smooth internal scrolling on Android inside parent ScrollViews
        scrollEnabled={true}
      >
        {/* ngo Image Header */}
        <View style={styles.imageWrapper}>
          {imageLoading && !imageError && (
            <View >
              <ActivityIndicator size="small" color="#2E7D32" />
            </View>
          )}

          <Image
            source={
              imageError || !ngo.logo
                ? { uri: 'https://via.placeholder.com/300x200?text=No+ngo+Image' }
                : { uri: ngo.logo }
            }
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />

          

          {/* ngo Type Badge */}
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{ngo.city}</Text>
          </View>
        </View>

        {/* ngo Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.ngoName}>{ngo.name}</Text>
          
          {ngo.address && (
            <Text style={styles.scientificName}>{ngo.address}</Text>
          )}

        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 'auto', // Fixed height with scrollable content
    overflow: 'hidden', // Ensures scrolled content stays within rounded corners
    borderWidth: 1,
    width:"100%",
    
    borderColor: '#E1EFE3',
    // Soft shadow for depth
    shadowColor: '#1B4D3E',
    paddingBottom:4,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4, // Android elevation
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  imageWrapper: {
    position: 'relative',
    height: 110,
    width: '100%',
    backgroundColor: '#E8F3E8',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(27, 77, 62, 0.85)', // Deep green semi-transparent
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  typeBadgeText: {
    color: '#E8F3E8',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsContainer: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom:10
  },
  ngoName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1B2E1B',
    lineHeight: 20,
  },
  scientificName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#52796F',
    marginTop: 2,
    marginBottom: 6,
  }
});

export default NgoCard;