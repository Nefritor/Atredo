import Base from './Base';

export default class UserRPC extends Base {
    static get endpoint() {
        return 'User'
    };

    static register(data) {
        return super.fetchData('register', data);
    }

    static signIn(data) {
        return super.fetchData('signIn', data);
    }
}
