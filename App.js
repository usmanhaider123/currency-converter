// TO use storybook use these 2 lines
// import StorybookUIRoot from './storybook';

// export { StorybookUIRoot as default };




import React from 'react';
import { Provider } from 'react-redux';
import { Store, Persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigator from './src/navigator/MainNavigator'


const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};


export default App;
