import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import { Provider }              from 'react-redux';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import path                      from 'path';

import promiseMiddleware         from 'utils/promiseMiddleware';
import fetchComponentData        from 'utils/fetchComponentData';
import routes                    from 'routes';
import * as reducers             from 'reducers';

const app = express();

injectTapEventPlugin();



if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {

  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {

      const initialState = store.getState();

      return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>`;
    };

    /*fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then(html => res.end(html))
        .then(err=> res.end(err.message));
    */
    res.end(renderView());
  });
});

export default app;

