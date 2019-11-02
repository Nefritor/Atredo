import Base from './Base';

export default class MainRPC extends Base {
    static endpoint = 'Main';
    static getProjectList(data) {
        return super.fetchData(this.endpoint, 'getProjectList', data);
    }

    static addProject(data) {
        return super.fetchData(this.endpoint, 'addProject', data);
    }
}
