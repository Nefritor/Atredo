import Base from './Base';

export default class ProjectRPC extends Base {
    static endpoint = 'Project';

    static getStagesList(key) {
        return super.fetchData('getStagesList', key);
    }

    static addStage(key, item) {
        return super.fetchData('addStage', key, item);
    }

    static updateStagesList(key, item) {
        return super.fetchData('updateStagesList', key, item);
    }
}
