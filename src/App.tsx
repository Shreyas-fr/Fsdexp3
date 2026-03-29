import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import Scanner from './features/scanner/Scanner';
import Alternatives from './features/alternatives/Alternatives';
import Calculator from './features/calculator/Calculator';
import RecyclingMap from './features/recycling/RecyclingMap';
import Journey from './features/journey/Journey';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Scanner />} />
            <Route path="/alternatives" element={<Alternatives />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/recycling" element={<RecyclingMap />} />
            <Route path="/journey" element={<Journey />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
