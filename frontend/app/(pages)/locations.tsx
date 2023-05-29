import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import {ListLocations, ListLocationOptions} from '../../queries/queries.graphql';


export default function LocationFilters() {  
  const client = useApolloClient()
  const [name, onChangeName] = React.useState('');
  const [type, onChangeType] = React.useState('Type');
  const [dimension, onChangeDimension] = React.useState('Dimension');

  const { loading, error, data } = useQuery(ListLocationOptions);
  if (loading) return <Loading/>;
  if (error) return <Error error={error.message}/>;

  const types = data.dimensionTypes.map((v: { name: string; }) => {return v.name});
  const dimensions = data.dimensions.map((v: { name: string; }) => {return v.name});

  client.cache.reset();
  return (
    <PageTemplate imageSource="/assets/images/locations.png">
        <View style={styles.filterStyle}>
            <GridView>
                <TextSearch onSubmitEditing={onChangeName}/>
                <SelectorFilter onValueChange={onChangeType} values={types} initialValue={'Type'}/>
                <SelectorFilter onValueChange={onChangeDimension} values={dimensions} initialValue={'Dimension'}/>
            </GridView>
        </View>

        <Characters
            name={name}
            fdimensionType={(type == 'Type' ? undefined : type)}
            fdimension={(dimension == 'Dimension' ? undefined : dimension)}
        />
    </PageTemplate>
  )
}

function Characters({name, fdimension, fdimensionType}: {name: string, fdimension: string | undefined, fdimensionType: string | undefined}) {
  const { loading, data, error } = useQuery(ListLocations, {
    fetchPolicy: 'network-only',
    variables: {
      offset: 0,
      limit: 10,
      fname: name,
      fdimensionType: fdimensionType,
      fdimension: fdimension,
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const locations = data.locations.map((c: { name: string, id: string }) => {
    return <Text key={c.id}>{c.name}</Text>
  })

  return (
      <View style={styles.locationContainer}>
        {locations}
      </View>
  )
}

const styles = StyleSheet.create({
  locationContainer: {

  },
  container: {
    marginTop: 20
  },
  filterStyle: {
    paddingHorizontal: "10%"
  }
})