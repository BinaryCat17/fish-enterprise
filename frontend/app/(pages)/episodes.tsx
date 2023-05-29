import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import Card from '../../components/Card';
import {ListEpisodes} from '../../queries/queries.graphql';
import { Button } from '../../components/Input';


export default function LocationFilters() {  
  const client = useApolloClient()
  const [name, onChangeName] = React.useState('');

  client.cache.reset();
  return (
    <PageTemplate imageSource="/assets/images/episodes.png">
        <View style={styles.filterStyle}>
            <TextSearch onSubmitEditing={onChangeName}/>
        </View>

        <Characters
            name={name}
        />
    </PageTemplate>
  )
}

function EpisodeCard({name, id, date, code}: {name: string, id: string, date: string, code: string}) {
  return (
    <Card title={name}>
        <Text style={styles.cardSpecial}>{date}</Text>
        <Text style={styles.cardSpecialBold}>{code}</Text>
    </Card>
  )
}

function Characters({name}: {name: string}) {
  const { loading, data, error, fetchMore } = useQuery(ListEpisodes, {
    variables: {
      offset: 0,
      limit: 12,
      fname: name,
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const episodes = data.episodes.map((c: { name: string, id: string, date: string, code: string }) => {
    return <EpisodeCard key={c.id} name={c.name} id={c.id} date={c.date} code={c.code}/>
  })

  return (
    <View style={styles.episodesContainer}>
      <GridView rowLen={4}>
        {episodes}
      </GridView>
      <View style={styles.button}>
          <Button title='Load More' onClick={
            () => {
              console.log(data.episodes.length)
              fetchMore({
                variables: {
                  offset: data.episodes.length,
                }
              })
        }}/>
      </View>
    </View>
    )   
}

const styles = StyleSheet.create({
  episodesContainer: {
      marginTop: 25
  },
  container: {
    marginTop: 20
  },
  filterStyle: {
    paddingHorizontal: "20%"
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
  cardSpecialBold: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 21,
    color: "rgba(0,0,0,0.7)",
    paddingVertical: 20
  },
  button: {
    width: 200,
    marginTop: 25,
    alignSelf:'center'
  }
})