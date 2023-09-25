import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { IntlProvider } from "react-intl";
import "./App.css";
import Loading from "./views/loading";
import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./helpers/authHelper";

const ViewHome = React.lazy(() => import("./views/Products"));
const ViewItems = React.lazy(() => import("./views/ProductItems"));
const ViewLogin = React.lazy(() => import("./views/login"));
const ViewSignup = React.lazy(() => import("./views/signup"));
const Error = React.lazy(() => import("./views/error"));

function App() {
  return (
    //using suspense and loading for performance when fetching data from the server
    <Suspense fallback={<Loading />}>
      <AppLayout>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ViewHome />
                </PrivateRoute>
              }
            />
            <Route path="/product/:productId/items" element={<ViewItems />} />
            <Route path="/login" exact element={<ViewLogin />} />
            <Route path="/signup" element={<ViewSignup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AppLayout>
    </Suspense>
  );
}

export default App;
