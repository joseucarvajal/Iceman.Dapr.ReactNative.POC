import React from 'react';
import { Modal } from "react-native";
import { MediaViwer } from '../shared/components';

interface IModalProps {
  data?: any;
  visible?: any;
  onClose?: any;
}

const ImagePreviwer: React.FC<IModalProps> = ({
  data,
  visible,
  onClose
}) => {

  const close = (data: any) => onClose && onClose(data)

  return (
    <Modal animationType="fade" visible={visible}>
      <MediaViwer onClose={(data: any) => close(data)} data={data} />
    </Modal>
  );
}

export default ImagePreviwer;