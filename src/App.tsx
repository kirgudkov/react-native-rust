import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {multiply} from 'react-native-rust-module';

function App(): React.JSX.Element {
  const [result, setResult] = React.useState<number | null>(null);

  React.useEffect(() => {
    multiply(2, 3).then(setResult);
  }, []);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text>{result}</Text>
    </View>
  );
}

export default App;
