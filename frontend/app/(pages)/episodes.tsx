import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import {ListEpisodes} from '../../queries/queries.graphql';


export default function LocationFilters() {  
  const client = useApolloClient()
  const [name, onChangeName] = React.useState('');

  client.cache.reset();
  return (
    <PageTemplate imageSource="/assets/images/episodes.png">
      <GridView>
        <TextSearch onSubmitEditing={onChangeName}/>
      </GridView>
      <Characters
          name={name}
      />
    </PageTemplate>
  )
}

function Characters({name}: {name: string}) {
  const { loading, data, error } = useQuery(ListEpisodes, {
    fetchPolicy: 'network-only',
    variables: {
      offset: 0,
      limit: 10,
      fname: name,
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const episodes = data.episodes.map((c: { name: string, id: string }) => {
    return <Text key={c.id}>{c.name}</Text>
  })

  return (
      <View style={styles.episodesContainer}>
        {episodes}
      </View>
  )
}

const styles = StyleSheet.create({
    episodesContainer: {

  },
  container: {
    marginTop: 20
  },
})