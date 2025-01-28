import { pass } from "@/node_modules copy/@types/three/src/Three.TSL";
import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";


const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);

    const handleLogin = () => {
        if (username === '' || password === '') {

            Alert.alert('Error', 'Var vänlig fyll i username och password');
            /* console.log("det är tomt");
            alert("tomt") */
            setVisible2(true);

        } else {

            Alert.alert('Inloggad', `Välkommen, ${username}!`);
            console.log("inloggad: ", username);
           /*  alert("test")*/
            setVisible(true); 

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Logga in</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                
            />

            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
                Logga in
            </Button>

            <Snackbar style={styles.snackbar}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={Snackbar.DURATION_SHORT}>
                    Välkommen, {username}!

            </Snackbar>

            <Snackbar style={styles.input}
                visible={visible2}
                onDismiss={() => setVisible2(false)}
                duration={Snackbar.DURATION_SHORT}>
                     Måste ange användarnamn och lösenord

            </Snackbar>

            
        </View>
    )

    

}

export default LoginPage;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 10,
    },
    loginButton: {
      marginTop: 20,
      width: '100%',
      padding: 10,
    },
    snackbar: {

        backgroundColor: 'white'
    }
  });