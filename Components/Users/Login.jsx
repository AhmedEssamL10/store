import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import { login } from "../../db/auth/auth";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/loginn.png")}
      resizeMode="cover"
      style={styles.heder}
    >
      <StatusBar style="auto" />
      <View
        style={{
          marginTop: "60%",
          backgroundColor: "white",
          borderRadius: 30,
          height: "40%",
          padding: 5,
          margin: 10,
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
            //fontFamily: "bold",
          }}
        >
          {" "}
          Login
        </Text>
        <View
          style={{
            padding: 10,
            borderRadius: 20,
            height: 60,
          }}
        >
          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="email-address"
            style={{
              flex: 2,
              borderColor: "black",
              borderWidth: 1,
              height: 90,
              // margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          />
        </View>

        <View
          style={{
            padding: 10,
            borderRadius: 20,
            height: 60,
          }}
        >
          <TextInput
            onChangeText={setpassword}
            keyboardType="visible-password"
            placeholder="password"
            secureTextEntry={true}
            style={{
              flex: 2,
              borderColor: "black",
              borderWidth: 1,
              height: 90,
              padding: 10,
            }}
          />
          <View
            style={{
              width: 150,
              padding: 10,
              marginLeft: "50%",
            }}
          >
            <Button
              title="Login"
              color="#000"
              onPress={() => {
                login(email, password)
                  .then()
                  .catch((e) => setError(e.message));
              }}
            />
            <Text>{error}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ paddingTop: 5 }}> Create an account </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ paddingTop: 15 }}> Create an account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  heder: {
    height: "100%",
    width: "100%",
  },
  inpp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  texttinput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
