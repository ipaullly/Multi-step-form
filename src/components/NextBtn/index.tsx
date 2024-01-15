import { Button } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ValidationSchema } from "../../schema/formSchema";
import { checkFormErrors } from "../../utils/reusables";

interface BtnProps {
  setTab: (args: number) => void;
  setFirstFormErrors: (args: [] | string[]) => void;
  errors: FieldErrors<ValidationSchema>;
}

const NextBtn: React.FC<BtnProps> = ({
  setTab,
  setFirstFormErrors,
  errors,
}) => {
  const handleNextBtn = () => {
    setTab(1);
    const newErrorsArr = checkFormErrors(errors, "first");
    setFirstFormErrors(newErrorsArr);
  };
  return (
    <Button
      onClick={() => {
        handleNextBtn();
      }}
      variant="contained"
      color="secondary"
    >
      Next
    </Button>
  );
};

export default NextBtn;
