import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { owner } from './owner.reducer';
import { alert } from './alert.reducer';
import { domains } from './domains.reducer';
import { token } from './token.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  owner,
  alert,
  domains,
  token
});

export default rootReducer;