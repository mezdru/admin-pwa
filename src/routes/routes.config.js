import React from 'react';
import {RedirectMissingLocale, RedirectNoMatch} from './RouteRedirect';

const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));
const RoutesWithLocale = React.lazy(() => import('./RoutesWithLocale'));
const RoutesWithOrgTag = React.lazy(() => import('./RoutesWithOrgTag'));

export const routes = [
  {
    path: "/:locale(en|fr|en-UK)",
    component: RoutesWithLocale,
    routes: [
      {
        path: "/:locale(en|fr|en-UK)/error/:errorCode/:errorType?",
        component: ErrorPage,
        exact: true
      },
      {
        path: "/:locale(en|fr|en-UK)/:orgTag",
        component: RoutesWithOrgTag,
        routes: [
          {
            path: "/:locale(en|fr|en-UK)/:orgTag/dashboard",
            component: DashboardPage,
            exact: true
          },
          {
            path: "/:locale(en|fr|en-UK)/:orgTag",
            component: DashboardPage,
            exact: true
          },
          {
            path: "*",
            component: RedirectNoMatch
          }
        ]
      },
      {
        path: "*",
        component: RedirectNoMatch
      }
    ]
  },
  {
    path: "*",
    component: RedirectMissingLocale
  }
]