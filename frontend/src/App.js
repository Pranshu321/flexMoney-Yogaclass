import React from "react";
import Payment from "./components/Payment";
import Form from "./components/Form";

const App = () => {
  const [status, setStatus] = React.useState(true);
  return <div>{status ? <Payment /> : <Form setStatus={setStatus} />}</div>;
};

export default App;
