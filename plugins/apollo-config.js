<<<<<<< HEAD
export default ({ $config: { WWW_URL, HTTP_ENDPOINT } }) => {
  return {
    httpEndpoint: `${WWW_URL}/graphql`,
    browserHttpEndpoint: '/graphql',
    wsEndpoint: `${HTTP_ENDPOINT.replace('http', 'ws')}/graphql`,
  }
}
=======
export default ({ $config: { WWW_URL, HTTP_ENDPOINT } }) => {
  return {
    httpEndpoint: `${WWW_URL}/graphql`,
    browserHttpEndpoint: '/graphql',
    wsEndpoint: `${HTTP_ENDPOINT.replace('http', 'ws')}/graphql`,
  }
}
>>>>>>> badec6a7c7866410bc7a03a2550fdb8b105fa36a
