export const EditCard = () => {
  return (
    <div className=" p-4  shadow-lg rounded-lg hover:transition-all m-2 space-y-2">
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <button className="py-1 px-3 text-medium border rounded-md text-blue-500 hover:bg-blue-500 hover:text-white">
            Update
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <input
          type="text"
          placeholder="first name"
          className="p-2 pl-2 mx-1 rounded-md shadow-inner outline-"
          name="first_name"
          // value={userData.first_name}
          // onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="last name"
          className="p-2 pl-2 mx-1 rounded-md shadow-inner"
          name="last_name"
          // value={userData.last_name}
          // onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          className="p-2 pl-2 mx-2 rounded-md shadow-inner"
          name="email"
          // value={userData.email}
          // onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
