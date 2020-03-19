const initialState = {
  data: [],
  dataMock: [],
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
