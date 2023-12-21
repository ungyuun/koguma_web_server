import {
  Avatar,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Paper,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import {
  getProductAPI,
  listSuggestPriceAPI,
  memberchecAPI,
  updateTradeStateAPI,
  updateTradeStateSaledAPI,
} from "../../apis/api/Product";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";

import { formatMoney } from "../../apis/services/product";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import NotData from "../../component/product/NotData";
import SuggestPriceComponent from "../../component/product/SuggestPriceComponent";
import { chatRoomListBySellerAPI } from "../../apis/api/chat";
import ChoiceMember from "../../component/product/ChoiceMember";
import ContainingProduct from "../../component/product/ContainingProduct";

const ListChoiceBuyer = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [datas, setDatas] = useState([]);
  const [product, setProduct] = useState();
  const [choice, setChoice] = useState();
  console.log(productId);

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  const handleChange = (event) => {
    setChoice(event.target.value);
  };
  const onClick = async () => {
    console.log(choice);
    try {
      await updateTradeStateSaledAPI(productId, choice, "SALED").then(() =>
        navigate(
          `/product/review/add`,
          {
            state: { buyerId: choice, productId: productId, seller: true },
          },
          { replace: true }
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chatRoomListBySellerAPI(productId);
        setDatas(result);
        await getProductAPI(productId).then((product) => setProduct(product));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Back />
      <TopBar>구매자 선택</TopBar>
      <MarginEmpty value="60px" />
      {product && <ContainingProduct data={product} />}
      <FormControl sx={{ m: 2 }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={choice}
          onChange={handleChange}
        >
          {datas.length > 0 ? (
            datas.map((data, idx) => (
              <>
                <hr style={{ borderTop: "1px solid #ccc" }} />
                <FormControlLabel
                  key={idx}
                  value={data.buyerDTO.id}
                  control={<Radio />}
                  label={<ChoiceMember data={data} />}
                />
                <hr style={{ borderBottom: "1px solid #ccc" }} />
              </>
            ))
          ) : (
            <NotData />
          )}
        </RadioGroup>
      </FormControl>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "64px",
        }}
        elevation={3}
      >
        <Button
          sx={{ width: "100%", height: "50px" }}
          color="secondary"
          variant="contained"
          onClick={() => onClick()}
        >
          구매자 선택
        </Button>
      </Paper>
    </>
  );
};
export default ListChoiceBuyer;