import { createSignal, lazy, Suspense } from "solid-js";
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
    <div>
      <h1>Solid SSG</h1>
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
