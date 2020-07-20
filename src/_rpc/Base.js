export default class Base {
    static endpoint;
    static apiPath = '/api/';

    static fetchData(request, data, item) {
        if (this.endpoint) {
            return new Promise((resolve) => {
                resolve(
                    (() => {
                        switch (this.endpoint) {
                            case 'Main':
                                return this._fromMain(request, data);
                            case 'Operation':
                                return this._fromOperations(request, data);
                            case 'Project':
                                return this._fromProjects(request, data, item);
                            case 'User':
                                return this._fromUser(request, data, item);
                            default:
                                throw Error(`Unknown endpoint "${this.endpoint}"`);
                        }
                    })()
                );
            });
        } else {
            throw Error(`There is no endpoint at "${request}" request`);
        }
    }

    static async postData(path, data) {
        return fetch(this.apiPath + path, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            try {
                return await response.json();
            } catch {
                return {
                    success: response.status === 200,
                    message: response.statusText
                };
            }
        });
    }

    static _fromMain(request, data) {
        switch (request) {
            case 'getProjectList':
                return this.getJsonFromLocalStorage('Projects');
            case 'addProject':
                return this.addItemToLocalStorage('Projects', data);
            case 'deleteProject':
                return this.deleteItemFromLocalStorage('Projects', data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static _fromOperations(request, data) {
        switch (request) {
            case 'getAction':
                return this.getJsonFromLocalStorage('Actions').find((item) => {
                    this._checkForObjectProperty(item, 'key');
                    return item.key === data
                });
            case 'getActor':
                return this.getJsonFromLocalStorage('Actors').find((item) => {
                    this._checkForObjectProperty(item, 'key');
                    return item.key === data
                });
            case 'getObject':
                return this.getJsonFromLocalStorage('Objects').find((item) => {
                    this._checkForObjectProperty(item, 'key');
                    return item.key === data
                });
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
            case 'deleteStage':
                const stagesData = this.getItemFromLocalStorage('Stages', data);
                let hasKey = false;
                for (const i in stagesData) {
                    if (stagesData.hasOwnProperty(i) && stagesData[i].key === item) {
                        hasKey = true;
                        delete stagesData[i];
                        break;
                    }
                }
                if (hasKey) {
                    this.updateItemInLocalStorage('Stages', data, stagesData);
                    return true;
                } else {
                    return Error('Trying to delete nonexistent item');
                }
            case 'updateStagesList':
                return this.updateItemInLocalStorage('Stages', data, item);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static _fromUser(request, data) {
        switch (request) {
            case 'register':
                return this.userRegister(data);
            case 'signIn':
                return this.userSignIn(data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static userRegister(data) {
        return this.postData('register', data);
    }

    static userSignIn(data) {
        return this.postData('signin', data);
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
        this._checkForNumber(dataKey);
        return this.getJsonFromLocalStorage(key).find((item) => {
            this._checkForObjectProperty(item, 'key');
            return item.key === dataKey
        }) || [];
    }

    static deleteItemFromLocalStorage(key, dataKey) {
        this._checkForNumber(dataKey);
        const storageData = this.getJsonFromLocalStorage(key);

        let hasKey = false;
        for (const i in storageData) {
            if (storageData.hasOwnProperty(i) && storageData[i].key === dataKey) {
                hasKey = true;
                delete storageData[i];
                break;
            }
        }
        if (hasKey) {
            localStorage.setItem(key, JSON.stringify(storageData));
            return true;
        } else {
            return Error('Trying to delete nonexistent item');
        }
    }

    static updateItemInLocalStorage(key, dataKey = -1, item) {
        this._checkForNumber(dataKey);

        const storageData = this.getJsonFromLocalStorage(key);

        const index = (() => {
            for (const id in storageData) {
                if (storageData.hasOwnProperty(id)) {
                    this._checkForObjectProperty(storageData[id], 'key');
                    if (storageData[id].key === dataKey) {
                        return id;
                    }
                }
            }
        })();
        if (index) {
            const args = [parseInt(index, 10), 1];
            if (item) {
                args.push(item);
            }
            storageData.splice(...args);
            localStorage.setItem(key, JSON.stringify(storageData));
            return item || storageData;
        } else if (dataKey !== -1) {
            if (item) {
                storageData.push(item);
                localStorage.setItem(key, JSON.stringify(storageData));
                return item;
            } else {
                console.warn(`There is nothing to update... Unknown key "${dataKey}" of "${key}"`);
                return Error('There is nothing to update... Unknown key "${dataKey}" of "${key}"');
            }
        }
    }

    static _checkForNumber(value) {
        if (typeof value !== 'number') {
            return Error('Value must be type of number')
        }
    }

    static _checkForObjectProperty(object, propertyName) {
        if (!object.hasOwnProperty(propertyName)) {
            return Error(`Object has no property named "${propertyName}"`)
        }
    }
}