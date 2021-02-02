import React, { useEffect } from "react";
import { Block } from "../../shared/components";
import { Colors, Sizes } from "../../shared/theme";
import { Icon, Text } from '../../shared/atomic/ions'
import Camera from '../../components/camera-modal.comp';
import Images from "../../constants/Images";

export interface IUploadMediaProps { }

const UploadMedia: React.FC<IUploadMediaProps> = ({ }) => {

  const [photo, setPhoto] = React.useState(Images.Player);
  const [modalVisible, setModalVisible] = React.useState(true);

  const setProfilePhoto = (params: any) => {
    params && setPhoto({ uri: params.uri })
    setModalVisible(false)
  }

  useEffect(() => {
    setModalVisible(true)
  }, []);

  return (
    <Block flex paddingTop={Sizes.BASE*3}>
      <Block center>
        <Icon family="Revy" name="revy_thumbsup" size={80} color={Colors.WHITE} />
      </Block>
      <Block center paddingTop={Sizes.BASE*2}>
        <Text h1 bold color={Colors.PRIMARY}>Congratulations !</Text>
      </Block>
      <Block center paddingTop={Sizes.BASE}>
        <Text h2 color={Colors.PRIMARY}>Video Uploaded</Text>
      </Block>
      <Block center paddingTop={Sizes.BASE*4}>
        <Text h3>Now our system is generating the timeline for your profile</Text>
      </Block>
      <Block center paddingTop={Sizes.BASE*2}>
        <Text h3>Soon as you get it, we let you know.</Text>
      </Block>
      <Block flex absolute style={{ bottom: 0, alignSelf: 'center', marginBottom: Sizes.BASE * 2 }}>
        <Icon family="Revy" name="revy_slogan" size={50} color={Colors.PRIMARY} />
      </Block>
      <Camera
        visible={modalVisible}
        onCloseCamera={(params: any) => setProfilePhoto(params)}
      />
    </Block>
  );
}

export default UploadMedia;