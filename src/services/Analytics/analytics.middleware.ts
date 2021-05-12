import { Action, Dispatch, Middleware } from '@reduxjs/toolkit';

import { addAccounts, createAsset, importState, setProductAnalyticsAuthorisation } from '@store';

import { trackEvent } from './saga';

// Prefer middleware to track events throughout the app.
// ie. https://medium.com/@mwq27/using-redux-middleware-for-simpler-analytics-and-event-tracking-aa22cd996407
// Since this the dispatch is tested it is removed from codecov stats:
export const analyticsMiddleware: Middleware<TObject, any, Dispatch<Action>> = (state) => (
  next
) => (action) => {
  switch (action.type) {
    case addAccounts.type: {
      state.dispatch(
        trackEvent({
          name: 'Add Account',
          params: { qty: action.payload.length, walletId: action.payload[0].wallet } // multiple add accounts are always of the same type.
        })
      );
      break;
    }
    // Track custom token creation. Is also triggered on custom network.
    case createAsset.type: {
      state.dispatch(
        trackEvent({
          name: 'Add Asset',
          params: action.payload
        })
      );
      break;
    }

    case setProductAnalyticsAuthorisation.type: {
      state.dispatch(
        trackEvent({
          name: 'Deactivate analytics'
        })
      );
      break;
    }

    case importState.type: {
      state.dispatch(trackEvent({ name: 'Import AppState' }));
      break;
    }

    default:
      // do nothing;
      break;
  }
  return next(action);
};