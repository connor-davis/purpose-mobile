import { onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { State } from "../state/state";

let useState = (stateName: string) => {
  let [state, setState] = createStore({}, { name: stateName });

  let stateUpdated = (name: string, value: object) => {
    if (name !== stateName) return;
    else setState({ ...state, ...value });
  };

  let idbState = new State([], stateUpdated);

  let clear = () => {
    idbState.clear();
    setState({});
  };

  onMount(() => {
    (async () => {
      let _state = await idbState.get(stateName);

      setState(_state);
    })();
  });

  let update = (data: object) => {
    (async () => {
      await idbState.set(stateName, {
        ...(await idbState.get(stateName)),
        ...data,
      });
    })();
  };

  return [state, update, clear];
};

export default useState;
