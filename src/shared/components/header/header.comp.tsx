import React from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from 'react-native-navbar';
import { Colors, Sizes } from '../../theme'
import { Text, Image, Icon } from '../../atomic/ions'
import Images from '../../../constants/Images';

export interface IHeaderProps {
  home?: any,
  back?: any,
  title?: any,
  avatar?: any,
  navigation?: any,
  shadowless?: any,
  transparent?: any,
  bgColor?: any
}

const Header: React.FC<IHeaderProps> = ({
  home,
  back,
  title,
  avatar,
  navigation,
  shadowless,
  transparent,
  bgColor
}) => {

  const renderLeft = () => {
    return (
      <>
        {home &&
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon
                family="FontAwesome"
                name="bars"
                size={24}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
          </View>
        }
        {back &&
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                family="FontAwesome"
                name="chevron-left"
                size={24}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
        }
      </>
    );
  };

  const renderCenter = () => {
    return (
      <>
        {title &&
          <View style={styles.center}>
            <Icon
              family="Revy"
              name="revy_logo"
              size={18}
              color={Colors.PRIMARY}
            />
          </View>
        }
      </>
    );
  };

  const renderRight = () => {
    return (
      <>
        {avatar &&
          <View style={styles.right}>
            <Text small style={{ paddingRight: Sizes.BASE }}>Travis Harrison</Text>
            <Image size="avatar" source={Images.Avatar}/>
          </View>
        }
      </>
    );
  };

  const headerStyles = [
    !shadowless && styles.shadow,
    transparent && { backgroundColor: Colors.TRANSPARENT }
  ];

  const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={[headerStyles, navbarStyles]}>
        <NavigationBar
          rightButton={renderRight()}
          title={renderCenter()}
          leftButton={renderLeft()}
          tintColor={transparent ? Colors.TRANSPARENT : bgColor}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  navbar: {
    justifyContent: "center",
    width: Sizes.WIDTH,
    height: Sizes.HEADER_HEIGHT * 1.5
  },
  right: {
    flexDirection: 'row',
    alignItems: "center",
    height: Sizes.HEADER_HEIGHT,
    paddingRight: Sizes.BASE
  },
  center: {
    justifyContent: 'center',
    height: Sizes.HEADER_HEIGHT,
    width: Sizes.WIDTH * .7,
  },
  left: {
    marginTop: -3,
    justifyContent: 'center',
    paddingLeft: Sizes.BASE,
    paddingRight: Sizes.BASE * 2,
    height: Sizes.HEADER_HEIGHT,
    zIndex: 1,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: Sizes.ANDROID_ELEVATION,
  }
});