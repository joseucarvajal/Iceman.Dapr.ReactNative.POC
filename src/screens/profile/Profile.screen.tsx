import React, { useState } from 'react';
import { Block, Card, Tabs, Timeline } from '../../shared/components';
import { Text } from '../../shared/atomic/ions';
import { Button } from '../../shared/atomic/atoms';
import Images from '../../constants/Images';
import { Colors, Sizes } from '../../shared/theme';

export interface IProfileProps { 
  route?: any | undefined;
}

const Profile: React.FC<IProfileProps> = ({ route }) => {
  const [tab, setTab] = useState('timeline');
  const [contactBtn, setContactBtn]: any = useState(Colors.PRIMARY);
  const [followBtn, setFollowBtn]: any = useState(Colors.DARK_PRIMARY);

  return (
    <Block flex padding={Sizes.BASE}>
      <Card data={data} />
      <Block row middle paddingTop={Sizes.BASE} paddingBottom={Sizes.BASE}>
        <Button color={contactBtn} onPress={() => setContactBtn( contactBtn === Colors.PRIMARY ? Colors.DARK_PRIMARY : Colors.PRIMARY )} rounded>
          <Text h3>Contact</Text>
        </Button>
        <Button color={followBtn} onPress={() => setFollowBtn( followBtn === Colors.PRIMARY ? Colors.DARK_PRIMARY : Colors.PRIMARY )} rounded>
          <Text h3>Follow</Text>
        </Button>
      </Block>
      <Tabs data={tabs} initialIndex={'timeline'} onChange={(id:any) => setTab(id)}/>
      {(tab === 'timeline') && (
        <Block flex paddingLeft={Sizes.BASE}>
          <Timeline data={timeline} />
        </Block>
      )}
    </Block>
  );
}

export default Profile;

const data = { 
  avatar: Images.Avatar, 
  fullName: "Travis Harrison", 
  currentPosition: "Data Managment Lead", 
  location: "Chicago, Illinois",
  about: "Creating technology that makes learning more engaging, equitable, and accessible." 
};

const tabs = [
  { id: 'timeline', title: 'Timeline', },
  { id: 'library', title: 'Library', }
];

const timeline = [
  {
    time: '2020',
    title: 'Spotify',
    role: 'Data Management Lead',
    description: 'Creating technology that makes learning more engaging, equitable, and accessible.'
  },
  {
    time: '2020',
    title: 'Spotify',
    role: 'Data Management Lead',
    description: 'Creating technology that makes learning more engaging, equitable, and accessible.'
  },
  {
    time: '2020',
    title: 'Spotify',
    role: 'Data Management Lead',
    description: 'Creating technology that makes learning more engaging, equitable, and accessible.'
  },
  {
    time: '2020',
    title: 'Spotify',
    role: 'Data Management Lead',
    description: 'Creating technology that makes learning more engaging, equitable, and accessible.'
  },
  {
    time: '2020',
    title: 'Spotify',
    role: 'Data Management Lead',
    description: 'Creating technology that makes learning more engaging, equitable, and accessible.'
  }
]