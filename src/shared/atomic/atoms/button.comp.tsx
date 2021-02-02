import React from "react";
import { StyleSheet, ViewProps, TouchableHighlight } from "react-native";
import { Colors, Sizes } from "../../theme";
import { Block } from "../../components";
import Icon from "../ions/icon.comp";

export interface IButtonProps extends ViewProps {
  color?: ColorType,
  underlayColor?: ColorType,
  iconContent?: any,
  icon?: any,
  iconColor?: any,
  iconSize?: any,
  left?: any,
  right?: any,
  shadow?: any,
  disabled?: any,
  children?: React.ReactNode,
  props?: any,
  onPress?: any,
  small?: boolean,
  large?: boolean,
  rounded?: boolean,
  backgroundless?: boolean
}

export type ColorType = "PRIMARY" | "DARK_PRIMARY" | "LIGHT_PRIMARY";

const Button: React.FC<IButtonProps> = ({
  color = "PRIMARY",
  underlayColor = "DARK_PRIMARY",
  iconContent,
  icon,
  iconColor,
  iconSize,
  left,
  right,
  shadow,
  disabled,
  children,
  onPress,
  style,
  small,
  large,
  rounded,
  backgroundless
}) => {

  const iconInstance = icon ? (
    <Icon
      family='FontAwesome'
      name={icon}
      size={iconSize || Sizes.BASE * 1.0625}
      style={{ paddingLeft: left && Sizes.BASE, paddingRight: right && Sizes.BASE }}
      color={iconColor}
    />
  ) : (
      iconContent
    );

  const styleButton = [
    styles.button,
    small && styles.smallButton,
    large && styles.largeButton,
    backgroundless && styles.backgroundless,
    disabled && styles.disabled,
    shadow && styles.shadow,
    color && { backgroundColor: Colors[color] },
    rounded && styles.rounded,
    style
  ];

  return (
    <Block style={styleButton}>
      <TouchableHighlight onPress={onPress} style={[{ flex: 1 }, styleButton]} underlayColor={Colors[underlayColor!]}>
        <Block flex row middle center>
          {left && !right && iconInstance}
          <Block flex middle center >
            {children}
          </Block>
          {right && iconInstance}
        </Block>
      </TouchableHighlight>
    </Block>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.THEME,
    height: 35,
    margin: 2
  },
  smallButton: {
    backgroundColor: Colors.THEME,
    width: 90,
  },
  largeButton: {
    backgroundColor: Colors.THEME,
    width: Sizes.WIDTH - Sizes.BASE * 2,
  },
  backgroundless: {
    width: Sizes.WIDTH - Sizes.BASE * 2,
    backgroundColor: Colors.TRANSPARENT
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: Sizes.ANDROID_ELEVATION,
  },
  disabled: {
    backgroundColor: Colors.MUTED,
  },
  rounded: {
    borderRadius: Sizes.BUTTON_RADIUS,
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
