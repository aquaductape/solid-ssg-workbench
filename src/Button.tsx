import { createEffect, createSignal } from "solid-js";

const Button = () => {
  const [clicked, setClicked] = createSignal(0);

  createEffect(() => {
    console.log(clicked());
  });

  return (
    <button onClick={() => setClicked(clicked() + 1)}>
      I've been clicked: {clicked()} times
    </button>
  );
};

export default Button;
