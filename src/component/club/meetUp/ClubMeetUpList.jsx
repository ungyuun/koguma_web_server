import { useEffect, useState } from "react";
import { listMeetUpAPI } from "../../../apis/api/club";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Card, CardContent, MobileStepper } from "@mui/material";
import { Link } from "react-router-dom";

const ClubMeetUpList = ({ clubId, meetUpState, clubMember }) => {
  const [meetUpList, setMeetUpList] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMeetUpAPI(clubId);
        setMeetUpList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId, meetUpState]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, meetUpList.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <>
      {clubMember.activeFlag ? (
        <div>
          {meetUpList.length > 0 && (
            <div>
              <Link
                to={{
                  pathname: `/club/meet-up/${meetUpList[activeStep].id}`,
                  state: { clubId: clubId },
                }}
              >
                <Card style={{ marginBottom: 10 }}>
                  <CardContent>
                    <div>{meetUpList[activeStep].title}</div>
                    {/* 여기에 다른 멤버 정보 표시 (예: meetUpMember.email, meetUpMember.role 등) */}
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {/* MobileStepper for navigation */}
        <MobileStepper
          variant="dots"
          steps={meetUpList.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === meetUpList.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    </>
  );
};

export default ClubMeetUpList;