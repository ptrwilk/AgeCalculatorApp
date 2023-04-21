import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { CaptionNumericField, ConfirmButton, NumberText } from "./Controls";
import { useState } from "react";
import { differenceInDays } from "date-fns";

type Validation = {
  isValid: boolean;
  errorMessage: string;
};

type ValidatorType = "single-field" | "fields";

type Validator = {
  type: ValidatorType;
  validate: (value?: any) => Validation;
};

type TextField = {
  value?: number;
  caption: string;
  placeholder: string;
  maxLength: number;
  validators: Validator[];
  errorMessage?: string;
};

type Date = {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
};

const createValidator = (
  validate: (value?: any) => boolean,
  errorMessage: string,
  type: ValidatorType = "single-field"
): Validator => {
  return {
    type: type,
    validate: (value?: any) => ({
      isValid: validate(value),
      errorMessage: errorMessage,
    }),
  };
};

const AgeCalculatorPage = () => {
  const between = (from: number, to: number) => (value: number) =>
    value >= from && value <= to;

  const notEmptyValidator = createValidator(
    (value?: any) => value !== undefined,
    "This field is required"
  );

  const dayValidators = [
    notEmptyValidator,
    createValidator(between(1, 31), "Must be a valid day"),
    createValidator(
      ({ day, month, year }: Date) => {
        if (!day || !month || !year) {
          return true;
        }

        const date = new Date(year!, month! - 1, day);
        date.setFullYear(year!);

        return (
          date.getDate() === day! &&
          date.getMonth() === month! - 1 &&
          date.getFullYear() === year!
        );
      },
      "Must be a valid date",
      "fields"
    ),
  ];

  const monthValidators = [
    notEmptyValidator,
    createValidator(between(1, 12), "Must be a valid month"),
  ];

  const yearValidators = [
    notEmptyValidator,
    createValidator((value: number) => value > 0, "Must be a valid year"),
    createValidator(
      ({ day, month, year }: Date) => {
        const date = new Date();

        if ((!day || !month) && year! > date.getFullYear()) {
          return false;
        }

        return true;
      },
      "Must be in the past",
      "fields"
    ),
    createValidator(
      ({ day, month, year }: Date) => {
        if (!day || !month) return true;

        const date = new Date(year!, month! - 1, day!);
        const now = new Date();

        const diffInDays = differenceInDays(now, date);

        return diffInDays > 0;
      },
      "Must be in the past",
      "fields"
    ),
  ];

  const calcualteResult = ({ day, month, year }: Date): Date => {
    const now = new Date();
    const date = new Date(year!, month! - 1, day);
    date.setFullYear(year!);

    const diffInDays = differenceInDays(now, date);

    const years = Math.floor(diffInDays / 365);
    const remainingDays = diffInDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    return {
      day: days,
      month: months,
      year: years,
    };
  };

  const [textFields, setTextFields] = useState<TextField[]>([
    {
      caption: "day",
      placeholder: "DD",
      maxLength: 2,
      validators: dayValidators,
    },
    {
      caption: "month",
      placeholder: "MM",
      maxLength: 2,
      validators: monthValidators,
    },
    {
      caption: "year",
      placeholder: "YYYY",
      maxLength: 4,
      validators: yearValidators,
    },
  ]);

  const [error, setError] = useState(false);
  const [result, setResult] = useState<Date | undefined>();

  const handleTextFieldChange = (index: number, value?: number) => {
    const newTextFields = [...textFields];

    newTextFields[index].value = value;

    setTextFields(newTextFields);
  };

  const handleSubmit = () => {
    const newTextFields = [...textFields];

    newTextFields.map((x) => {
      x.errorMessage = undefined;
    });

    for (var textField of newTextFields) {
      for (var validator of textField.validators) {
        let validation: Validation = { isValid: true, errorMessage: "" };

        if (validator.type === "single-field") {
          validation = validator.validate(textField.value);
        } else {
          const { day, month, year }: Date = {
            day: newTextFields[0].value,
            month: newTextFields[1].value,
            year: newTextFields[2].value,
          };

          validation = validator.validate({
            day,
            month,
            year,
          });
        }

        const { isValid, errorMessage } = validation;

        if (!isValid) {
          textField.errorMessage = errorMessage;
          break;
        }
      }
    }

    const hasErrors = newTextFields.some((x) => x.errorMessage);

    const results: Date | undefined = hasErrors
      ? undefined
      : calcualteResult({
          day: newTextFields[0].value!,
          month: newTextFields[1].value!,
          year: newTextFields[2].value!,
        });

    setResult(results);
    setTextFields(newTextFields);
    setError(hasErrors);
  };

  return (
    <Box className={styles["container"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box className={styles["fields"]}>
          {textFields.map((textField, index) => (
            <CaptionNumericField
              {...textField}
              key={index}
              error={error}
              onValueChange={(value) => handleTextFieldChange(index, value)}
            />
          ))}
        </Box>
        <ConfirmButton className={styles["btn-confirm"]} />
      </form>
      <Box className={styles["results"]}>
        <NumberText value={result?.year} text="years" />
        <NumberText value={result?.month} text="months" />
        <NumberText value={result?.day} text="days" />
      </Box>
    </Box>
  );
};

export default AgeCalculatorPage;
