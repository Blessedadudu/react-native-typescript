import React, { useState, useEffect } from "react";
import HeaderTabs from "../components/home/HeaderTab";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import BottomTabs from "../components/home/BottomTabs";
import RestaurantItems from "../components/home/RestaurantItems";
import { Text, SafeAreaView, View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import LottieView from "lottie-react-native";

export default function Home({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState("Delivery");
  const [city, setCity] = useState("san francisco");
  const [loading, setloading] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);

  const YELP_API_KEY =
    "4v0bntNDr3YqGuAp3ZZBmijEOnDv1q_PQ9BZGHNmzXnq5XElT22sIsgNb-LmcjMvSd7D-aLGHG279OM_ZlSuBw3SXXaMntYpg3JzY5LlhLiQEA7W2YLgF5BQLf_eYnYx";

  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    try {
      setloading(true);
      const res = await fetch(yelpUrl, apiOptions);
      let result = await res.json();
      result = result.businesses.filter((business: { transactions: string | string[]; }) =>
        business.transactions.includes(activeTab.toLowerCase())
      );

      setRestaurantData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  if (!restaurantData.length || loading)
    return (
      <View
        style={{
          backgroundColor: "black",
          position: "absolute",
          opacity: 0.6,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <LottieView
          style={{ height: 200 }}
          source={require("../assets/animations/scanner.json")}
          autoPlay
          speed={3}
        />
      </View>
    );

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
