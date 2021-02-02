import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Colors } from "../../shared/theme";
import { Block } from '../../shared/components';
import { Icon } from '../../shared/atomic/ions';

export interface IOnboardingProps { }

export default function Onboarding({
  navigation,
}: StackScreenProps<RootStackParamList, 'Onboarding'>) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.replace('Root')}>
      <Block flex middle>
        <Icon family="Revy" name="revy_slogan" size={100} color={Colors.PRIMARY} />
      </Block>
    </TouchableWithoutFeedback>
  );
}