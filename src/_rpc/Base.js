export default class Base {
    static fetchData(endpoint, request, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    (() => {
                        switch (endpoint) {
                            case 'Main':
                                return this._fromMain(request, data);
                        }
                    })()
                );
            }, 300);
        });
    }

    static _fromMain(request, data) {
        switch (request) {
            case 'getProjectList':
                return this.getJsonFromLocalStorage('Projects');
            case 'addProject':
                break;
        }
    }

    static getJsonFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    static addItemToLocalStorage(key, data) {
        const storageData = this.getJsonFromLocalStorage(key);
        storageData.push(data);
        localStorage.setItem('key', JSON.stringify(storageData));
    }
}