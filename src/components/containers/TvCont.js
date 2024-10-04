import { Box, View, Text, ScrollView } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import SelectForm from "../forms/SelectForm";
import Card from "../listItems/Card";

const TvCont = ({ activetab }) => {

  const [tvShows, SetTvShow] = useState([]);

  return (
    <View>
      <Box>
        <SelectForm
          options={["airing_today", "on_the_air", "popular", "top_rated"]}
          setMovies={SetTvShow}
          isActive={activetab ==="Tv Show"}
          page={"tv"}
        />
      </Box>
      <Box style={styles.scrollView}>
        {tvShows.length > 0 ? (
          <ScrollView>
            <Card movies={tvShows} page={"tv"} />
          </ScrollView>
        ) : (
          <Text>No tvShows available</Text>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {paddingBottom: 170},
});

export default TvCont;
