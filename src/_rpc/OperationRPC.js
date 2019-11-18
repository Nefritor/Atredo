import Base from './Base';

export default class OperationRPC extends Base {
    static endpoint = 'Operation';

    static getAction(key) {
        return super.fetchData('getAction', key);
    }

    static getActor(key) {
        return super.fetchData('getActor', key);
    }

    static getObject(key) {
        return super.fetchData('getObject', key);
    }

    static getActionsList() {
        return super.fetchData('getActionsList');
    }

    static getActorsList() {
        return super.fetchData('getActorsList');
    }

    static getObjectsList() {
        return super.fetchData('getObjectsList');
    }

    static addAction(data) {
        return super.fetchData('addAction', data);
    }

    static addActor(data) {
        return super.fetchData('addActor', data);
    }

    static addObject(data) {
        return super.fetchData('addObject', data);
    }

    static removeAction(data) {
        return super.fetchData('removeAction', data);
    }

    static removeActor(data) {
        return super.fetchData('removeActor', data);
    }

    static removeObject(data) {
        return super.fetchData('removeObject', data);
    }
}
