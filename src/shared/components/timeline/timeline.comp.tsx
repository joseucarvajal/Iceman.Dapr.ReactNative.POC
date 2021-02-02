import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Icon } from "../../atomic/ions";
import { Colors, Sizes } from "../../theme";
import { Text } from '../../atomic/ions'
import Block from '../block/block.comp'

export interface ITimelineProps {
  data: any
}

const Timeline: React.FC<ITimelineProps> = ({ 
  data
}) => {

  const _renderEvent = (rowData: any, rowID: any) => {
    let opStyle = { borderRightColor: Colors.WHITE, borderRightWidth: 1, marginRight: 50, paddingRight: 50 };
    return (
      <Block flex style={[ opStyle, { borderLeftWidth: 2 } ]}>
        <TouchableOpacity>
          <Block paddingTop={10} paddingBottom={10}>
            {_renderDetail(rowData, rowID)}
          </Block>
          {_renderSeparator()}
        </TouchableOpacity>
      </Block>
    );
  }

  const _renderSeparator = () => {
    return <Block backgroundColor={Colors.SEPARATOR} style={{height: 1, marginTop: 10, marginBottom: 10}} />;
  }

  const _renderDetail = (rowData: any, rowID: any) => {
    return (
      <Block flex>
        <Block row>
          <Text h1>{rowData.title}</Text>
          <Text small>   {rowData.time}</Text>
        </Block>
        <Block paddingTop={Sizes.BASE / 2}>
          <Text h3>{rowData.role}</Text>
        </Block>
        <Block paddingTop={Sizes.BASE / 2}>
          <Text h5>{rowData.description}</Text>
        </Block>
      </Block>
    );
  }

  const _renderDot = (rowData: any, rowID: any) => {
    return (
      <Block absolute order={1} backgroundColor={Colors.BACKGROUND} style={{ right: Sizes.BASE, top: 0 }}>
        <Block center middle square>
          <Icon family="Revy" name="revy_company" size={50} color={Colors.PRIMARY} />
        </Block>
      </Block>
    );
  }

  const _renderItem = ({ item, index }: any) => {
    return (
      <Block key={index}>
        <Block flex row center>
          {_renderEvent(item, index)}
          {_renderDot(item, index)}
        </Block>
      </Block>
    );
  }

  return (
    <Block flex>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index + ""}
      />
    </Block>
  );
}

export default Timeline;