import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css";
import classNames from "classnames";

interface INumberTextProps {
  className?: string;
  value?: number;
  text?: string;
}

const NumberText = ({ className, value, text }: INumberTextProps) => {
  return (
    <Box className={classNames(styles["container"], className)}>
      <Typography className={styles["number"]}>{value ?? "- -"}</Typography>
      <Typography className={styles["text"]}>{text}</Typography>
    </Box>
  );
};

export { NumberText };
export default NumberText;
