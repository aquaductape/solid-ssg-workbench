import { createSignal, lazy, Suspense } from "solid-js";
import logo from "./assets/logo.svg";
import Button from "./Button";

const Card = lazy(() => {
  return import("./Card");
});

const App = () => {
  const [renderButton, setRenderButton] = createSignal(false);

  const onClick = () => {
    if (renderButton()) return;
    setRenderButton(true);
  };

  return (
    <div class="container">
      <h1>Solid SSG</h1>
      <img src={logo} class="logo" alt="logo" />
      <br />
      <Button></Button>
      <br />
      <br />
      <button onClick={onClick}>Import Card Component</button>
      {renderButton() ? (
        <Suspense fallback={<div class="loader">loading btn...</div>}>
          <Card></Card>
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
