import { combineReducers } from 'redux';

const requireModule: any = require.context('.', true, /^(?!.\/index).*Reducer.ts$/);

const modules: any = {};

requireModule.keys().forEach(filename => {
    const moduleName: string = filename.replace(/(\.\/|\.ts)/g, '');
    modules[moduleName] = requireModule(filename).default;
});

export default combineReducers(modules);
