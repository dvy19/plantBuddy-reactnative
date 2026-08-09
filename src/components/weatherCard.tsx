import {useState , useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { WeatherResponse } from '../models/weatherModels';
import { WeatherState } from '../models/weatherModels';
import WeatherService from '../services/WeatherService'
import { ScrollView } from 'react-native';

const weatherCard=()=>{

    const [weatherState, setWeatherState] = useState<WeatherState>({
    status: "idle",
        });

    

    const getWeather=async()=>{

        setWeatherState({status:"loading"})

        try{

            const data=await WeatherService.getWeather(
                "Delhi"
            )

            setWeatherState({
                status:"success",
                data:data
            })

        }
        catch(err){
            setWeatherState({status:"error" , message:`${err} and unable to load the weather`})
        }

    }


    useEffect(() => {
        getWeather();
    }, []);
return (
  <View style={styles.card}>
    {/* Loading State */}
    
    <ScrollView
      contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Hides scrollbar for cleaner look
        nestedScrollEnabled={true}           // Important for Android inside another ScrollView
    
    >

      {weatherState.status === 'loading' && (
      <View style={styles.card}>
        <Text >Loading weather...</Text>
      </View>
    )}

    {/* Error State */}
    {weatherState.status === 'error' && (
      <View style={styles.card}>
        <Text>
          {weatherState.message || 'Failed to load weather data.'}
        </Text>
      </View>
    )}

    {/* Success State */}
    {weatherState.status === 'success' && weatherState.data && (
      <>
        <View style={styles.headerRow}>
          <View style={styles.locationBadge}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{weatherState.data.name}</Text>
          </View>
          <Text style={styles.plantTipTag}>Good for Outdoor Watering</Text>
        </View>

        <View style={styles.mainWeatherRow}>
          <View>
            <Text style={styles.temperature}>{weatherState.data.main.temp}°C</Text>
            <Text style={styles.condition}>{weatherState.data.name}</Text>
          </View>
          <Text style={styles.weatherIcon}>⛅</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricValue}>{weatherState.data.main.humidity}%</Text>
            <Text style={styles.metricLabel}>Humidity</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>💨</Text>
            <Text style={styles.metricValue}>{weatherState.data.wind.speed} km/h</Text>
            <Text style={styles.metricLabel}>Wind Speed</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🌅</Text>
            <Text style={styles.metricValue}>{weatherState.data.sys.sunrise}</Text>
            <Text style={styles.metricLabel}>Sunrise</Text>
          </View>
        </View>
      </>
    )}


    </ScrollView>
  </View>
);
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B4D3E', // Deep Forest Green
    borderRadius: 24,
    padding: 20,
    height:200,
    marginVertical: 12,
    // Soft shadow for depth
    shadowColor: '#1B4D3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  scrollContent: {
    flexGrow: 1,                 // Allows content to fill card height when small
    paddingBottom: 8,            // Prevents bottom content clipping when scrolling
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  locationIcon: {
    fontSize: 8,
    marginRight: 4,
  },
  locationText: {
    color: '#E8F3E8',
    fontSize: 8,
    fontWeight: '600',
  },
  plantTipTag: {
    fontSize: 10,
    color: '#A2E0B8', // Sage highlight
    fontWeight: '600',
  },
  mainWeatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  condition: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A2E0B8',
    marginTop: 2,
  },
  weatherIcon: {
    fontSize: 48,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  metricIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    color: '#B3D8C3',
    fontWeight: '500',
  },
});

export default weatherCard;


