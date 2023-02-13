import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";

const Widget = ({ type }) => {
  const [studentCount, setStudentCount] = useState()
  const [vCount, setVCount] = useState()
  const [msgCount, setMsgCount] = useState()
  const [covidCount, setCovidCount] = useState()
  const fetchUserCount = async () => {
    try {
      firestore.collection('userdata').get().then((snapshot) => {
        // console.log(snapshot.size)
        setStudentCount(snapshot.size)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchMessageCount = async () => {
    try {
      firestore.collection('notifications').where('to', '==', 'admin').get().then((snapshot) => {
        // console.log(snapshot.size)
        setMsgCount(snapshot.size)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchVaccinatedCount = async () => {
    try {
      firestore.collection('userdata').where("vaccinated", "==", "yes").get().then((snapshot) => {
        // console.log(snapshot.size)
        setVCount(snapshot.size)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCovidCount = async () => {
    try {
      firestore.collection('userdata').where("covidStatus", "==", "yes").get().then((snapshot) => {
        // console.log(snapshot.size)
        setCovidCount(snapshot.size)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    switch (type) {
      case "Registered":
        fetchUserCount()
        break;
      case "Vaccinated":
        fetchVaccinatedCount();
        break;
      case "Message":
        fetchMessageCount();
        break;
      case "Covid Affected":
        fetchCovidCount();
        break;

    }
  }, [studentCount])
  let data;
  switch (type) {
    case "Registered":
      data = {
        title: "Registered USERS",
        isMoney: false,
        link: "See all Registered users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Message":
      data = {
        title: "Messages",
        isMoney: false,
        link: "View all Messages",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Covid Affected":
      data = {
        title: "Covid Affected",
        isMoney: true,
        link: "View net Covid Affected",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "Vaccinated":
      data = {
        title: "Vaccinated",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      data = {
        title: "Vaccinated",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
  }

  return (
    <>
      {
        type ?
          <div className="widget">
            < div className="left" >
              <span className="title">{data.title}</span>
              <span className="counter">
                {studentCount | msgCount | vCount | covidCount}
              </span>
              <span className="link">{data.link}</span>
            </div >
            <div className="right">

              {/* {data.icon} */}
            </div>
          </div > : ''
      }
    </>
  );
};

export default Widget;
