import { View, StyleSheet, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profpic.png")}
            style={styles.profileIcon}
          />
        </View>
        <View style={styles.drawerHeaderUserInfo}>
          <Text style={styles.username}>jhonedoe@gmail.com</Text>
        </View>
      </View>
      <View style={styles.drawerItemListStyles}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => alert("Link to help")}
          icon={() => <MaterialIcons name="logout" size={20} color="black" />}
          labelStyle={styles.logout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#186049",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  drawerHeaderAvatar: {
    marginLeft: 15,
  },
  drawerHeaderUserInfo: {
    marginLeft: 10,
  },
  profileContainer: {
    borderRadius: 50,
    height: heightPercentageToDP(9),
    width: heightPercentageToDP(9),
  },
  profileIcon: {
    borderRadius: 50,
    marginLeft: heightPercentageToDP(0.3),
    marginTop: heightPercentageToDP(0.1),
    height: heightPercentageToDP(8),
    width: heightPercentageToDP(8),
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  drawerItemListStyles: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#fff",
    height: 500,
  },
  logout: {
    fontSize: heightPercentageToDP(1.75),
    color: "black",
  },
});

export default CustomDrawerContent;
