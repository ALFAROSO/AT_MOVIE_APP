import { VStack, Heading, Image, Text, HStack, ScrollView, Center, Spinner, Box} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { fetchSingleData } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import PropTypes from "prop-types";

const ShowScreen = () => {

  const route = useRoute();
  const { id, page } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const result = await fetchSingleData(page, id);
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingle();
  }, [id, page]);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1}>
        <Text>Error: Something went wrong {error.message}</Text>
      </Center>
    );
  }

  const { title, poster_path, overview, popularity, release_date, name } = data;

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <VStack space={4} p={4} alignItems="center" paddingBottom={100}>
          <Heading
            textAlign="center"
            mb={2}
            paddingTop={40}
            paddingBottom={50}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {title? title : name}
          </Heading>
          <Image
            size="2xl"
            borderRadius="$md"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
            alt="Movie Poster Image"
            mb={40}
          />
          <Box px={4}>
            <Text mb={4} size="sm" textAlign="center">
              {overview}
            </Text>
          </Box>
          <HStack space={2} justifyContent="center" paddingTop={30}>
            <Text size="sm">Popularity: {popularity}</Text>
            <Text size="sm"> | </Text>
            <Text size="sm">Release Date: {release_date}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

ShowScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      page: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowScreen;
