import "./App.css";
import useToast from "./hooks/useToast";

function App() {
  const { showToast } = useToast();

  return (
    <div className="App">
      <button onClick={() => showToast(false, "bye", 1000)}>토스트 빨강</button>
      <button onClick={() => showToast(true, "hi", 3000)}>토스트 파랑</button>
      <hr />
    </div>
  );
}

export default App;
