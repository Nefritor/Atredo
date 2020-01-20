export default class Base {
    static endpoint;

    static fetchData(request, data, item) {
        if (this.endpoint) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        (() => {
                            switch (this.endpoint) {
                                case 'Main':
                                    return this._fromMain(request, data);
                                case 'Operation':
                                    return this._fromOperations(request, data);
                                case 'Project':
                                    return this._fromProjects(request, data, item);
                                default:
                                    throw Error(`Unknown endpoint "${this.endpoint}"`);
                            }
                        })()
                    );
                }, 300);
            });
        } else {
            throw Error(`There is no endpoint at "${request}" request`);
        }
    }

    static _fromMain(request, data) {
        switch (request) {
            case 'getProjectList':
                return this.getJsonFromLocalStorage('Projects');
            case 'addProject':
                return this.addItemToLocalStorage('Projects', data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static _fromOperations(request, data) {
        switch (request) {
            case 'getAction':
                return this.getJsonFromLocalStorage('Actions').find((item) => item.key === data);
            case 'getActor':
                return this.getJsonFromLocalStorage('Actors').find((item) => item.key === data);
            case 'getObject':
                return this.getJsonFromLocalStorage('Objects').find((item) => item.key === data);
            case 'getActionsList':
                return this.getJsonFromLocalStorage('Actions');
            case 'getActorsList':
                return this.getJsonFromLocalStorage('Actors');
            case 'getObjectsList':
                return this.getJsonFromLocalStorage('Objects');
            case 'addAction':
                return this.addItemToLocalStorage('Actions', data);
            case 'addActor':
                return this.addItemToLocalStorage('Actors', data);
            case 'addObject':
                return this.addItemToLocalStorage('Objects', data);
            case 'removeAction':
                return this.updateItemInLocalStorage('Actions', data);
            case 'removeActor':
                return this.updateItemInLocalStorage('Actors', data);
            case 'removeObject':
                return this.updateItemInLocalStorage('Objects', data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static _fromProjects(request, data, item) {
        switch (request) {
            case 'getStagesList':
                return this.getItemFromLocalStorage('Stages', data);
            case 'addStage':
                return this.addItemToLocalStorage('Stages', item, data);
            case 'updateStagesList':
                return this.updateItemInLocalStorage('Stages', data, item);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static getJsonFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    static addItemToLocalStorage(key, item, dataKey) {
        const storageData = this.getJsonFromLocalStorage(key);
        const maxKeyValue = dataKey ? dataKey - 1 : Math.max(...storageData.map(x => x.key), -1);
        storageData.push({key: maxKeyValue + 1, ...item});
        localStorage.setItem(key, JSON.stringify(storageData));
        return maxKeyValue + 1;
    }

    static getItemFromLocalStorage(key, dataKey) {
        return this.getJsonFromLocalStorage(key).find((item) => item.key === dataKey) || [];
    }

    static updateItemInLocalStorage(key, dataKey = -1, item) {
        const storageData = this.getJsonFromLocalStorage(key);

        const index = (() => {for (const id in storageData) {
            if (storageData.hasOwnProperty(id) && storageData[id].key === dataKey) {
                return id;
            }
        }})();
        if (index) {
            const args = [parseInt(index, 10), 1];
            if (item) {
                args.push(item);
            }
            storageData.splice(...args);
            localStorage.setItem(key, JSON.stringify(storageData));
            return item || storageData;
        } else if (dataKey !== -1) {
            storageData.push(item);
            localStorage.setItem(key, JSON.stringify(storageData));
            return item;
        } else {
            console.warn(`There is nothing to update... Unknown key "${dataKey}" of "${key}"`);
        }
    }
}