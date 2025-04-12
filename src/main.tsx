import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(`Cache error: ${error.message}`)
    }
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)


