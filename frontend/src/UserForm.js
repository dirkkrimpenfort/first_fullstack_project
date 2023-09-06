import React, { useState, useEffect } from "react";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setUsers([...users, data]);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedUserId) return;
    try {
      await fetch(`/api/users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await fetch(`/api/users/${selectedUserId}`, {
        method: "DELETE",
      });
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const selectUser = (user) => {
    setSelectedUserId(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchUsers}>Aktualisieren</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Speichern</button>
        <button type="button" onClick={handleUpdate}>
          Ändern
        </button>
        <button type="button" onClick={handleDelete}>
          Löschen
        </button>
      </form>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName}
            <button onClick={() => selectUser(user)}>Auswählen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
