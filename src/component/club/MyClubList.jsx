import { AspectRatio } from "@mui/icons-material";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { listMyClubAPI } from "../../apis/api/club";
import { useNavigate } from "react-router-dom";

const MyClubList = () => {
  const navigate = useNavigate();
  const [myClubs, setMyClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMyClubAPI();

        setMyClubs(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Typography variant="h5">내 모임</Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          overflow: "auto",
          width: 343,
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {myClubs.map((club, index) => (
          <div onClick={() => navigate(`/club/${club.id}`)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card
                  orientation="horizontal"
                  size="sm"
                  key={index}
                  variant="outlined"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      borderRadius: "50%",
                    }}
                    image="data:image/jpeg;base64,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" // 클럽 이미지 URL을 가져와야 함
                    alt={club.title}
                  />
                </Card>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: "24px", textAlign: "center" }}
                >
                  <Typography level="title-md">{club.title}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default MyClubList;
const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};