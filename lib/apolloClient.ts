import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// URL da API GraphQL do Pokémon
const httpLink = new HttpLink({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
});

// Configuração do Apollo Client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});
