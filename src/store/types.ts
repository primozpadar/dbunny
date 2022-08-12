import type { Writable } from 'svelte/store';

export type State = {
  tables: Writable<Table[]>;
  selectedTable: Writable<SelectedTable | null>;
  relations: Writable<TableRelation[]>;
  newRelation: Writable<Partial<TableRelationBase>>;
};

export type SelectedTable = {
  ref: HTMLDivElement;
  id: UUID;
};

export type TableRelationBase = {
  from: UUID;
  to: UUID;
};

export enum RelationType {
  MANY_TO_ONE = 'MANY_TO_ONE',
  ONE_TO_ONE = 'ONE_TO_ONE',
}

export type TableRelation = TableRelationBase & {
  type: RelationType;
};

export type RelationRow = {
  type: RowType;
  name: string;
};

export type UUID = string;

export type Position = {
  x: number;
  y: number;
};

export enum RowType {
  INT = 'INT',
  VARCHAR = 'VARCHAR',
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  TIMESTAMP = 'TIMESTAMP',
  // TODO - add more database types
}

export type TableRow = {
  name: string;
  type: RowType;
  nullable?: boolean;
  pk?: boolean;
};

export type Table = {
  id: UUID;
  title: string;
  position: Position;
  rows: TableRow[];
};
