import { enableMapSet } from 'immer';

import { State } from './State';
import { Store } from './Store';
import { useSpecoladaStore, SpecoladaStoreProvider } from './Context';
import { upgradeModelsForImmer } from './helpers';


upgradeModelsForImmer();
enableMapSet();


export type TreeNode = import('./TreeNode').TreeNode;
export type Id = import('./TreeNode').Id;

export { Store, State, SpecoladaStoreProvider, useSpecoladaStore };
