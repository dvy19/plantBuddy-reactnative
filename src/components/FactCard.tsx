import { FactState } from '@/models/MiscModels';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import miscService from '../services/miscServices'

const FactCard=()=>{

    const[factState,setFactState] = useState<FactState>({
        status:"Idle"
    })

    const getFact=async()=>{

        try{
            const data=await miscService.getFactOfTheDay();

            setFactState({
                status:"Success",
                data:data
            })

            console.log(data)

            return data;
        }
        catch(err){

            setFactState({
                status:"Error",
                message:`${err}`
            })
        }
    }

    
    useEffect(() => {
        getFact();
    }, []);


    return(

       <View style={styles.card}>

    {factState.status === 'Loading' && (
        <View style={styles.card}>
            <Text>Loading weather...</Text>
        </View>
    )}

    {factState.status === "Error" && (
        <View style={styles.card}>
            <Text>Error...</Text>
        </View>
    )}

    {factState.status === "Success" && (
        <View style={styles.headerRow}>

            <View style={styles.badge}>
                <Text style={styles.badgeIcon}>💡</Text>
                <Text style={styles.badgeText}>
                    FACT OF THE DAY
                </Text>
            </View>

            <View style={styles.factContent}>

                <Text style={styles.quoteMark}>“</Text>

                <Text style={styles.factText}>
                    {factState.data.title}
                </Text>

                {factState.data.category && (
                    <View style={styles.categoryTag}>
                        <Text style={styles.categoryText}>
                            {factState.data.category}
                        </Text>
                    </View>
                )}

            </View>

        </View>
    )}

</View>

    )


};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3F8F4', // Light sage container
    borderWidth: 1,
    borderColor: '#D2E7D6',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    // Subtle shadow
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems:'flex-start',
    backgroundColor: '#E1EFE3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  refreshButton: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 14,
  },
  centerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#607260',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    marginTop: 6,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  factContent: {
    position: 'relative',
    marginTop: 4,
  },
  quoteMark: {
    fontSize: 32,
    color: '#2E7D32',
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: -8,
    opacity: 0.5,
  },
  factText: {
    fontSize: 24,
    color: '#1B2E1B',
    lineHeight: 22,
    fontWeight: '700',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
});

export default FactCard;