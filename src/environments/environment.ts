// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyAg6AvWPd3e6x2Yq_JrnDq0cFySmoemkOQ",
        authDomain: "help-desk-fb557.firebaseapp.com",
        projectId: "help-desk-fb557",
        storageBucket: "help-desk-fb557.appspot.com",
        messagingSenderId: "596827481065",
        appId: "1:596827481065:web:28317d4d34dc266b6da178",
        measurementId: "G-0GSJ43WEND"
    },
    // LOCALLY
    // API_URL: 'http://localhost:5001/help-desk-fb557/us-central1/api',
    // CF_URL: 'http://localhost:5001/help-desk-fb557/us-central1',

    API_URL: 'https://us-central1-help-desk-fb557.cloudfunctions.net/api',
    CF_URL: 'https://us-central1-help-desk-fb557.cloudfunctions.net',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
