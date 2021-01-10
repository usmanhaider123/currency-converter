import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text, Image
} from 'react-native';

import * as Actions from '../redux/actions'
import { Images as LocalImages } from '../assets'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons';

import * as Colors from '../utils/Colors'



const MainContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_EXTRA_LARGE};
`;

const ListitemContainer = styled.View`
   height: 100%;
   flex-direction: row;
   align-items: center;
   width: 100%;
   background-color: white;
   padding-horizontal: 5%;
   border-bottom-width: 0.3px;
   border-bottom-color: lightgray;
`;

const ItemText = styled.Text`
   color: black;
`;


const RightItem = styled.View`
   position: absolute;
   right: 5%;
`;






const DATA = [
  { id: 1, title: 'blue' },
  { id: 2, title: 'orange' },
  { id: 3, title: 'green' },
  { id: 4, title: 'purple' },


];

const Themes = (props) => {
  const renderItem = ({ item }) => (
    <ListitemContainer>
      <ItemText>{item.title}</ItemText>
      <RightItem>
        <TouchableOpacity
          onPress={() => selectTheme(item.title)}
          style={{ backgroundColor: item.title, height: 20, width: 20, borderRadius: 20 }} />
      </RightItem>

    </ListitemContainer>
  );
  const selectTheme = (title) => {
    props.changeBaseColor(title)
    props.navigation.reset({
      routes: [{ name: 'Home' }]
    })
  }


  return (
    <ThemeProvider theme={props.theme}>
      <MainContainer>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id + item.title}

        />
      </MainContainer>
    </ThemeProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center', alignItems: 'center'
  }
});


const mapStateToProps = (state) => ({
  loading: state.home.loading,
  theme: state.home.theme
});

const mapDispatchToProps = dispatch => {
  return {
    setloading: (params) => dispatch(Actions.setLoading(params)),
    changeBaseTheme: (params) => dispatch(Actions.changeBaseTheme(params)),
    changeBaseColor: (params) => dispatch(Actions.changeColorTheme(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
