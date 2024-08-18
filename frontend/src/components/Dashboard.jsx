import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthRouter';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(true);
  const [showDataInsights, setShowDataInsights] = useState(false);

  const Menus = [
    { title: "Overview" },
    {
      title: "Data Insights",
      subItems: [
        { title: "Map doctors" },
        { title: "Map patient" },
        { title: "Map hospital" }
      ]
    },
    {
      title: "AI content",
      subItems: [
        { title: "Social media" },
        { title: "Email generator" }
      ]
    },
    { title: "Virtual AI assistant" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-white h-screen p-5 pt-8 relative duration-300 shadow-md`}
      >
        <img
          src="./src/assets/Vector (2).png"
          className={`absolute cursor-pointer -right-3 top-6 w-5 h-5 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex flex-col rounded-md p-2 cursor-pointer hover:bg-light-white ${
                index === 0 && "bg-light-white"
              } ${Menu.subItems ? "mt-2" : "mt-2"}`}
              onClick={() => Menu.subItems && setShowDataInsights(!showDataInsights)}
            >
              <span
                className={` ${!open && "hidden"} origin-left duration-200`}
                style={{ color: "#7C3A84" }}
              >
                {Menu.title}
              </span>
              {Menu.subItems && showDataInsights && (
                <ul className="pl-4">
                  {Menu.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white`}
                    >
                      <span
                        className={` ${!open && "hidden"} origin-left duration-200`}
                        style={{ color: "#7C3A84" }}
                      >
                        {subItem.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img src="./src/assets/Search.png" alt="Search" className="w-5 h-5" />
            <span className="text-gray-500 text-sm">Search</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src="./src/assets/Chat alt 2.png" alt="Feedback" className="w-5 h-5" />
              <span className="text-gray-500 text-sm">Feedback?</span>
            </div>
            <img src="./src/assets/Icon button.png" alt="Notifications" className="w-5 h-5" />
            <img src="./src/assets/Question mark circle.png" alt="Help" className="w-5 h-5" />
            <img
              src="./src/assets/Icon button (1).png"
              alt="User Profile"
              className="w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-300 mb-8"></div>
        <h1 className="text-2xl font-semibold" style={{ color: "#7C3A84" }}>
          Doctor data scraper
        </h1>
        <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md mt-8 relative">
          <div className="absolute top-3 left-4 text-gray-700 text-lg font-semibold">
            Excel Upload
          </div>
          <p className="text-gray-600 text-sm mt-8">
            Add your documents here, and you can upload up to 5 files max.
          </p>
          <div className="border-dashed border-2 border-gray-300 h-48 mt-4 flex items-center justify-center relative flex-col">
            <img src="./src/assets/Vector (1).png" alt="upload" className="w-7 h-6 mb-2" />
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0"
              onChange={(e) => console.log(e.target.files)}
            />
            <p className="text-gray-500 text-center">
              Drag and drop files here, or click to select files
            </p>
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            Only support .jpg, .png and .svg and zip files
          </p>
          <div className="flex items-center justify-center my-4">
            <hr className="border-gray-300 w-full" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="border-gray-300 w-full" />
          </div>
          <p className="text-blue-600 text-sm cursor-pointer hover:underline">
            Download sample excel
          </p>
        </div>
    </div>
  );
};

export default Dashboard;
