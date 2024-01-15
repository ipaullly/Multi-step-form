const firstFormKeys = ["title", "tags", "assignee"];
const secondFormKeys = ['startDate', 'endDate', 'target'];
let formKeys: string | string[] = [];

export const checkFormErrors = (errors: object, step: string) => {
  formKeys = step === 'first'? firstFormKeys: secondFormKeys
  const errorFields = Object.keys(errors);
  const newErrorsArr: string[] = [];
  errorFields.forEach((item) => {
    if (formKeys.includes(item)) {
      newErrorsArr.push(item);
    }
  });
  return newErrorsArr;
}

export const names = [
  {
    id: 0,
    name: 'red'
  },
  {
    id: 1,
    name: 'blue'
  },
  {
    id: 2,
    name: 'yellow'
  },
  {
    id: 3,
    name: 'purple'
  },
  {
    id: 4,
    name: 'green'
  }
];

export const assignees = [
  {
    id: 0,
    name: 'Powell'
  },
  {
    id: 1,
    name: 'Regina'
  },
  {
    id: 2,
    name: 'Obadiah'
  },
  {
    id: 3,
    name: 'Josiah'
  },
  {
    id: 4,
    name: 'Zoe'
  }
];

export const defaultFormValues = {
  assignee:"3",
  endDate:"2024-01-27T21:00:00.000Z",
  startDate:"2024-01-15T21:00:00.000Z",
  tags: ['1', '2', '3'],
  description: "eleifend laoreet elit. Donec a quam lorem. Fusce hendrerit sem ac euismod lobortis. Donec in nunc at ligula mollis dignissim iaculis eu tortor. Nunc maximus dolor id nibh vestibulum facilisis.",
  target:"2,000",
  title:"House Morogo"
}