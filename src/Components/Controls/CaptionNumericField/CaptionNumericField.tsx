import { Box, Typography, styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import styles from "./styles.module.css";
import classNames from "classnames";

const errorColor = "hsl(0, 100%, 67%)";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ error }) => ({
  width: "100%",
  ".MuiOutlinedInput-root": {
    color: "hsl(0, 0%, 8%)",
    "&:hover fieldset": {
      borderColor: error ? errorColor : "hsl(0, 1%, 44%)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "hsl(259, 100%, 65%)",
    },
    "&.Mui-error fieldset": {
      borderColor: errorColor,
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "hsl(0, 0%, 86%)",
      borderWidth: 1.5,
      borderRadius: "0.5rem",
    },
    ".MuiOutlinedInput-input": {
      padding: `0.8rem 1rem`,
      fontWeight: 700,
    },
  },
}));

interface CaptionNumericFieldProps {
  className?: string;
  value?: number;
  maxLength?: number;
  caption?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  onValueChange?: (value?: number) => void;
}

const CaptionNumericField = ({
  className,
  value,
  maxLength = 10,
  caption,
  placeholder,
  error,
  errorMessage,
  onValueChange,
}: CaptionNumericFieldProps) => {
  const handleValueChange = (text?: string) => {
    if (text === "") {
      onValueChange?.(undefined);
    }
    if (text!.length <= maxLength && /^[0-9\b]+$/.test(text!)) {
      onValueChange?.(text ? Number(text) : undefined);
    }
  };

  return (
    <Box className={classNames(styles["container"], className)}>
      <Typography
        className={classNames(styles["caption"], {
          [styles["caption-error"]]: error,
        })}
      >
        {caption}
      </Typography>
      <TextFieldStyled
        placeholder={placeholder}
        value={value?.toString() ?? ""}
        error={error}
        helperText={error ? errorMessage : undefined}
        FormHelperTextProps={{ sx: { fontSize: 10, marginLeft: 0 } }}
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </Box>
  );
};

export { CaptionNumericField };
export default CaptionNumericField;
