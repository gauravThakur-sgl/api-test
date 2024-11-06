import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserData,
  deleteUserData,
  EditUserData,
  fetchUserData,
} from "../api/api";
import {
  addUser,
  deleteUsers,
  fetchUsers,
  setChange,
  updateUser,
} from "../features/actions";

export const ReduxApi = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const changeId = useSelector((state) => state.users.changeId);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await fetchUserData();
        dispatch(fetchUsers(formData.data));
      } catch (errors) {
        console.log(errors);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (changeId) {
      const editUser = users.users?.find((user) => user.id === changeId);
      if (editUser) {
        setFormData({
          first_name: editUser.first_name,
          last_name: editUser.last_name,
          email: editUser.email,
        });
      }
    }
  }, [changeId, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (changeId) {
        const updatedUser = await EditUserData(changeId, formData);
        dispatch(updateUser({ id: changeId, ...updatedUser }));
        dispatch(setChange(null));
      } else {
        const newUser = await addUserData(formData);
        dispatch(addUser(newUser));
      }

      setFormData({ first_name: "", last_name: "", email: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (userId) => {
    dispatch(setChange(userId));
  };
  const handleCancel = () => {
    dispatch(setChange(null));
    setFormData({ first_name: "", last_name: "", email: "" });
  };
  const handleDelete = async (userId) => {
    try {
      await deleteUserData(userId);
      dispatch(deleteUsers(userId));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users.users);
  return (
    <div className="font-serif">
      <div className="font-bold text-4xl flex justify-center items-center">
        ReduxApi
      </div>
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
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="last name"
              className="p-2 pl-2 mx-1 rounded-md shadow-inner"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="email"
              className="p-2 pl-2 mx-2 rounded-md shadow-inner"
              name="email"
              value={formData.email}
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
        {users?.users.length > 0 ? (
          users?.users.map((user) => (
            <div
              key={user.id}
              className="p-4  shadow-lg rounded-lg hover:transition-all m-2"
            >
              {changeId === user.id ? (
                <div>
                  <form action="" onClick={handleSubmit}>
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
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full p-1 mb-1 border rounded"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full p-1 mb-1 border rounded"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-1 mb-1 border rounded"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="submit"
                          className="py-1 px-3 text-medium border rounded-md text-green-500 hover:bg-green-500 hover:text-white"
                        >
                          {changeId ? "Update User" : "Add User"}
                        </button>
                        {changeId && (
                          <button
                            onClick={handleCancel}
                            className="py-1 px-3 text-medium border rounded-md text-gray-500 hover:bg-gray-500 hover:text-white"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
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
                        onClick={() => handleEdit(user.id)}
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
          ))
        ) : (
          <>
            <div>
              <p>Loading...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
