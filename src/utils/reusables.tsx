const firstFormKeys = ["title", "tags", "assignee"];
const secondFormKeys = ['startDate', 'endDate', 'target'];
let formKeys: string | string[] = [];

export const checkFormErrors = (errors: object, step: string) => {
  formKeys = step === 'first'? firstFormKeys: secondFormKeys
  // console.log("error fields", Object.keys(errors));
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