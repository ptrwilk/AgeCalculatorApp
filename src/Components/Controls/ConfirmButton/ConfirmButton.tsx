import { Box, Divider, IconButton } from "@mui/material";
import styles from "./styles.module.css";
import { ReactComponent as IconArrow } from "../../../assets/icon-arrow.svg";
import classNames from "classnames";

interface IConfirmButton {
  className?: string;
}

const ConfirmButton = ({ className }: IConfirmButton) => {
  return (
    <Box className={classNames(styles["container"], className)}>
      <Divider />
      <IconButton className={styles["btn"]} type="submit">
        <IconArrow />
      </IconButton>
    </Box>
  );
};

export { ConfirmButton };
export default ConfirmButton;
