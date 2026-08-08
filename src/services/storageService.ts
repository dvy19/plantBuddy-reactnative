import AsyncStorage from "@react-native-async-storage/async-storage";

const FACT_KEY = "fact_of_the_day";

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