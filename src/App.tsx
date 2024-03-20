import { useState } from "react";
import {
  useSpringRef,
  useTrail,
  useSprings,
  useChain,
  animated,
} from "@react-spring/web";
import "./App.css";
import Waterfall from "./waterfall";

function App() {
  const [count, setCount] = useState(0);

  const api1 = useSpringRef();
  const api2 = useSpringRef();

  const [springs] = useTrail(
    3,
    () => ({
      ref: api1,
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  const [springs2] = useSprings(
    3,
    () => ({
      ref: api2,
      from: { height: 100 },
      to: { height: 50 },
      config: {
        duration: 1000,
      },
    }),
    []
  );
  useChain([api1, api2], [0, 1], 500);

  return (
    <>
      {springs.map((styles1, index) => (
        <animated.div
          style={{ ...styles1, ...springs2[index] }}
          className="box"
        ></animated.div>
      ))}
      <Waterfall/>
    </>
  );
}

export default App;
