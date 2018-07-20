import test from 'ava';

import { isNonEmpty, isAuthorName, formatDate } from '../util';

test('isNonEmpty returns false when empty', t => {
  [
    null,
    false,
    undefined,
    ''
  ]
    .forEach(value => {
      t.false(isNonEmpty(value));
    });
});

test('isNonEmpty returns true when valid', t => {
  [
    'Hello World',
    'U',
    '1'
  ]
    .forEach(value => {
      t.true(isNonEmpty(value));
    });
});

test('isAuthorName returns false when not valid author name', t => {
  [
    'Dustin',
    '',
    false,
    undefined,
    null
  ]
    .forEach(value => {
      t.false(isAuthorName(value));
    });
});

test('isAuthorName returns true when valid author', t => {
  [
    'Dustin Schau',
    'D S',
    'dustin schau'
  ]
    .forEach(value => {
      t.true(isAuthorName(value));
    });
});

test('it formats date', t => {
  t.is(formatDate(new Date('10/08/1990')), '1990-10-08');
});
