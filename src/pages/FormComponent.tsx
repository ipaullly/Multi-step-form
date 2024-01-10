import React from 'react'
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';

interface FormComponentProps {
  tab: number;
}

const FormComponent: React.FC<FormComponentProps> = ({ tab }) => {
  switch (tab) {
    case 0:
        return <FirstForm />;
    case 1:
        return <SecondForm />;
    default:
        break;
  }
}

export default FormComponent