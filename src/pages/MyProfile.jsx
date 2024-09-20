import React, { useEffect, useState } from 'react';
import {GraduationCap, Cigarette,Beer, ChevronLeft, Navigation, Heart } from 'lucide-react';
import ProfileActionbar from '../components/ProfileActionbar';
import Button from '../components/buttons/InterestButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import { getIconForInterest } from "../datas/Interesticon";


function MyProfile() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const userInfo = useSelector(state => state.userAuth.userInfo);
  console.log('redux---->', userInfo);

  const myProfileCookie = Cookies.get('myProfile');
  const decodedMyProfileCookie = decodeURIComponent(myProfileCookie);
  const cleanedMyProfileJson = decodedMyProfileCookie.startsWith('j:') ? decodedMyProfileCookie.slice(2) : decodedMyProfileCookie;
  const myProfile = JSON.parse(cleanedMyProfileJson);
  console.log(myProfile);


  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">

      <div
  className="h-[75vh] overflow-hidden sticky top-0 "
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url("${myProfile?.profileImage?.url || 'fallbackImage.jpg'}") `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
  }}
>
  <div className="topnavigation flex p-2 sticky top-6 justify-between">
    <Link to="/home"><div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white">
      <ChevronLeft />
    </div> </Link>
    <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white py-2 px-4 text-white">
     <Link to="/editprofile"> <span>Edit</span></Link> 
    </div>
  </div>


         <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
            <div className="text-center">
              <span className="text-3xl text-white text-center">{userInfo?.firstName + " " + userInfo?.lastName}, {myProfile.age}</span> <br />
              <span className="text-md text-gray-300">{myProfile?.location?.place}</span>
            </div>
            <div className="text-white text-center py-2 mt-2">
              <span className="inline-flex items-center pl-1  bg-[#4b164c] py-2 rounded-full border-2 border-light-purple">
                <span className="p-2 rounded-full border-4 border-light-purple ">
                  80%
                </span>
                <span className='px-2'>Profile Complete</span>
              </span>
            </div>

          </div>
        </div>

        {/* Profile Details Section */}
        <div className="profiledetails  cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative" style={{ marginTop: '-100px', zIndex: '50' }}>
          <div className="bg-gray-400 rounded-full mx-auto" style={{ width: '60px', padding: '2px' }}>
            {/* Avatar or Profile Picture */}
          </div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">{myProfile.bio}</p>
            </div>
            {/* Dynamic Interests */}
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex  flex-wrap">
                {myProfile?.interests?.[0]?.split(',').map((interest, index) => (
                  <Button
                    key={index}
                    text={interest.trim()} // Use trim() to remove any extra spaces around each interest
                    icon={getIconForInterest(interest.trim())} // Optionally change icon based on the interest
                    initialSelected={false}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 ">
      <span className="text-gray-600">Smoking & Drinking</span>
      <div className="flex gap-4 text-purple-800">
      <div className="border w-fit flex items-center gap-2 px-2 py-1 mt-2 rounded-lg font-semibold">
        <Beer /> {myProfile ? myProfile.drinking : 'Loading...'} {/* Conditionally render user.drinking */}
      </div>
      <div className="border w-fit flex gap-2 items-center px-2 py-2 mt-2 rounded-lg font-semibold">
        <Cigarette /> {myProfile ? myProfile.smoking : 'Loading...'} {/* Conditionally render user.drinking */}
      </div>
      </div>
      
    </div>

    <div className="mt-4">
    <span className="text-gray-600">Qualification</span>
    <div className="border w-fit flex text-purple-800 items-center gap-2 px-2 py-1 mt-2 rounded-lg font-semibold">
    <GraduationCap /> {myProfile ? myProfile.qualification : 'Loading...'} {/* Conditionally render user.drinking */}
      </div>
    </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyProfile;

