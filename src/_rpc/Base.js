export default class Base {
    static endpoint;

    static fetchData(request, data) {
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
                return this.removeItemFromLocalStorage('Actions', data);
            case 'removeActor':
                return this.removeItemFromLocalStorage('Actors', data);
            case 'removeObject':
                return this.removeItemFromLocalStorage('Objects', data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static getJsonFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    static addItemToLocalStorage(key, data) {
        const storageData = this.getJsonFromLocalStorage(key);
        const maxKeyValue = Math.max(...storageData.map(x => x.key), -1);
        storageData.push({key: maxKeyValue + 1, ...data});
        localStorage.setItem(key, JSON.stringify(storageData));
        return maxKeyValue + 1;
    }

    static removeItemFromLocalStorage(key, dataKey) {
        const storageData = this.getJsonFromLocalStorage(key);

        const index = (() => {for (const id in storageData) {
            if (storageData.hasOwnProperty(id) && storageData[id].key === dataKey) {
                return id;
            }
        }})();
        if (index) {
            storageData.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(storageData));
            return storageData;
        } else {
            console.warn(`There is nothing to delete... Unknown key "${dataKey}" of "${key}"`);
        }
    }
}