import { Icon, ChevronDownIcon, Select, SelectContent, SelectBackdrop, SelectIcon, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, SelectInput, SelectTrigger, View, SelectPortal} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { useSelectedValue } from "../../hooks/SelectedValue";
import { StyleSheet } from "react-native";
import { fetchData } from '../../services/api';

const SelectForm = ({ options, setMovies, page , isActive}) => {

  const { selectedValue, setSelectedValue} = useSelectedValue();
  
  useEffect(() => {
    if (selectedValue && isActive) {
      fetchMovies(selectedValue);
    }
  }, [selectedValue, isActive]);

  const fetchMovies = async (value) => {
    try {
      const movies = await fetchData(page, value);
      setMovies(movies);
    } catch (error) {
      console.error('Error fetching movies:', error); 
      alert(`Error: Something went wrong ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Select onValueChange={(value) => setSelectedValue(value)}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder={selectedValue.replace(/_/g, " ")} />
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
                  style={formattedValue === selectedValue ? styles.selectedOption : {}}
                >
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingRight: 100,
    paddingLeft: 100,
  },
  selectedOption: {
    color: "#ffffff",
    backgroundColor: "#0e7a6e",
  },
  selectContent: {
    color: "#ffffff",
    paddingBottom: 60,
  },
  colorWhite: {
    color: "#ffffff",
  },
});

export default SelectForm;
