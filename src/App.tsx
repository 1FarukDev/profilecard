import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Fetcher from './components/Fetcher';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Fetcher />
      <Footer />
    </>
  );
};
export default App
