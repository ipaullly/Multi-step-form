import { Button } from "@mui/material";
import React from "react";

interface BtnProps {
  setTab: (args: number) => void;
}

const PreviousBtn: React.FC<BtnProps> = ({ setTab }) => {
  return (
    <Button onClick={() => setTab(0)} variant="contained" color="secondary">
      Back
    </Button>
  );
};

export default PreviousBtn;
