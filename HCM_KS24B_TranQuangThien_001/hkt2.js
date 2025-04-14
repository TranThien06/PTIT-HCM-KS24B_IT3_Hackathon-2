// File: hkt2.js
let danhSachSinhVien = [];
let viTriSua = -1;

//kiểm tra xem email có hợp lệ hay không
function emailHopLe(email) {
    if (!email.includes("@")) return false;
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    if (!parts[1].includes(".")) return false;
    return true;
}

//kiểm tra dữ liệu nhập vào
function kiemTraDuLieu(name, mssv, email, lop) {
    document.getElementById("nameError").textContent =
        name.trim() === "" ? "Họ tên không được để trống" : "";

    document.getElementById("mssvError").textContent =
        mssv.trim() === "" ? "Mã số sinh viên không được để trống" : "";

    document.getElementById("emailError").textContent =
        !emailHopLe(email) ? "Email không hợp lệ" : "";

    document.getElementById("lopError").textContent =
        lop.trim() === "" ? "Lớp không được để trống" : "";

    return (
        name.trim() !== "" &&
        mssv.trim() !== "" &&
        emailHopLe(email) &&
        lop.trim() !== ""
    );
}

//thêm hoặc cập nhật sinh viên
function themHoacCapNhat() {
    const name = document.getElementById("name").value;
    const mssv = document.getElementById("mssv").value;
    const email = document.getElementById("email").value;
    const lop = document.getElementById("lop").value;

    if (!kiemTraDuLieu(name, mssv, email, lop)) return;

    const sv = { name, mssv, email, lop };

    if (viTriSua === -1) {
        danhSachSinhVien.push(sv);
    } else {
        danhSachSinhVien[viTriSua] = sv;
        viTriSua = -1;
        document.getElementById("submitBtn").textContent = "Thêm sinh viên";
    }

    xoaInput();
    hienThiDanhSach();
}

//xóa dữ liệu trong các input
function xoaInput() {
    ["name", "mssv", "email", "lop"].forEach(id => {
        document.getElementById(id).value = "";
        document.getElementById(id + "Error").textContent = "";
    });
}

//hiển thị danh sách sinh viên
function hienThiDanhSach() {
    const list = document.getElementById("studentList");
    const tuKhoa = document.getElementById("searchInput").value.toLowerCase();
    list.innerHTML = "";

    danhSachSinhVien.forEach((sv, index) => {
        if (sv.name.toLowerCase().includes(tuKhoa)) {
            const row = document.createElement("tr");

            [sv.name, sv.mssv, sv.email, sv.lop].forEach(noiDung => {
                const td = document.createElement("td");
                td.textContent = noiDung;
                row.appendChild(td);
            });

            const tdHanhDong = document.createElement("td");

            const nutSua = document.createElement("button");
            nutSua.textContent = "Sửa";
            nutSua.className = "btn btn-update";
            nutSua.onclick = () => suaSinhVien(index);

            const nutXoa = document.createElement("button");
            nutXoa.textContent = "Xoá";
            nutXoa.className = "btn btn-delete";
            nutXoa.onclick = () => xoaSinhVien(index);

            tdHanhDong.appendChild(nutSua);
            tdHanhDong.appendChild(nutXoa);
            row.appendChild(tdHanhDong);

            list.appendChild(row);
        }
    });
}

//sua sinh viên
function suaSinhVien(index) {
    const sv = danhSachSinhVien[index];
    document.getElementById("name").value = sv.name;
    document.getElementById("mssv").value = sv.mssv;
    document.getElementById("email").value = sv.email;
    document.getElementById("lop").value = sv.lop;

    viTriSua = index;
    document.getElementById("submitBtn").textContent = "Cập nhật sinh viên";
}

//xoa sinh viên
function xoaSinhVien(index) {
    if (confirm("Bạn có chắc chắn muốn xoá?")) {
        danhSachSinhVien.splice(index, 1);
        hienThiDanhSach();
    }
}





