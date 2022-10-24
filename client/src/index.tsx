import { API_URL } from 'config';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log(process.env.NODE_ENV);
console.log(process.env.API_URL);
console.log(API_URL);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
