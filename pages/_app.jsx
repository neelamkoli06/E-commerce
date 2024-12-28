import "@/styles/globals.css";
import { FilterProvider } from '@/context/CartContext';

function MyStore({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}

export default MyStore;
