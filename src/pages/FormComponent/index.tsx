import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SecondForm from "../SecondForm";
import PreviousBtn from "../../components/PreviousBtn";
import NextBtn from "../../components/NextBtn";

import {
  FormComponentProps,
  ValidationSchema,
  validationSchema,
} from "../../schema/formSchema";
import {
  Box,
  Button,
  Modal,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import FirstForm from "../FirstForm";

import "./index.css";
import dayjs, { Dayjs } from "dayjs";
import TabComponent from "../../components/TabComponent";
import { defaultFormValues, names } from "../../utils/reusables";

export type Itag = {
  id: number;
  name: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FormComponent: React.FC<FormComponentProps> = ({ tab, setTab }) => {
  const [age, setAge] = React.useState("");
  const [tags, setTags] = React.useState<string[]|number[]>([]);
  const [tagNames] = React.useState<Itag[]>(names);
  const [rangeDuration, setRangeDuration] = React.useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] = React.useState<
    string | number | Date | Dayjs | undefined
  >();

  const [startDateVal, setStartDateVal] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [endDateVal, setEndDateVal] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );

  const [firstFormErrors, setFirstFormErrors] = React.useState<string[]>([]);
  const [secondFormErrors, setSecondFormErrors] = React.useState<string[]>([]);

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    // defaultValues: {
    //   // Your values here
    //   title: '',
    //   assignee: '',
    //   tags: tags,
    //   startDate: '',
    //   endDate: '',
    //   target: ''
    // },
    defaultValues: defaultFormValues,
  });

  React.useEffect(() => {
    const errorArray = Object.keys(errors);
    if (errorArray.length > 0) {
      const firstFormKeys = ["title", "tags", "assignee"];
      const secondFormKeys = ["startDate", "endDate", "target"];
      const errorKeys: string[] = [];
      const secondErrorKeys: string[] = [];
      errorArray.forEach((elem) => {
        if (firstFormKeys.includes(elem)) {
          errorKeys.push(elem);
        }
        if (secondFormKeys.includes(elem)) {
          secondErrorKeys.push(elem);
        }
      });

      setFirstFormErrors(errorKeys);
      setSecondFormErrors(secondErrorKeys);
      if (errorKeys.length >= 1) {
        setTab(0);
      } else {
        setTab(1);
      }
    }
    return () => {};
  }, [errors, setTab]);

  React.useEffect(() => {
    const defaultTags = getValues("tags")
      .map(
        (item: number | string) => Number(item)
      );
    const defaultStartDate = getValues("startDate");
    const defaultEndDate = getValues("endDate");
    if (defaultTags.length > 0) {
      setTags(defaultTags);
    }
    if (defaultStartDate && defaultEndDate) {
      const date1 = dayjs(defaultStartDate);
      const duration = dayjs(defaultEndDate).diff(date1, "day", true);
      setRangeDuration(duration);
    }
    return () => {};
  }, [getValues]);

  React.useEffect(() => {
    const subscription = watch((value, options) => {
      if (options.name === "startDate") {
        setSelectedStartDate(dayjs(value?.startDate));
      }
      if (options.name === "endDate") {
        const date1 = dayjs(value?.startDate);
        const duration = dayjs(value?.endDate).diff(date1, "day", true);
        setRangeDuration(duration);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    if (Object.keys(errors).length) {
      setFirstFormErrors([]);
      setSecondFormErrors([]);
    }
    handleOpen();
    console.log("Form data", data);
  };

  return (
    <div className="form__component">
      <TabComponent
        setTab={setTab}
        tab={tab}
        firstFormErrors={firstFormErrors}
        secondFormErrors={secondFormErrors}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {tab === 0 ? (
          <FirstForm
            register={register}
            errors={errors}
            assignee={age}
            handleAssigneeChange={handleAssigneeChange}
            setFirstFormErrors={setFirstFormErrors}
            tags={tags}
            tagNames={tagNames}
            control={control}
            setTags={setTags}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        ) : (
          <SecondForm
            register={register}
            errors={errors}
            startDate={startDateVal}
            endDate={endDateVal}
            control={control}
            setSecondFormErrors={setSecondFormErrors}
            setStartDateVal={setStartDateVal}
            setEndDateVal={setEndDateVal}
            setValue={setValue}
            selectedStartDate={selectedStartDate}
            rangeDuration={rangeDuration}
            clearErrors={clearErrors}
          />
        )}
        {tab === 0 ? (
          <div className="first__form_btns">
            <NextBtn
              setTab={setTab}
              setFirstFormErrors={setFirstFormErrors}
              errors={errors}
            />
          </div>
        ) : (
          <div className="second__form_btns">
            <PreviousBtn setTab={setTab} />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        )}
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Form Submission
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Details submitted successfully
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FormComponent;
