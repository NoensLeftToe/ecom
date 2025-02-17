import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const options = {
  position: 'bottom-center', // Set position
  autoClose: 5000, // Set timeout (in milliseconds)
  hideProgressBar: false, // Show the progress bar
  closeOnClick: true, // Close on click
  pauseOnHover: true, // Pause on hover
  draggable: true, // Allow dragging
  progress: undefined, // Progress bar (optional)
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer {...options} /> 
  </Provider>
);
