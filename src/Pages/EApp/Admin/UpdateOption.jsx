import OptionCard from "./OptionCard";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { RiRefund2Line , RiFundsLine, RiBuildingLine, RiTeamFill} from "react-icons/ri";
import { FaHandsHelping} from "react-icons/fa";
const OptionCardData = [
  {
    logo: <GiPlagueDoctorProfile />,
    h1: "Profile Update",
    p: "You can Manage User Name, Contact Details, Address, Bank Details",
    link: "profile",
  },
  {
    logo: <RiRefund2Line />,
    h1: "Fund Update",
    p: "You can manage User all fund which is sent by admin or any other",
    link: "fund",
  },
  {
    logo: <RiFundsLine />,
    h1: "User Expenses Review",
    p: "You can review and manage user expenses so that it can make smoothness",
    link: "expense",
  },
  {
    logo: <RiBuildingLine />,
    h1: "Assign Project",
    p: "You can assign projects and potion to this user in the same ",
    link: "project",
  },
  {
    logo: <RiTeamFill />,
    h1: "Assign Team",
    p: "You can assign a team project wise and potion",
    link: "team",
  },
  {
    logo: <FaHandsHelping />,
    h1: "Help Section",
    p: "This section for help of user as per user quarry and resolve complaint's",
    link: "help",
  },
];
function UpdateOption({setSelectedOption}) {
  return (
    <>
      <div className="flex flex-wrap justify-around content-around gap-8">
        {OptionCardData.map((v, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setSelectedOption(v.link);
              }}
            >
              <OptionCard data={{ logo: v.logo, h1: v.h1, p: v.p }} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UpdateOption;
