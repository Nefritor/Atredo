import axios from 'axios';
const baseUrl = 'http://13.48.194.48:5000';

const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

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

    static async _fromMain(request, data) {
        switch (request) {
            case 'getProjectList':
              const response = await axios.get(baseUrl+'/projects/');
              return response.data;
            case 'addProject':
                return await axios.post(baseUrl+'/projects/', JSON.stringify(data), {headers});
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static async _fromOperations(request, data) {
        switch (request) {
            case 'getAction':
              let action = await axios.get(baseUrl + '/action/' + data + '/');
              debugger;
              return action.data;
                // return this.getJsonFromLocalStorage('Actions').find((item) => item.key === data);
            case 'getActor':
              let actor = await axios.get(baseUrl + '/actor/' + data + '/');
              debugger;
              return actor.data;
                // return this.getJsonFromLocalStorage('Actors').find((item) => item.key === data);
            case 'getObject':
              let object = await axios.get(baseUrl + '/object/' + data + '/');
              debugger;
              return object.data;
                // return this.getJsonFromLocalStorage('Objects').find((item) => item.key === data);
            case 'getActionsList':
              let actions = await axios.get(baseUrl + '/actions/');
              debugger;
              return actions.data;
          // return this.getJsonFromLocalStorage('Actions');
            case 'getActorsList':
              let actors = await axios.get(baseUrl + '/actors/');
              debugger;
              return actors.data;
          // return this.getJsonFromLocalStorage('Actors');
            case 'getObjectsList':
              let objList = await axios.get(baseUrl + '/objects/');
              debugger;
              return objList.data;
          // return this.getJsonFromLocalStorage('Objects');
            case 'addAction':
              return await axios.post(baseUrl + '/actions/', {data});
          // return this.addItemToLocalStorage('Actions', data);
            case 'addActor':
              return await axios.post(baseUrl + '/actors/', {data});
                // return this.addItemToLocalStorage('Actors', data);
            case 'addObject':
              return await axios.post(baseUrl + '/objects/', {data});
                // return this.addItemToLocalStorage('Objects', data);
            case 'removeAction':
              return await axios.delete(baseUrl + '/object/' + data + '/');
          // return this.updateItemInLocalStorage('Actions', data);
            case 'removeActor':
              return await axios.delete(baseUrl + '/actor/' + data + '/');
          // return this.updateItemInLocalStorage('Actors', data);
            case 'removeObject':
              return await axios.delete(baseUrl + '/object/' + data + '/');
                // return this.updateItemInLocalStorage('Objects', data);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }

    static async _fromProjects(request, id, data) {
        switch (request) {
            case 'getStagesList':
              return await axios.get(baseUrl + /stage/ + id + '/');
                // return this.getItemFromLocalStorage('Stages', data);
            case 'addStage':
              return await axios.post(baseUrl + /stages/, data);
          // return this.addItemToLocalStorage('Stages', item, data);
            case 'updateStagesList':
              return await axios.put(baseUrl + /stage/ + id + '/', {data});
          // return this.updateItemInLocalStorage('Stages', data, item);
            default:
                throw Error(`Unknown request "${this.endpoint}.${request}"`);
        }
    }
    //
    // static getJsonFromLocalStorage(key) {
    //     return JSON.parse(localStorage.getItem(key)) || [];
    // }

    // static addItemToLocalStorage(key, item, dataKey) {
    //     const storageData = this.getJsonFromLocalStorage(key);
    //     const maxKeyValue = dataKey ? dataKey - 1 : Math.max(...storageData.map(x => x.key), -1);
    //     storageData.push({key: maxKeyValue + 1, ...item});
    //     localStorage.setItem(key, JSON.stringify(storageData));
    //     return maxKeyValue + 1;
    // }
    //
    // static getItemFromLocalStorage(key, dataKey) {
    //     return this.getJsonFromLocalStorage(key).find((item) => item.key === dataKey) || [];
    // }
    //
    // static updateItemInLocalStorage(key, dataKey = -1, item) {
    //     const storageData = this.getJsonFromLocalStorage(key);
    //
    //     const index = (() => {for (const id in storageData) {
    //         if (storageData.hasOwnProperty(id) && storageData[id].key === dataKey) {
    //             return id;
    //         }
    //     }})();
    //     if (index) {
    //         const args = [parseInt(index, 10), 1];
    //         if (item) {
    //             args.push(item);
    //         }
    //         storageData.splice(...args);
    //         localStorage.setItem(key, JSON.stringify(storageData));
    //         return item || storageData;
    //     } else if (dataKey !== -1) {
    //         storageData.push(item);
    //         localStorage.setItem(key, JSON.stringify(storageData));
    //         return item;
    //     } else {
    //         console.warn(`There is nothing to update... Unknown key "${dataKey}" of "${key}"`);
    //     }
    // }
}