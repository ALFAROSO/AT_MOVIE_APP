import { ScrollView, Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Box } from "@gluestack-ui/themed";
import SearchForm from "../forms/SearchForm";
import Card from "../listItems/Card";

const SearchCont = ({ activetab }) => {

  const [resultPrograms, setResultPrograms] = useState([]);
  const [pageToSearch, setPageToSearch] = useState([]);

  return (
    <View>
      <Box>
        <SearchForm
          options={["movie", "multi", "tv"]}
          isActive={activetab ==="Search Results"}
          setResultPrograms={setResultPrograms}
          setPageToSearch={setPageToSearch}
        />
      </Box>
      <Box style={styles.scrollView}>
        {resultPrograms.length > 0 ? (
          <ScrollView>
            <Card movies={resultPrograms} page ={pageToSearch}/>
          </ScrollView>
        ) : (
          <Text style={styles.instructionText}>Please initiate a search</Text>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 500,
  },
  instructionText: {
    fontSize: 30,
    marginTop: 100,
    textAlign: "center",
    color: "#494949",
    fontWeight: "bold",
  },
});

export default SearchCont;
