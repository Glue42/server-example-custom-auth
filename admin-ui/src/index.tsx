import React from 'react';
import ReactDOM from 'react-dom';

import AdminUI from '@interopio/manager-admin-ui';
import '@interopio/theme-demo-apps';
import '@interopio/theme-demo-apps/dist/packages/rc-select.css';
import "@interopio/manager-admin-ui/dist/src/styles/index.css";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import { CustomAuthProvider } from './auth';

ReactDOM.render(
  <React.StrictMode>
    <AdminUI
      authUser="admin"
      apiURL="http://localhost:4356/api"
      agGridLicKey="your-ag-grid-key"
      auth={new CustomAuthProvider()}
      theme="dark" />
  </React.StrictMode>,
  document.getElementById('root')
);
