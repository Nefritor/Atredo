import Base from './Base';

export default class MainRPC extends Base {
    static get endpoint() {
        return 'Main'
    };

    static getProjectList(data) {
        return super.fetchData('getProjectList', data);
    }

    static addProject(data) {
        return super.fetchData('addProject', data);
    }
}
