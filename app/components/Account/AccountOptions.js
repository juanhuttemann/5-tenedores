import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from '../Modal'
import ChangeDisplayEmailForm from './ChangeDisplayEmailForm'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangePasswordForm from './ChangePasswordForm'

const AccountOptions = props => {
  const { userInfo, setReloadData, toastRef } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const menuOptions = [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("displayName");
      }
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("email");
      },
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("password");
      },
    }
  ];

  const selectedComponent = key => {
    switch (key) {
      case "displayName":
        setRenderComponent(
        <ChangeDisplayNameForm 
          displayName={userInfo.displayName} 
          setIsVisibleModal={setIsVisibleModal}
          setReloadData={setReloadData}
          toastRef={toastRef}
        />)
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeDisplayEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
        <ChangePasswordForm 
          setIsVisibleModal={setIsVisibleModal}
          toastRef={toastRef}
        />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  }

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}

      {renderComponent && (

        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} >
          {renderComponent}
      </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});

export default AccountOptions;
