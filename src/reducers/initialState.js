const initialState = {
  data: [],
  dataMock: [],
  dataMockFilter: [],
  dataMockOn: false,
  dataMockFilterOn: false,
  onLoad: false,
  error: '',
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        condition: '',
        value: '',
      },
    },
  ],
};

export default initialState;
