document.addEventListener("DOMContentLoaded", function () {
  const refreshBtn = document.getElementById("refreshBtn");
  const userList = document.getElementById("userList");
  const sortSelect = document.getElementById("sortSelect");
  const filterInput = document.getElementById("filterInput");
  const clearFilterBtn = document.getElementById("clearFilterBtn");
  const sortLabel = document.getElementById("sortLabel");

  let usersData = [];

  function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((users) => {
        usersData = users;
        sortUsers(sortSelect.value);
        displayUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
        userList.innerHTML =
          "<p>Error fetching users. Please try again later.</p>";
      });
  }

  function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Phone:</strong> ${user.phone}</p>
          `;
      userList.appendChild(card);
    });
  }

  refreshBtn.addEventListener("click", function () {
    fetchUsers();
  });

  sortSelect.addEventListener("change", function () {
    const sortBy = sortSelect.value;
    sortUsers(sortBy);
    updateSortLabel(sortBy);
  });

  filterInput.addEventListener("input", function () {
    applyFilters();
  });

  clearFilterBtn.addEventListener("click", function () {
    filterInput.value = "";
    applyFilters();
  });

  function applyFilters() {
    const filterValue = filterInput.value.toLowerCase();
    const filteredUsers = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue) ||
        user.phone.toLowerCase().includes(filterValue)
    );
    displayUsers(filteredUsers);
  }

  function sortUsers(sortBy) {
    switch (sortBy) {
      case "name":
        usersData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "email":
        usersData.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "phone":
        usersData.sort((a, b) => a.phone.localeCompare(b.phone));
        break;
      default:
        break;
    }
  }

  function updateSortLabel(sortBy) {
    sortLabel.textContent = `Sorted by: ${
      sortBy.charAt(0).toUpperCase() + sortBy.slice(1)
    }`;
  }

  fetchUsers();
});
