// بيانات المستخدم الثابتة للتجربة
const USERNAME = "admin";
const PASSWORD = "admin";

// تسجيل الدخول
function login(event) {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === USERNAME && pass === PASSWORD) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}

// التأكد من تسجيل الدخول
function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("welcomeMsg").innerText =
        "Welcome, " + localStorage.getItem("username");

    loadProducts();
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

// إضافة منتج
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const qty = document.getElementById("productQty").value;
    const price = document.getElementById("productPrice").value;

    let products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push({ name, qty, price });
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";
    document.getElementById("productPrice").value = "";

    loadProducts();
}

// عرض المنتجات
function loadProducts() {
    const table = document.getElementById("productTable");
    // امسح الصفوف القديمة
    table.innerHTML = `<tr><th>Name</th><th>Quantity</th><th>Price</th></tr>`;

    let products = JSON.parse(localStorage.getItem("products") || "[]");

    for (let product of products) {
        const row = table.insertRow();
        row.insertCell(0).innerText = product.name;
        row.insertCell(1).innerText = product.qty;
        row.insertCell(2).innerText = product.price;
    }
}
