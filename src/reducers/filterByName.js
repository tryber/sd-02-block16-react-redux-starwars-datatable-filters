const INITIAL_STATE = {
  filters: [
    {
      name: '',
    },
  ],
};

const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER';

export default function filterByName(state = INITIAL_STATE, {
  type, nameFilterProp,
}) {
  switch (type) {
    case CHANGE_NAME_FILTER:
      return {
        filters: state.filters.map((filter) => {
          if ('name' in filter) return nameFilterProp;
          return filter;
        }),
      };
    default:
      return state;
  }
}
