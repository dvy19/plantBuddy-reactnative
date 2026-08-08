import { FactState } from '@/models/MiscModels';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

import storageService from '../services/storageService';
import miscService from '../services/miscServices'

import { SavedFact } from '../models/Fact';
import { saveFact } from '../database/factDao';

const FactCard=()=>{

    const[factState,setFactState] = useState<FactState>({
        status:"Idle"
    });

    const[showDetails,setShowDetails]=useState(false);

    const clearFact = async () => {
    await storageService.removeFact();
    console.log("Fact removed");
};

    const getFact=async()=>{

        try {

            const today = new Date().toISOString().split("T")[0];

            //console.log("Today:", today);

            const savedFact = await storageService.getFact();

            //console.log("Saved fact:", savedFact);

            if (savedFact && savedFact.date === today) {

                //console.log("Using today's saved fact");

                setFactState({
                    status: "Success",
                    data: savedFact
                });

                return;
            }

           // console.log("No fact for today. Calling API...");

            const data = await miscService.getFactOfTheDay();

            //console.log("API fact:", data);

            const factToSave = {
                date: today,
                title: data.title,
                fact: data.fact,
                category: data.category
            };

            await storageService.saveFact(factToSave);

            //console.log("Fact saved locally:", factToSave);

            setFactState({
                status: "Success",
                data: factToSave
            });
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

        <>
        
    <Pressable onPress={() => setShowDetails(true)}>
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

                <>
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

                
            <Modal
                visible={showDetails}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDetails(false)}
            >
                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        {/* Header */}
                        <View style={styles.modalHeader}>

                            <Text style={styles.modalTitle}>
                                {factState.data.title}
                            </Text>

                            <Pressable
                                onPress={() => setShowDetails(false)}
                            >
                                <Text style={styles.closeButton}>
                                    ✕
                                </Text>
                            </Pressable>

                        </View>

                        {/* Category */}
                        <Text style={styles.label}>
                            Category
                        </Text>

                        <Text style={styles.category}>
                            {factState.data.category}
                        </Text>

                        {/* Date */}
                        <Text style={styles.label}>
                            Date
                        </Text>


                        {/* Fact */}
                        <Text style={styles.label}>
                            Description
                        </Text>

                        <Text style={styles.description}>
                            {factState.data.fact}
                        </Text>

                        {/* Save button */}
                        <Pressable
                            style={styles.saveButton}
                            onPress={() => { if (factState.status === "Success") {
                                saveFact({
                                    title: factState.data.title,
                                    fact: factState.data.fact,
                                    category: factState.data.category,
                                    date: ""
                                });
        }
    }}
                        >
                            <Text style={styles.saveIcon}>
                                🔖
                            </Text>

                            <Text style={styles.saveText}>
                                Save Fact
                            </Text>
                        </Pressable>

                    </View>

                </View>
            </Modal>

</>
                
            )}

        </View>

</Pressable>

        </>


            

    )


};

const styles = StyleSheet.create({

    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
},

modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
},

modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
},

modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
},

closeButton: {
    fontSize: 22,
    marginLeft: 10,
},

label: {
    fontSize: 13,
    color: "gray",
    marginTop: 12,
    marginBottom: 4,
},

category: {
    fontSize: 15,
    fontWeight: "600",
},

date: {
    fontSize: 14,
    color: "gray",
},

description: {
    fontSize: 16,
    lineHeight: 24,
},

saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#2E7D32",
},

saveIcon: {
    fontSize: 18,
    marginRight: 8,
},

saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
},
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