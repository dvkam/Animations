import { Box } from "@mui/material";
import Image from "mui-image";

const styles = {
  picContainer: {
    maxWidth: "210px",
    maxHeight: "210px",
    margin: "50px",

    "&:hover": {
      ".pic:nth-of-type(1)": {
        transform: "rotate(15deg)",
        transition: "all 0.5s ease",
      },
      ".pic:nth-of-type(2)": {
        transform: "rotate(7deg)",
        transition: "all 0.10s ease",
      },
      ".pic:nth-of-type(3)": {
        transform: "rotate(-5deg)",
      },
    },
    ".pic": {
      position: "absolute",
      transition: "all 0.2s ease",
      backfaceVisibility: "hidden",

      "&:nth-of-type(2)": {
        zIndex: 1,
      },
      "&:nth-of-type(3)": {
        zIndex: 2,
      },
    },
  },
  img: {
    backgroundColor: "#fff",
    border: "1px solid #d2d2d2",
    padding: "3px",
    boxShadow: "0 0 15px rgba(0,0,0,.1)",
  },
};

export default function App() {
  return (
    <Box sx={styles.picContainer}>
      <Image
        wrapperClassName="pic"
        width={150}
        height={150}
        src="https://via.placeholder.com/150"
        style={styles.img}
      />
      <Image
        wrapperClassName="pic"
        width={150}
        height={150}
        src="https://via.placeholder.com/150"
        style={styles.img}
      />
      <Image
        wrapperClassName="pic"
        width={150}
        height={150}
        src="https://via.placeholder.com/150"
        style={styles.img}
      />
    </Box>
  );
}

