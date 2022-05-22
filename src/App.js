import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import { makeServer } from "helpers/server"
import { isProduction } from "helpers/isProduction";

// for the in-browser mock server, comment conditional out to interact with the real "backend"
// set REACT_APP_MIRAGE=true in your environment variable
if (!isProduction() && process.env.REACT_APP_MIRAGE === "true") {
  makeServer({ environment: "development" })
}

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      {/* <Header height="100"/> */}
      <AppRouter/>
    </div>
  );
};

export default App;
