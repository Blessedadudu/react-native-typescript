import React from "react";
import { View, Text, Image } from "react-native";

export default function About(props: {
  route: {
    params: {
      name: any;
      image: any;
      price: any;
      reviews: any;
      rating: any;
      categories: any;
    };
  };
}) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories
    .map((cat: { title: string }) => cat.title)
    .join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = (props: { image: string }) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props: { name: string }) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props: { description: string }) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.description}
  </Text>
);
