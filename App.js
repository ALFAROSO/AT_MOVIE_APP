import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppStack from "./src/components/stacks/AppStack";

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AppStack />
        <StatusBar style="light" bg="#2c3e50"/>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
