import { ButtonIcon, FormControlHelper, ButtonText, HStack, FormControlHelperText, Icon, InputField, SearchIcon, InputSlot, Select, SelectDragIndicator, SelectBackdrop, SelectInput, SelectIcon, SelectPortal, SelectTrigger, SelectItem} from "@gluestack-ui/themed";
import { FormControl, FormControlLabel, FormControlLabelText, Input, InputIcon, View, Button} from "@gluestack-ui/themed";
import { SelectDragIndicatorWrapper } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import { fetchSearchData } from "../../services/api";
import { SelectContent } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useState } from "react";

const SearchForm = ({ options, setResultPrograms, setPageToSearch }) => {

  const [searchType, setSearchType] = useState("multi");
  const [toSearch, setToSearch] = useState("");

  const fetchSearch = async (searchType, toSearch) => {
    try {
      const movies = await fetchSearchData(searchType, toSearch);
      setResultPrograms(movies);
      setPageToSearch(searchType);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert(`Error: Something went wrong ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <FormControl isRequired={true}>
        <FormControlLabel>
          <FormControlLabelText>Search Movie/TV Show Name</FormControlLabelText>
        </FormControlLabel>
        <Input style={styles.input} bg="#e4e4e6">
          <InputSlot>
            <InputIcon as={SearchIcon} size="sm" />
          </InputSlot>
          <InputField
            onChangeText={(value) => setToSearch(value)}
            placeholder="i.e. James Bond, CSI"
            placeholderTextColor="#c6c5c7"
          />
        </Input>
      </FormControl>
      <HStack style={styles.hStack}>
        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Choose Search Type</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={(value) => setSearchType(value)}>
            <SelectTrigger variant="outline" size="md" style={styles.input}>
              <SelectInput placeholder={searchType.replace(/_/g, " ")} />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent style={styles.selectContent}>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {options.map((option, index) => {
                  const formattedValue = option.replace(/_/g, " ");
                  return (
                    <SelectItem
                      label={formattedValue}
                      key={index}
                      value={option}
                      style={
                        formattedValue === searchType
                          ? styles.selectedOption
                          : {}
                      }
                    >
                      {formattedValue}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlHelper>
            <FormControlHelperText>
              Please select a search type
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>
        <Button
          style={styles.button}
          onPress={() => fetchSearch(searchType, toSearch)}
        >
          <ButtonIcon as={SearchIcon} size="sm" />
          <ButtonText paddingStart={10}>Search</ButtonText>
        </Button>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingRight: 30,
    paddingLeft: 30,
  },
  input: {
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  hStack: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#01b6d4",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  selectedOption: {
    color: "#ffffff",
    backgroundColor: "#0e7a6e",
  },
  selectContent: {
    color: "#ffffff",
    paddingBottom: 60,
    width: "100%",
  },
});

export default SearchForm;
