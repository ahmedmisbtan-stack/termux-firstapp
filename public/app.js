async function loadUsers() {
    const result = document.getElementById("users");
    result.textContent = "جاري تحميل المستخدمين...";

    try {
        const response = await fetch("/api/users");
        const users = await response.json();

        result.replaceChildren();

        users.forEach(user => {
            const item = document.createElement("li");
            item.textContent = `${user.name} - رقم ${user.id}`;
            result.appendChild(item);
        });
    } catch (error) {
        result.textContent = "تعذر تحميل المستخدمين";
    }
}

async function addUser() {
    const input = document.getElementById("name");
    const message = document.getElementById("message");
    const name = input.value.trim();

    if (!name) {
        message.textContent = "اكتب الاسم أولاً";
        return;
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name})
    });

    const data = await response.json();
    message.textContent = data.message || data.error;

    if (response.ok) {
        input.value = "";
        await loadUsers();
    }
}

document.getElementById("addButton")
    .addEventListener("click", addUser);

loadUsers();
