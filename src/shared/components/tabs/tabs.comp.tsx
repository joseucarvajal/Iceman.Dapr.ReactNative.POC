import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
import Block from '../block/block.comp'
import { Colors, Sizes } from '../../theme';

export interface ITabsProps {
  initialIndex: any,
  onChange?: any,
  backgroundless?: any,
  data?: any,
  customTextColor?: string,
  showSeparator?: boolean,
  borderless?: boolean
}

const defaultMenu = [
  { id: 'tab1', title: 'tab1', },
  { id: 'tab2', title: 'tab2', }
];

const Tabs: React.FC<ITabsProps> = ({
  initialIndex,
  onChange,
  backgroundless,
  data: dataTabs,
  customTextColor,
  showSeparator,
  borderless
}, props) => {

  const [initialIndexDefault, setInitialIndexDefault] = useState(null);
  const [data, _] = useState(dataTabs ? dataTabs : defaultMenu);
  const [active, setActive] = useState(null);
  const menuRef: any = useRef();
  const animatedValue = new Animated.Value(1);

  const onScrollToIndexFailed = () => {
    menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5
    });
  };

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const selectMenu = (id: any) => {
    setActive(id);

    menuRef.current.scrollToIndex({
      index: data.findIndex((item: any) => item.id === id),
      viewPosition: 0.5
    });

    animate();
    onChange && onChange(id);
  };

  const renderItem = (item: any) => {
    const isActive = active === item.id;

    const textColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.MUTED, isActive ? Colors.WHITE : Colors.MUTED],
      extrapolate: 'clamp',
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { borderColor: borderless ? Colors.TRANSPARENT : Colors.MUTED },
      isActive && { borderColor: borderless ? Colors.TRANSPARENT : Colors.WHITE }
    ];

    return (
      <>
        <Block style={containerStyles}>
          <Animated.Text style={[ styles.menuTitle, { color: customTextColor ? customTextColor : textColor } ]} onPress={() => selectMenu(item.id)}>
            {item.title}
          </Animated.Text>
        </Block>
      </>
    )
  };

  const renderMenu = () => {
    return (
      <FlatList
        {...props}
        data={data}
        horizontal={true}
        ref={menuRef}
        extraData={active}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.menu}
        ItemSeparatorComponent={showSeparator && FlatListItemSeparator}
      />
    )
  };

  const FlatListItemSeparator = () => {
    return (
      <Block backgroundColor={Colors.WHITE} width={1} height={'70%'} style={{ margin: 5, marginRight: 0 }} />
    )
  }

  const updateInitialIndex = useCallback(() => {
    if (initialIndexDefault === null) {
      selectMenu(initialIndex);
      setInitialIndexDefault(initialIndex);
    }
  }, [initialIndex, selectMenu]);

  useEffect(() => {
    updateInitialIndex();
  }, [updateInitialIndex])

  return (
    <Block style={[styles.container, backgroundless && { backgroundColor: Colors.TRANSPARENT }]}>
      {renderMenu()}
    </Block>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    width: Sizes.WIDTH,
    zIndex: 2
  },
  shadow: {
    shadowColor: Colors.WHITE,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: Sizes.ANDROID_ELEVATION,
  },
  menu: {
    paddingHorizontal: Sizes.BASE * 2,
    paddingTop: 8,
    paddingBottom: 8,
  },
  titleContainer: {
    borderColor: Colors.MUTED,
    borderTopWidth: 3,
    alignItems: 'center',
    marginRight: 0,
    paddingHorizontal: 0,
    paddingVertical: 3,
  },
  menuTitle: {
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 45
  }
});