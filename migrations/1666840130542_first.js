/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('rick', {
        id: {type: 'smallint', primaryKey: true},
        name: { type: 'text', notNull: true },
        status: { type: 'text', notnull: true },
        origin_name: { type: 'text', notNull: true},
        origin_url: 'text',
        location_name: { type: 'text', notNull: true},
        location_url: 'text',
        image: 'text',
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
          },



      })
};

exports.down = pgm => {};
