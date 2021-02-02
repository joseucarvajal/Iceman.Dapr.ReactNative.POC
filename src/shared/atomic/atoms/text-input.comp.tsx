import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from "react-native";
import { Colors, Sizes } from '../../theme';
import { Icon, Text } from '../ions';

export interface IInputProps extends TextInputProps {
  textInputStyle?: any;
  type?: any;
  placeholderTextColor?: any;
  placeholder?: any;
  label?: any;
  labelStyles?: any;
  color: ColorType;
  help?: any;
  helpStyles?: any;
  bgColor?: any;
  borderless?: any;
  viewPass?: any;
  rounded?: any;
  icon?: any;
  family?: any;
  left?: any;
  right?: any;
  iconColor?: any;
  topHelp?: any;
  bottomHelp?: any;
  theme?: any;
  styles?: any;
  iconSize?: any;
  iconContent?: any;
  password?: any;
  onRef?: any;
  error?: any;
  onFocus?: any;
  onChangeText?: any;
  onSubmitEditing?: any;
  value?: any;
  children?: any;
  props?: any;
}

export type ColorType = "PRIMARY";

const Input: React.FC<IInputProps> = ({
  style,
  textInputStyle,
  type,
  placeholderTextColor,
  placeholder,
  label,
  labelStyles,
  color,
  help,
  helpStyles,
  bgColor,
  borderless,
  viewPass,
  rounded,
  icon,
  family,
  left,
  right,
  iconColor,
  topHelp,
  bottomHelp,
  iconSize,
  iconContent,
  password,
  onRef,
  error,
  onFocus,
  onChangeText,
  onSubmitEditing,
  value,
  children,
  ...props
}) => {

  const [isPassword, setIsPassword] = React.useState(password);
  React.useEffect(() => {
    setIsPassword(password);
  }, []);

  const inputViewStyles = [
    styles.inputStyle,
    styles.inputContainer,
    bgColor && { backgroundColor: bgColor },
    rounded && styles.rounded,
    borderless && [{ borderColor: Colors[color] }, styles.borderless],
    error && { borderColor: Colors.DANGER },
    style,
  ];

  const inputStyles = [
    styles.inputView,
    borderless && icon && styles.inputIcon,
    styles.inputText,
    color && { color: Colors[color] },
    textInputStyle || {}
  ];

  const iconInstance = icon ? (
    <Icon
      family={family}
      name={icon}
      size={iconSize || Sizes.BASE * 1.0625}
      style={{ marginRight: left && !right ? 2 : 0 }}
      color={(error && Colors.DANGER) || iconColor || placeholderTextColor || Colors.PLACEHOLDER}
    />
  ) : (
      iconContent
    );

  const viewPassElement = password && viewPass && (
    <TouchableOpacity style={{ marginLeft: 2 }} onPress={() => setIsPassword(!isPassword)}>
      <Icon
        family='FontAwesome'
        size={iconSize || Sizes.BASE * 1.0625}
        color={iconColor || Colors.MUTED}
        name="eye"
      />
    </TouchableOpacity>
  );
  const labelContent = label && <Text extraSmall color={Colors.PRIMARY} style={[styles.label, labelStyles]}>{label}</Text>;
  const helpContent = help && <Text extraSmall color={Colors.PRIMARY} style={helpStyles}>{help}</Text>;

  return (
    <View>
      {labelContent}
      {topHelp && !bottomHelp && helpContent}
      <View style={inputViewStyles}>
        {left && !right && iconInstance}
        <TextInput
          ref={onRef}
          style={inputStyles}
          keyboardType={type}
          secureTextEntry={isPassword}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          onFocus={onFocus}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
          {...props}
        />
        {right && iconInstance}
        {viewPassElement}
        {children}
      </View>
      {bottomHelp && helpContent}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: Sizes.INPUT_BORDER_RADIUS,
    borderWidth: Sizes.INPUT_BORDER_WIDTH,
    height: Sizes.INPUT_HEIGHT,
    width: Sizes.WIDTH - Sizes.BASE * 2
  },
  inputText: {
    color: Colors.BLACK,
    textDecorationColor: 'transparent',
    textShadowColor: 'transparent',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    flex: 1,
  },
  inputIcon: {
    marginHorizontal: Sizes.BASE,
  },
  rounded: {
    borderRadius: Sizes.INPUT_ROUNDED,
  },
  borderless: {
    borderWidth: 0,
    borderBottomWidth: Sizes.INPUT_BORDER_WIDTH,
  },
  label: {
    paddingTop: Sizes.INPUT_VERTICAL_LABEL
  }
});