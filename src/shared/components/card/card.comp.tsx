import React from 'react';
import { Colors, Sizes } from "../../theme";
import Block from '../../components/block/block.comp';
import { Text, Image, Icon } from '../../atomic/ions'

export interface ICardProps {
  data: any;
}

const Card: React.FC<ICardProps> = ({ 
  data
}) => {
    return (
      <Block>
        <Block row>
          <Image size="default" source={data.avatar}/>
          <Block flex paddingLeft={Sizes.BASE}>
            <Text h1 bold>{data.fullName}</Text>
            <Text h3>{data.currentPosition}</Text>
            <Text h3>{data.location}</Text>
          </Block>
        </Block>
        <Block paddingTop={Sizes.BASE}>
          <Text h4>{data.about}</Text>
        </Block>
      </Block>
    );
}

export default Card;