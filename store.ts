import {configureStore} from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query';
import {characterApi} from './services/character';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [characterApi.reducerPath]: characterApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
