import plantService from "../../services/plantService";
import { useEffect, useState } from "react";
import { PlantDetailUiState } from "../../models/PlantResponse";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { SinglePlantResponse } from "../../models/PlantResponse";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
function PlantDetailScreen(){

    const [plant, setPlant] = useState<SinglePlantResponse | null>(null);

    // id as an object
    //const { id } = useLocalSearchParams<{ id: string }>();

    const params=useLocalSearchParams()
    const id=params.id

    const [uiState, setUiState] = useState<PlantDetailUiState>({
    status: "idle"
        });

const loadDetails = async (id: number) => {

    setUiState({ status: "loading" });

    try {

        const res = await plantService.getSinglePlant(id);

        setPlant(res);

        setUiState({
            status: "success"
        });

    } catch (err) {

        setUiState({
            status: "error",
            message: `${err}`
        });

    }
};

useEffect(() => {

    if (id) {
        loadDetails(Number(id));
    }

}, [id]);


    return(
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D2E11" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header with Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: plant?.data.image_url }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Top Bar Floating Buttons */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.circleIconButton}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color="#1F2937" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleIconButton} activeOpacity={0.8}>
              <Ionicons name="heart-outline" size={22} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Sheet Overlapping Header */}
        <View style={styles.contentSheet}>
          {/* Category Tag */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
                {plant?.data.category.name}
            </Text>
          </View>

          {/* Plant Name & Scientific Name */}
          <Text style={styles.plantName}>{plant?.data.name}</Text>
          <Text style={styles.scientificName}>{plant?.data.scientific_name}</Text>

          {/* Feature Badges Row */}
          <View style={styles.badgeRow}>
            {plant?.data.pet_friendly&& (
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Ionicons name="paw-outline" size={14} color="#2E7D32" />
                <Text style={styles.badgeSuccessText}>Pet Friendly</Text>
              </View>
            )}
            {plant?.data.air_purifying && (
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Ionicons name="leaf-outline" size={14} color="#2E7D32" />
                <Text style={styles.badgeSuccessText}>Air Purifying</Text>
              </View>
            )}
            {plant?.data.edible && (
              <View style={[styles.badge, styles.badgeWarning]}>
                <MaterialCommunityIcons name="food-apple-outline" size={14} color="#D97706" />
                <Text style={styles.badgeWarningText}>Edible</Text>
              </View>
            )}
            {plant?.data.pruning_required && (
              <View style={[styles.badge, styles.badgeNeutral]}>
                <Ionicons name="cut-outline" size={14} color="#4B5563" />
                <Text style={styles.badgeNeutralText}>Pruning Needed</Text>
              </View>
            )}
          </View>

          {/* Key Metrics Grid (2x2) */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricIconBg}>
                <Ionicons name="sunny-outline" size={22} color="#D97706" />
              </View>
              <Text style={styles.metricLabel}>Light</Text>
              <Text style={styles.metricValue} numberOfLines={1}>
                {plant?.data.light_requirement.name}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIconBg}>
                <Ionicons name="water-outline" size={22} color="#0284C7" />
              </View>
              <Text style={styles.metricLabel}>Water</Text>
              <Text style={styles.metricValue} numberOfLines={1}>
                {plant?.data.water_requirement.name}

                  </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIconBg}>
                <Ionicons name="thermometer-outline" size={22} color="#DC2626" />
              </View>
              <Text style={styles.metricLabel}>Temperature</Text>
              <Text style={styles.metricValue}>
                {plant?.data.temperature_min}° - {plant?.data.temperature_max}°C
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIconBg}>
                <Ionicons name="cloud-outline" size={22} color="#059669" />
              </View>
              <Text style={styles.metricLabel}>Humidity</Text>
              <Text style={styles.metricValue}>{plant?.data.humidity}</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{plant?.data.description}</Text>
          </View>

          {/* Care & Maintenance Card */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Care & Maintenance</Text>
            <View style={styles.infoCard}>
              <InfoRow
                icon="flower-outline"
                label="Soil Type"
                value={plant?.data.soil_type.name} 
              />
              <View style={styles.divider} />
              <InfoRow
                icon="nutrition-outline"
                label="Fertilizer"
                value={plant?.data.fertilizer}
              />
              <View style={styles.divider} />
              <InfoRow
                icon="refresh-outline"
                label="Repotting"
                value={plant?.data.repotting_frequency}
              />
              <View style={styles.divider} />
            </View>
          </View>

          {/* Growth & Seasons Card */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Growth Profile</Text>
            <View style={styles.infoCard}>
              <InfoRow
                icon="trending-up-outline"
                label="Growth Rate"
                value={plant?.data.growth_rate.name}
              />
              <View style={styles.divider} />
              <InfoRow
                icon="resize-outline"
                label="Average Height"
                value={plant?.data.average_height}
              />
              <View style={styles.divider} />
              <InfoRow
                icon="calendar-outline"
                label="Best Planting Season"
                value={plant?.data.best_planting_season.name}
              />
              {plant?.data.flowering_season && (
                <>
                  <View style={styles.divider} />
                  <InfoRow
                    icon="rose-outline"
                    label="Flowering Season"
                    value={plant?.data.flowering_season.name}
                  />
                </>
              )}
              {plant?.data.fruiting_season && (
                <>
                  <View style={styles.divider} />
                  <InfoRow
                    icon="basket-outline"
                    label="Fruiting Season"
                    value={plant?.data.fruiting_season.name}
                  />
                </>
              )}
              <View style={styles.divider} />
              <InfoRow
                icon="time-outline"
                label="Lifespan"
                value={plant?.data.lifespan.name}
              />
            </View>
          </View>

          
        </View>

       <View style={styles.faqContainer}>
      <View style={styles.faqQuestionBlock}>
        <Text style={styles.faqQuestion}>Give me 5 Facts about this plant.</Text>
      </View>

      <View style={styles.faqQuestionBlock}>
        <Text style={styles.faqQuestion}>How to take care of this plant ?</Text>
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Detail Row Component
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | undefined;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <Ionicons name={icon} size={18} color="#2E7D32" style={styles.rowIcon} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  faqContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },

  faqQuestionBlock: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8F5E9",

    // Android elevation & iOS soft shadow
    elevation: 2,
    shadowColor: "#1B5E20",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1B5E20",
    lineHeight: 22,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroContainer: {
    height: 300,
    width: "100%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  topBar: {
    position: "absolute",
    top: Platform.OS === "android" ? 16 : 8,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  contentSheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
    letterSpacing: 0.6,
  },
  plantName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: -0.2,
  },
  scientificName: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#2E7D32",
    marginTop: 2,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeSuccess: {
    backgroundColor: "#E8F5E9",
  },
  badgeSuccessText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
  },
  badgeWarning: {
    backgroundColor: "#FEF3C7",
  },
  badgeWarningText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  badgeNeutral: {
    backgroundColor: "#F3F4F6",
  },
  badgeNeutralText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#F1F5F9",

    // Android elevation & iOS shadow
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metricIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",

    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    maxWidth: "50%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
});

export default PlantDetailScreen;