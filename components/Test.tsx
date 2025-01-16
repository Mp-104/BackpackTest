import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export function Test() {
    return <SafeAreaProvider>
    <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
      <View style={{backgroundColor: 'blue', flex: 0.2}} />
      <View style={{backgroundColor: 'red', flex: 0.4}} />
      <Text>Hello World!</Text>
    </SafeAreaView>
  </SafeAreaProvider>
}