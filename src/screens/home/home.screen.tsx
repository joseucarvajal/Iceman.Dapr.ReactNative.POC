import React from 'react';
import { Colors, Sizes } from "../../shared/theme";
import { Block } from '../../shared/components';
import { Icon } from '../../shared/atomic/ions';

export interface IHomeProps { }

const Home: React.FC<IHomeProps> = ({ }) => {
  return (
    <Block flex middle>
      <Block flex absolute style={{ bottom: 0, alignSelf: 'center', marginBottom: Sizes.BASE * 2 }}>
        <Icon family="Revy" name="revy_slogan" size={50} color={Colors.PRIMARY} />
      </Block>
    </Block>
  );
};

export default Home;