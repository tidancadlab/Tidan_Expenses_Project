import { useState } from "react";
import AddressData from "./CityStateAddress";

const Profile = ({setSelectedOption}) => {
  const [profile, setProfile] = useState([]);

  const updateProfile = (e) => {
    setProfile({ ...profile, [e.id]: e.value });
  };
  return (
    <>
      <div>
        <div className="relative bg-slate-800 p-20 rounded-2xl max-w-5xl w-full">
          <div className="absolute top-0 left-16 text-xl font-Itim font-light p-4 w-fit bg-green-300 rounded-b-md">Profile</div>
          <form className="flex flex-col gap-8">
            <div className=" bg-white rounded-2xl">
              <h1 className="text-xl text-left bg-yellow-300 px-8  rounded-t-2xl">
                Personal Details
              </h1>
              <div className="flex-wrap flex gap-4 p-8 address">
                <div className="relative">
                  <label
                    htmlFor="fName"
                    className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
                  >
                    First Name
                  </label>
                  <input
                    className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
                    type="text"
                    name=""
                    id="fName"
                    value={profile.fName}
                    onChange={(e) => {
                      updateProfile(e.target);
                    }}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="lName"
                    className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
                  >
                    Last Name
                  </label>
                  <input
                    className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
                    type="text"
                    name=""
                    id="lName"
                    value={profile.lName}
                    onChange={(e) => {
                      updateProfile(e.target);
                    }}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="dob"
                    className="absolute -top-2.5 left-3 bg-pink-500 px-1 rounded text-sm"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-pink-500 hover:border-pink-500 border-transparent ease-in-out duration-200 text-white"
                    type="date"
                    name=""
                    id="dob"
                    value={profile.dob}
                    onChange={(e) => {
                      updateProfile(e.target);
                    }}
                    required
                  />
                </div>
                <div className="text-white mb-2 bg-slate-600 px-2 rounded-lg flex gap-3 justify-center items-center border border-transparent hover:border-pink-500">
                  <input id="male" name="gender" type="radio" value={"male"} />
                  <label htmlFor="male">Male</label>
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value={"female"}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    id="unknown"
                    name="gender"
                    type="radio"
                    value={"other"}
                  />
                  <label htmlFor="unknown">Other</label>
                </div>
                <div className="relative">
                  <label
                    htmlFor="mobileNo"
                    className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
                  >
                    Mobile No.
                  </label>
                  <input
                    className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
                    type="number"
                    name=""
                    id="mobileNo"
                    value={profile.mobileNo}
                    onChange={(e) => {
                      updateProfile(e.target);
                    }}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="emailAddress"
                    className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
                  >
                    Email Address
                  </label>
                  <input
                    className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
                    type="email"
                    name=""
                    id="emailAddress"
                    value={profile.emailAddress}
                    onChange={(e) => {
                      updateProfile(e.target);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl">
              <h1 className="text-xl text-left bg-yellow-300 px-8 rounded-t-2xl">
                Permanent address
              </h1>
              <AddressData setSelectedOption={setSelectedOption} />

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
