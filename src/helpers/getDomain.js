import { isProduction } from 'helpers/isProduction';

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
//test 2 SonarQube after configuration
export const getDomain = () => {
  const prodUrl = 'https://sopra-fs22-group-02-server.herokuapp.com';

  let devUrl = 'http://localhost:8080';

  if(process.env.REACT_APP_VM) {
    devUrl = 'http://10.211.55.4:8080';
  }
  console.log(`DevUrl set: ${devUrl}`)
  return isProduction() ? prodUrl : devUrl;
};
