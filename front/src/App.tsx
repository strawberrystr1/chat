import { useEffect } from 'react';

function App() {
  const ws = new WebSocket('ws://localhost:3000');
  useEffect(() => {
    ws.onopen = () => console.log('connection open');

    ws.onmessage = (msg: MessageEvent<string>) => console.log(msg);
  }, []);
  return (
    <div className="App">
      <button onClick={() => ws.send('hello from front')}>asdasd</button>
    </div>
  );
}

export default App;
