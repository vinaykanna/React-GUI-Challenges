import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AutoScrollToBottom from "../gui-challenges/auto-scroll-to-bottom";
import InfiniteScroll from "../gui-challenges/infinite-scroll";
import MultilevelMenu from "../gui-challenges/multilevel-menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auto-scroll-to-bottom" element={<AutoScrollToBottom />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/multilevel-menu" element={<MultilevelMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => <h1>Gui Challenges</h1>;

export default App;
