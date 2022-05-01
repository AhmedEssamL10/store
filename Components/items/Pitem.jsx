import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,Image } from "react-native";
import { editCity } from "../../db/cities/cities";
import { getAuth } from "firebase/auth";
import imm from "../../assets/shopping-cart.png"
import { useState ,useEffect } from "react";
import {
  addCity,
  addCart,
} from "../../db/cities/cities";
export default function Pitem({ navigation ,item }) {
    const [productsCart, setProductsCart] = useState([]);  
    
    const auth = getAuth();
    const userr = auth.currentUser;

    if (userr !== null) {
      const email = userr.email;
      console.log("ssssssssss",email);
  return (
    <View style={styles.content} >
          <TouchableOpacity onPress={() =>navigation.navigate('product',{item:item})} >
            <Image style = {{height:150,width:150, margin:10}} source={{uri:item.image}}></Image>
            <Text style={{color:"#D9D9D9"}}> {item.name} </Text>
            <Text style={{color:"#D9D9D9"}}>$ {item.price}</Text>
          </TouchableOpacity>

          <Button
          title="Add to char"
          onPress={() =>
            addCart({ username:email, name: item.name , size:item.size ,type:item.type ,image:item.image ,price:item.price || "new city" + item.length })
          }
        />
        </View>
  );
        }
}

const styles = StyleSheet.create({
  content: {
    
        height:200,
        width:200,
        backgroundColor:'#161F30',
        margin:10,
        
  },
});
