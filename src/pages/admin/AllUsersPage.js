// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// const AllUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const token = sessionStorage.getItem("adminToken"); 
// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };
//   fetchUsers();
// }, [refresh, token]);


// const deleteUser = async (id) => {
//   if (window.confirm("Are you sure you want to delete this user?")) {
//     try {
//       await axios.delete(`/admin/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRefresh(!refresh);
//     } catch (err) {
//       alert("Failed to delete user");
//       console.error(err);
//     }
//   }
// };


//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Registered Users</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">First Name</th>
//               <th className="border px-4 py-2">Last Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td className="border px-4 py-2">{user.firstName}</td>
//                 <td className="border px-4 py-2">{user.lastName}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     onClick={() => deleteUser(user._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsersPage;






import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState(""); // search state
  const token = sessionStorage.getItem("adminToken"); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setFilteredUsers(res.data); // initially show all
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [refresh, token]);

  // 🔍 filter users when search changes
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      );
    });
    setFilteredUsers(results);
  }, [search, users]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRefresh(!refresh);
      } catch (err) {
        alert("Failed to delete user");
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Registered Users</h2>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersPage;
