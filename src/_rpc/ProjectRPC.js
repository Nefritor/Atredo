import Base from './Base';

export default class ProjectRPC extends Base {
    static endpoint = 'Project';

    static getStagesList(key) {
        return super.fetchData('getStagesList', key);
    }

    static addStage(dataKey, item) {
        return super.fetchData('addStage', item, dataKey);
    }

    static deleteStage(projectKey, dataKey) {
        return super.fetchData('deleteStage', projectKey, dataKey);
    }

    static updateStagesList(key, item) {
        return super.fetchData('updateStagesList', key, item);
    }
}
