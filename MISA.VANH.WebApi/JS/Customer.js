$(document).ready(function () {
    var customerJS = new CustomerJS();
    customerJS.loadData();
})

class CustomerJS {
    constructor() {

    }

    loadData() {

        $.each(data, function (index, item) {
            var trHTML = $(`<tr class="">
                    <td class="text-align-center checkbox-sticky">
                        <input type="checkbox" class="input-checkbox">
                    </td>
                    <td >`+ item.CustomerCode + `</td>
                    <td >`+ item.FullName + `</td>
                    <td >`+ item.GenderName + `</td>
                    <td >`+ item.DateOfBirth + `</td>
                    <td ></td>
                   
                    <td >
                        <div class="m-dropdown">
                            <span style="color: #3395FF;">Sửa</span>
                            <button class="m-btn-fix item-fix" id="btnFix"></button>
                            <div class="m-fix-options active" id="m-fix-options-id" style="display: none;">
                                <div class="fix-option fix-option-nhanban">Nhân bản</div>
                                <div class="fix-option fix-option-xoa">Xóa</div>
                                <div class="fix-option fix-option-ngungsudung">Ngưng sử dụng</div>
                            </div>
                        </div>
                    </td>
                     </tr>`);

            $('#table-list tbody').append(trHTML);
        })


    }
}


var data = [
    {
        CustomerCode: "NV001",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "28/04/2003"
    },
    {
        CustomerCode: "NV002",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "28/04/2003"
    },
]