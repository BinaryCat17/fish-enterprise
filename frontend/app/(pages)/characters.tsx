import { Text, View } from "react-native";
import PageTemplate from "../../components/PageTemplate";
import Loading from "../../components/Loading"
import { useQuery } from '@apollo/client';
import ListEpisodes from '../../queries/queries.graphql';

export default function Characters() {
  const { loading, data, fetchMore, error } = useQuery(ListEpisodes, {
    variables: {
      offset: 0,
      limit: 8
    },
  });
  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;
  console.log(data)

  return (
    <PageTemplate
        imageSource="/assets/images/characters.png"
    />
  )
}