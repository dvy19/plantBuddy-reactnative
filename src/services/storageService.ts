import AsyncStorage from "@react-native-async-storage/async-storage";


// defining the key for the async storage
// value will be the fact object

// fact_of_the_day : {...}
const FACT_KEY = "fact_of_the_day";


// an object
const storageService = {

    saveFact: async (fact: object) => {
        try {
            await AsyncStorage.setItem(
                FACT_KEY,
                JSON.stringify(fact)
            );
        } catch (error) {
            console.log("Error saving fact:", error);
        }
    },

    getFact: async () => {
        try {
            const data = await AsyncStorage.getItem(FACT_KEY);

            if (data === null) {
                return null;
            }

            return JSON.parse(data);

        } catch (error) {
            console.log("Error getting fact:", error);
            return null;
        }
    },

    removeFact: async () => {
        await AsyncStorage.removeItem(FACT_KEY);
    }
};

export default storageService;