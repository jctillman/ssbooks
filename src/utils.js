import moment from 'moment';

// Books API:
// Endpoint for customRange:  /api/range/:startMs/:endMs/:bookStart/:bookEnd/:searchString
// Endpoint for preset Range: /api/${presetRange}/:bookStart/:bookEnd/:searchString

export const createCustomRangeUrl = (customRange, pageStart, pageEnd, searchString) => (
  `/api/range/${customRange.customStart}/${customRange.customEnd}/${pageStart}/${pageEnd}/${searchString}`
);

export const createPresetRangeUrl = (presetRange, pageStart, pageEnd, searchString) => (
  `/api/${presetRange}/${pageStart}/${pageEnd}/${searchString}`
);

export const unixToFormatted = (unixTimestamp) => (
  moment.unix(unixTimestamp).format('YYYY-MM-DD')
);

export const formattedToUnix = (formattedDate) => (
  moment(formattedDate).valueOf()
);

export const rangeOptions = [
  {
    value: 'week',
    displayText: 'Past week'
  },
  {
    value: 'month',
    displayText: 'Past month'
  },
  {
    value: 'all',
    displayText: 'All'
  },
  {
    value: 'custom',
    displayText: 'Custom dates'
  }
];

export const mockComment = {
  date: 'Comment date',
  author: 'Comment author',
  text: 'Comment text'
}

export const mockBook = {
  title: 'Title',
  author: 'Author',
  imgSrc: 'http://placehold.it/150x200',
  comments: [mockComment, mockComment, mockComment]
};

export const mockBooks = [
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook,
  mockBook
];
