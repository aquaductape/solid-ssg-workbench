import { createEffect, createSignal } from "solid-js";
import Button from "./Button";

const App = () => {
  return (
    <div>
      hello
      <br />
      <ul>
        <li>i love</li>
        <li>cheese</li>
        <li>burger</li>
      </ul>
      <br />
      <Button></Button>
    </div>
  );
};

export default App;
