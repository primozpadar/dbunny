import { v4 as uuidv4 } from 'uuid';
import { tables, selectedTable, relations, newRelation } from './state';
import {
  RelationType,
  RowType,
  type Table,
  type Position,
  type SelectedTable,
  type TableRelation,
  type UUID,
} from './types';

const tableActions = {
  createTable() {
    const newTable: Table = {
      // prefix id with letter because .querySelector() fails if first character is a number
      id: 'id-' + uuidv4(),
      title: 'table',
      position: {
        x: 100,
        y: 100,
      },
      rows: [
        {
          name: 'id',
          type: RowType.INT,
          pk: true,
        },
      ],
    };

    tables.update((value) => {
      value.push(newTable);
      return value;
    });
  },
  setPosition(id: UUID, position: Position) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === id);
      value[idx].position = position;
      return value;
    });
  },
  setSelected(data: SelectedTable) {
    selectedTable.update((value) => {
      value = data;
      return value;
    });
  },
};

const editorActions = {
  setTitle(tableId: UUID, title: string) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].title = title.replace(' ', '_');
      return value;
    });
  },
  setRowName(tableId: UUID, index: number, name: string) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].rows[index].name = name.replace(' ', '_');
      return value;
    });
  },
  setRowType(tableId: UUID, index: number, type: RowType) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].rows[index].type = type;
      return value;
    });
  },
  setRowPk(tableId: UUID, index: number, pk: boolean) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].rows[index].pk = pk;
      return value;
    });
  },
  setRowNullable(tableId: UUID, index: number, nullable: boolean) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].rows[index].nullable = nullable;
      return value;
    });
  },
  addRow(tableId: UUID) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      value[idx].rows.push({
        name: '',
        type: RowType.INT,
      });
      return value;
    });
  },
  removeRow(tableId: UUID, index: number) {
    tables.update((value) => {
      const idx = value.findIndex((table) => table.id === tableId);
      const rows = [...value[idx].rows.slice(0, index), ...value[idx].rows.slice(index + 1)];
      value[idx].rows = rows;
      return value;
    });
  },
};

const relationActions = {
  addRelation(from: UUID, to: UUID) {
    // check if already exists
    // TODO - should be cyclical relations enabled?
    function checkTwoWay(relation: TableRelation) {
      return (relation.from === from && relation.to === to) || (relation.from === to && relation.to === from);
    }

    relations.update((value) => {
      if (value.findIndex(checkTwoWay) < 0) {
        value.push({ from, to, type: RelationType.MANY_TO_ONE });
      }

      return value;
    });

    newRelation.set({ from: null, to: null });
  },
};

export const actions = {
  table: tableActions,
  editor: editorActions,
  relations: relationActions,
};
