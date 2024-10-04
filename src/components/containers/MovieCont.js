import { Box, View, Text, ScrollView } from '@gluestack-ui/themed';
import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import SelectForm from '../forms/SelectForm';
import Card from '../listItems/Card';

const MoviesCont =({ activetab }) => {

  const [movies, setMovies] = useState([]);

  return (
    <View>
      <Box>
        <SelectForm
          options={["now_playing", "popular", "top_rated", "upcoming"]}
          setMovies={setMovies}
          isActive={activetab ==="Movies"}
          page={"movie"}
        />
      </Box>
      <Box style={styles.scrollView}>
        {movies.length > 0 ? (
          <ScrollView>
            <Card movies={movies} page={"movie"}/>
          </ScrollView>
        ) : (
          <Text>No movies available</Text>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {paddingBottom: 170},
});

export default MoviesCont;
