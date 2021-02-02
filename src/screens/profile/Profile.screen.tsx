import React from 'react';
import { Block, Card, Tabs } from '../../shared/components';
import { Text } from '../../shared/atomic/ions';
import { Button } from '../../shared/atomic/atoms';
import Images from '../../constants/Images';
import { Sizes } from '../../shared/theme';

export default function Profile() {
  return (
    <Block flex padding={Sizes.BASE}>
      <Card data={data} />
      <Block row middle paddingTop={Sizes.BASE} >
        <Button rounded>
          <Text h3>Contact</Text>
        </Button>
        <Button rounded>
          <Text h3>Follow</Text>
        </Button>
      </Block>
      <Block paddingTop={Sizes.BASE}>
        <Tabs data={tabs} initialIndex={'timeline'} />
      </Block>
    </Block>
  );
}

const data = { 
  avatar: Images.Avatar, 
  fullName: "Travis Harrison", 
  currentPosition: "Data Managment Lead", 
  location: "Chicago, Illinois",
  about: "Creating technology that makes learning more engaging, equitable, and accessible" 
};

const tabs = [
  { id: 'timeline', title: 'Timeline', },
  { id: 'library', title: 'Library', }
];