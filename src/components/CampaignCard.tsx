import { NgoService } from '@/services/NgoService';
import { Campaign } from '../models/Ngo';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';

const CampaignCard = () => {

    const[campaign,setCampaign]=useState<Campaign>()
    const[loading,setLoading]=useState(false);


    const getCampaign=async(is_active:boolean)=>{

        try{
            const data=await NgoService.getOwnActiveCamp(true)

            setCampaign(data.data[0])

            console.log(data.data)
        }
        catch(err){
            console.log(`campaign error as ${err}`)
        }
    }

    useEffect(()=>{
        getCampaign(true)
    },[])


  return (
    <View style={styles.cardContainer}>
      {/* Header section with Logo & Active Status Tag */}
      <View style={styles.header}>
        <Image
          source={{ uri: campaign?.logo ?? undefined }}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.activeTag}>
          <View style={styles.activeDot} />
          <Text style={styles.activeText}>Active</Text>
        </View>
      </View>

      {/* Main Campaign Title */}
      <Text style={styles.title} numberOfLines={2}>
        {campaign?.description}
      </Text>

      {/* Campaign Details Section */}
      <View style={styles.detailsContainer}>
        {/* Date Info */}
        <View style={styles.row}>
          <Text style={styles.label}>Dates:</Text>
          <Text style={styles.value}>{`${campaign?.start_date} - ${campaign?.end_date}`}</Text>
        </View>

        {/* Location Info */}
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{campaign?.location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Elevation for Android
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAEAEA',
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E8E3E',
    marginRight: 6,
  },
  activeText: {
    color: '#1E8E3E',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    lineHeight: 24,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#707070',
    width: 70,
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
  },
});

export default CampaignCard;