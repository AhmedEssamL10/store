import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,FlatList } from "react-native";
import { useState ,useEffect } from "react";
import { ScrollView } from "react-native-web";
import {
  deleteCart,
    getCart,
    } from "../../db/cities/cities";
  import CartItem from "../items/CartItem";
  import { getAuth } from "firebase/auth";
  import { subscribeCart } from "../../db/cities/cities";
import { editUser,getUsers, subscribeUser } from "../../db/cities/users";

  export default function cart({ route,navigation }) {
    //const { itemId, otherParam } = route.params;
    const auth = getAuth();
    const userr = auth.currentUser;
    const [cart, setCart] = useState([]);
    const [users, setUsers] = useState([]);
    const [cashdata, setCashData] = useState([]);
    const [toggle, setToggle] = useState(true);
    const getCartsList = async () => {
        const c = await getCart();
        setCart(c);
        console.log("carts", c);
      };
      const getUsersList = async () => {
        const u = await getUsers();
        setUsers(u);
        console.log("users: ", u);
      };
      useEffect(() => {
        getCartsList();
        getUsersList();
      }, []);

      useEffect(() => {
        const unsubscribe = subscribeCart(({ change, snapshot }) => {
          if (change.type === "added") {
            getCartsList();
          
          }
          if (change.type === "modified") {
            getCartsList();
          }
          if (change.type === "removed") {
            getCartsList();
          }
        });
      
        return () => {
          unsubscribe();
        };
      }, []);
      

      useEffect(() => {
        const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
          if (change.type === "added") {
            getUsersList();
          
          }
          if (change.type === "modified") {
            getUsersList();
          }
          if (change.type === "removed") {
            getUsersList();
          }
        });
    
        return () => {
          unsubscribeUser();
        };
      }, []);

      const Cash = ()=>{
        let dataa = cart.filter((e)=>e.username == userr.email);
        const cartmoney = dataa.map((e)=>(e.price));

        let total = 0;
        for (let i = 0; i < cartmoney.length; i++) {
          total += parseInt(cartmoney[i]);
        }
        let user = users.filter((e)=>e.email == userr.email);
        
        
        let usermoney =0;
        usermoney = user[0].money;
        console.log("myuser: ", dataa)
        editUser({ ...user[0], money: parseInt(usermoney) - total,sold:dataa });
        
        for (let j = 0; j < dataa.length; j++) {
          deleteCart(dataa[j].id);
          
        }
        
      }

      
      if (userr !== null) {
        const email = userr.email;
        let dataa = cart.filter((e)=>e.username == email);
        let m =true;
        if(toggle){
          setCashData(dataa);
          setToggle(false);
        }
        
    return (
    <View> 
        <Text>heloll</Text> 
        <FlatList 
        data={dataa}
        keyExtractor={cart.id}
        renderItem={({item})=>(
          <CartItem navigation={navigation} item = {item} />
          )}
      />
      <Button title="cash" onPress={()=>Cash()}/>
    </View>
    );}
}

const styles = StyleSheet.create({
    content: {
        height:200,
        width:200 ,
        backgroundColor:'red',
        margin:10,
        
    },
});
