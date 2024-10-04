import { HStack, Heading, Image, Text, VStack } from "@gluestack-ui/themed";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import React from "react";

const Card = ({ movies, page }) => {

  const navigation = useNavigation();

  const handlePress = (movie) => {
    if (page === "multi"){
      page = movie.media_type;
    }
    navigation.navigate("Show", {
      id: movie.id,
      title: movie.title,
      page: page,
      name: movie.name,
    });
  };

  return (
    <VStack style={styles.container}>
      {movies.map((movie, index) => (
        <HStack key={index} style={styles.card}>
          <Image
            size="lg"
            borderRadius="$none"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            alt="Movie Poster Image"
            style={styles.image}
          />
          <VStack style={styles.textContainer}>
            <Heading size="sm" style={styles.title}>
              {movie.title ? movie.title : movie.name}
            </Heading>
            <Text size="sm" style={styles.text}>
              Popularity: {movie.popularity}
            </Text>
            <Text size="sm" style={styles.text}>
              Release Date: {movie.release_date}
            </Text>
            <Button
              variant="solid"
              bg="#06b6d4"
              onPress={() => handlePress(movie)}
              style={styles.button}
            >
              <ButtonText>More Details</ButtonText>
            </Button>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    height: 150,
    width: 100,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  button: {
    alignSelf: "flex-start",
  },
  text: {
    marginBottom: 5,
  },
});

export default Card;
