import { useEffect, useState } from "react";
import axios from "axios";

const fetchData = async () => {
  const res = await axios.get("https://reqres.in/api/users");
  const data = res.data;
  return data.data;
};

export const Axios = () => {
  const [users, setUsers] = useState([]);
  const [changeId, setChangeId] = useState(null);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData();
      setUsers(result);
    };
    loadData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = userData;
    if (first_name.trim() && last_name.trim() && email.trim()) {
      const response = await axios.post("https://reqres.in/api/users", {
        first_name,
        last_name,
        email,
      });
      const data = response.data;
      const newUser = {
        id: data.id || Date.now(),
        first_name: data.first_name || first_name,
        last_name: data.last_name || last_name,
        email: data.email || email,
        avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
      };

      // Updating the local state
      setUsers((prevUsers) => [...prevUsers, newUser]);

      // Reset the form
      setUserData({
        first_name: "",
        last_name: "",
        email: "",
      });
    }
  };
  const handleEdit = (user) => {
    setChangeId(user.id);
    setUserData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };
  const handleUpdate = async (userId) => {
    const { first_name, last_name, email } = userData;
    if (first_name.trim() && last_name.trim() && email.trim()) {
      const response = await axios.put(
        `https://reqres.in/api/users/${userId}`,
        {
          first_name,
          last_name,
          email
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  first_name,
                  last_name,
                  email,
                  avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
                }
              : user
          )
        );
        // reset editing state
        setChangeId(null);
        setUserData({
          first_name: "",
          last_name: "",
          email: "",
        });
      }
    }
  };
  const handleCancel = () => {
    setChangeId(null);
    setUserData({
      first_name: "",
      last_name: "",
      email: "",
    });
  };
  const handleDelete = (userId) => {
    axios.delete(`https://reqres.in/api/users/${userId}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  return (
    <div>
      {/* {photos.map((photo) => (
        <div key={photo.code} className="flex w-full justify-center items-center">
          <p>{photo.symbol}</p>
          <div>
            {photo.description}
          </div>
        </div>
      ))} */}
      <div className="font-sans bg-slate-50 p-4 h-screen ">
        <div className="flex justify-between items-center mx-10">
          <h1 className="font-bold text-4xl flex justify-center items-center p-4">
            User List
          </h1>
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="first name"
                className="p-2 pl-2 mx-1 rounded-md shadow-inner outline-"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="last name"
                className="p-2 pl-2 mx-1 rounded-md shadow-inner"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="email"
                className="p-2 pl-2 mx-2 rounded-md shadow-inner"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="py-2 px-4 border rounded-lg font-medium cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 justify-center items-center mx-10 p-2">
          {users.map((user) => (
            <div
              key={user.id}
              className=" p-4  shadow-lg rounded-lg hover:transition-all m-2"
            >
              {changeId === user.id ? (
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <img
                        src={user.avatar}
                        alt=""
                        className="rounded-full w-14"
                      />
                    </div>
                    <input
                      type="text"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputChange}
                      className="w-full p-1 mb-1 border rounded"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputChange}
                      className="w-full p-1 mb-1 border rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full p-1 mb-1 border rounded"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="py-1 px-3 text-medium border rounded-md text-green-500 hover:bg-green-500 hover:text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="py-1 px-3 text-medium border rounded-md text-gray-500 hover:bg-gray-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className=" pr-2">
                        <img
                          src={user.avatar}
                          alt=""
                          className="rounded-full w-14"
                        />
                      </div>
                      <h2 className="font-bold ">
                        {user.first_name + " " + user.last_name}
                      </h2>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEdit(user)}
                        className="py-1 px-3 text-medium border rounded-md text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{user.email}</p>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="py-1 px-3 text-medium border rounded-md text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
