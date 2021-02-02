import React from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import { Colors } from "../../theme";
import Block from "../block/block.comp";

export interface IArModalProps {
  backgroundless?: any,
  children?: any,
  visible?: any
}

const ArModal: React.FC<IArModalProps> = ({
  backgroundless,
  children,
  visible
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => { Alert.alert("Modal has been closed."); }}
    >
      <Block flex middle style={{ backgroundColor: Colors.MODAL }}>
        <Block center middle style={!backgroundless && styles.modalView}>
          {children}
        </Block>
      </Block>
    </Modal>
  );
}

export default ArModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: Colors.TRANSPARENT,
    padding: 10,
    elevation: 2
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 20,
    elevation: 2
  },
  horizontalImage: {
    height: 120,
    width: 'auto'
  }
});