import { Box } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://yujinchoi.p-e.kr/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
