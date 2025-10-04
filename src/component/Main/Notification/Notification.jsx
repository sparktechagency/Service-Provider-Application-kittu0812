import { Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetAllNotificationQuery } from "../../../redux/features/notification/notification";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch notifications from the API
  const { data } = useGetAllNotificationQuery();
  const notifications = data?.data; // Ensure this is the notifications array
  console.log(notifications);

  const pageSize = 8; // Show 5 notifications per page

  // Pagination Logic
  const paginatedNotifications = notifications?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4">
        <FaAngleLeft /> Notification
      </Link>

      <div className="space-y-2">
        {paginatedNotifications?.map((item) => (
          <div
            key={item.id}
            className="border border-[#fff050] hover:bg-[#fff0503b] cursor-pointer rounded-md p-3 flex items-center space-x-4"
          >
            <div className="text-[#fff050] border border-[#fff050] rounded-full p-2">
              <span className="bg-[#fff050] p-1.5 rounded-full absolute ml-4 z-[1]"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-medium">{item?.message}</p>
              <p className="text-gray-500 flex items-center justify-between capitalize w-full">
                {moment(item?.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={notifications?.length} // Use the actual notifications length
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
