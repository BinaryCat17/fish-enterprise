import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import Card from '../../components/Card';
import {ListLocations, ListLocationOptions} from '../../queries/lists.graphql';
import { Button } from '../../components/Input';


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
            <GridView rowLen={3}>
                <TextSearch onSubmitEditing={onChangeName}/>
                <SelectorFilter onValueChange={onChangeType} values={types} initialValue={'Type'}/>
                <SelectorFilter onValueChange={onChangeDimension} values={dimensions} initialValue={'Dimension'}/>
            </GridView>
        </View>

        <Locations
            name={name}
            fdimensionType={(type == 'Type' ? undefined : type)}
            fdimension={(dimension == 'Dimension' ? undefined : dimension)}
        />
    </PageTemplate>
  )
}

function LocationCard({name, id, dimension, type}: {name: string, id: string, dimension: string, type: string}) {
    return (
      <Card title={name + '('+dimension+')'} entity='locations' id={id}>
          <Text style={styles.cardSpecial}>{type}</Text>
      </Card>
    )
  }
  

function Locations({name, fdimension, fdimensionType}: {name: string, fdimension: string | undefined, fdimensionType: string | undefined}) {
  const { loading, data, error, fetchMore } = useQuery(ListLocations, {
    variables: {
      offset: 0,
      limit: 12,
      fname: name,
      fdimensionType: fdimensionType,
      fdimension: fdimension,
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const locations = data.locations.map((c: { name: string, id: string, dimension: {name: string}, type: {name: string} }) => {
    return <LocationCard key={c.id} name={c.name} id={c.id} dimension={c.dimension.name} type={c.type.name}/>
  })

  return (
    <View style={styles.locationContainer}>
      <GridView rowLen={4}>
        {locations}
      </GridView>
      <View style={styles.button}>
          <Button title='Load More' onClick={
            () => {
              console.log(data.locations.length)
              fetchMore({
                variables: {
                  offset: data.locations.length,
                }
              })
        }}/>
      </View>
    </View>
    )   
}

const styles = StyleSheet.create({
  locationContainer: {
    marginTop: 25
  },
  container: {
    marginTop: 25
  },
  filterStyle: {
    paddingHorizontal: "10%"
  },
  cardSpecial: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 21,
    color: "rgba(0,0,0,0.6)",
    paddingVertical: 20
  },
  button: {
    width: 200,
    marginTop: 25,
    alignSelf:'center'
  }
})