import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { Component, createSignal, onMount } from "solid-js";
import useState from "./hooks/state";

const App: Component = () => {
  const [response, setResponse] = createSignal(undefined);
  const [user, setUser, clearUser] = useState("user");

  onMount(async () => {
    await testGet();
  });

  const testGet = async () => {
    const options = {
      url: "https://api.purpose360.co.za/api/v2/authentication/check",
      headers: {
        Authorization: "Bearer ",
      },
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    setResponse(response.data);
  };

  return (
    <div class="w-screen h-screen bg-neutral-900 text-white app-bg">
      Response: {response || "Loading..."}
    </div>
  );
};

export default App;
