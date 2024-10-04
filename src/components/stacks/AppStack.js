import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SelectedValueProvider } from "../../hooks/SelectedValue";
import NavCont from "../containers/NavCont";
import ShowScreen from "../screens/ShowScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {

  return (
    <SelectedValueProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={NavCont}
            options={{
              title: "Movies App",
              headerTitleStyle: {
                color: "#ffffff",
              },
              headerStyle: {
                backgroundColor: "#2c3e50",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Show"
            component={ShowScreen}
            options={({ route }) => ({
              title: route.params?.title || route.params?.name || "show",
              headerBackTitle: "Back to List",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SelectedValueProvider>
  );
};

export default AppStack;
