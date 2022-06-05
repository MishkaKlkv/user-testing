// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {IEnvironment} from "./IEnvironment";

export const environment: IEnvironment = {
  production: false,
  apiKey: 'AIzaSyBWh0Y_1_WUMsOsK6LA0Izgxm1eRrLR9K4',
  firebaseDbUrl: 'https://user-tests-klkv-default-rtdb.europe-west1.firebasedatabase.app/'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
