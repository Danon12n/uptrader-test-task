import './App.scss';
import { Route, Routes, useLocation } from 'react-router';

import ErrorPage from './pages/error';
import Modal from './components/modal/modal';
import CardEditor from './components/card-editor/card-editor';
import HomePage from './pages/home/home';
import ProjectPage from './pages/project/project';

function App() {
  const { state } = useLocation();
  let background = state && state.background;

  return (
    <div className='App__container'>
      <Routes location={background}>
        <Route path='/' element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path='/project/:id' element={<ProjectPage />} errorElement={<ErrorPage />} />
      </Routes>
      <Routes>
        <Route
          path='/project/:id/card/:number'
          element={
            background && (
              <Modal
                onClose={() => {
                  history.back();
                }}
              >
                <CardEditor />
              </Modal>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
