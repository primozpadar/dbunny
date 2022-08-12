import { writable } from 'svelte/store';
import type { State } from './types';

export const tables: State['tables'] = writable([]);

export const selectedTable: State['selectedTable'] = writable(null);

export const relations: State['relations'] = writable([]);

export const newRelation: State['newRelation'] = writable({ from: null, to: null });
