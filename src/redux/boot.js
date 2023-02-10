import { store } from './store';
import authActions from './auth/action';

export default () =>
    new Promise(() => {
        store.dispatch(authActions.checkAuthorization());
    });