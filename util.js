const format = require('date-fns/format');

exports.isNonEmpty = value => !!(value && value.length > 0);

exports.isAuthorName = value => !!(value && value.split(' ').length >= 2);

exports.formatDate = value => format(value, 'YYYY-MM-DD');
