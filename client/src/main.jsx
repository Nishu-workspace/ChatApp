import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import router from './routes/Index.jsx';
import {store} from  './redux/store.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}
    >
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
