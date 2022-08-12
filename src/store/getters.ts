import { derived } from 'svelte/store';
import { relations, selectedTable, tables } from './state';
import type { RelationRow, UUID } from './types';

const tableGetters = {
  selectedTable: derived([tables, selectedTable], ([$tables, $selectedTable]) => {
    return $tables.find((value) => value.id === $selectedTable?.id);
  }),
  selectedTableBoundingBox: derived([tables, selectedTable], ([$tables, $selectedTable]) => {
    const table = $tables.find((value) => value.id === $selectedTable?.id);
    if (!table) {
      return null;
    }

    const data = $selectedTable?.ref.getBoundingClientRect();

    // map x and y from table directly to improve performance
    return {
      x: table.position.x,
      y: table.position.y,
      width: data.width,
      height: data.height,
    };
  }),
};

const editorGetters = {};

const relationsGetters = {
  getTableRelations(tableId: UUID) {
    return derived([tables, relations], ([$tables, $relations]) => {
      const tableRelations = $relations.filter((relation) => relation.from === tableId);

      return tableRelations
        .map<RelationRow>((relation) => {
          const tableRelated = $tables.find((table) => table.id === relation.to);
          const pkRow = tableRelated.rows.find((value) => value.pk === true);
          if (!pkRow) {
            // TODO - handle no pk row
            return null;
          }

          return {
            type: pkRow.type,
            name: `${tableRelated.title}-${pkRow.name}`,
          };
        })
        .filter(Boolean);
    });
  },
};

export const getters = {
  table: tableGetters,
  editor: editorGetters,
  relations: relationsGetters,
};
