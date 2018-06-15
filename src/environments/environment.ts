// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBSxRe5Bu6BfennOqg7bOvGFOn9bwODEMw",
    authDomain: "msgoom-db.firebaseapp.com",
    databaseURL: "https://msgoom-db.firebaseio.com",
    projectId: "msgoom-db",
    storageBucket: "msgoom-db.appspot.com",
    messagingSenderId: "494106204200"
  }
};
