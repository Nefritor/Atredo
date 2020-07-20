export function StatePromiseSwitch(setStateFunc, stateNames, states, promise) {
    return new Promise((resolve) => {
        setStateFunc(
            stateNames.reduce((a, v, i) => {
                return {...a, [v]: states[i][0]}
            }, {})
        );
        promise.then(() => {
            setStateFunc(
                stateNames.reduce((a, v, i) => {
                    return {...a, [v]: states[i][1]}
                }, {})
            );
            resolve();
        });
    });
}

export function StateTimeoutSwitch(setStateFunc, stateNames, states, timeout) {
    return new Promise((resolve) => {
        setStateFunc(
            stateNames.reduce((a, v, i) => {
                return {...a, [v]: states[i][0]}
            }, {})
        );
        setTimeout(() => {
            setStateFunc(
                stateNames.reduce((a, v, i) => {
                    return {...a, [v]: states[i][1]}
                }, {})
            );
            resolve();
        }, timeout);
    });
}