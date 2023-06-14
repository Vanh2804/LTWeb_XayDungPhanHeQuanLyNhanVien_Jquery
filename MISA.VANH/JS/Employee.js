$(document).ready(function () {
    var employeeJS = new EmployeeJS();
})


class EmployeeJS {

    constructor() {
        this.loadData();
        this.initEvent();
    }

    initEvent() {
        $('#btnAdd').click(this.btnADDOnclick.bind(this));
        $('#btnClose').click(this.btnCancelOnClick.bind(this));
        $('#btnCancel').click(this.btnCancelOnClick.bind(this));

        $('#btn-insert-employee').click(this.btnInsertOnClick.bind(this));

        $('#btnFix').click(this.btnOptionOnClick.bind(this));

        $('.check-required').blur(this.checkRequired);
    }

    loadData() {
        $('#table-list tbody').empty();

        $.each(employees, function (index, item) {
            var trHTML = $(`<tr class="">
                    <td class="text-align-center checkbox-sticky">
                        <input type="checkbox" class="input-checkbox">
                    </td>
                    <td >`+ item.EmployeeCode + `</td>
                    <td >`+ item.FullName + `</td>
                    <td >`+ item.GenderName + `</td>
                    <td >`+ item.DateOfBirth + `</td>
                    <td >`+ item.IdentityNumber + `</td>
                    <td >`+ item.PositionName + `</td>
                    <td >`+ item.DepartmentName + `</td>
                    <td ></td>
                    <td ></td>
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

    btnADDOnclick() {
        $('#frmDetail').show();
    }

    btnCancelOnClick() {
        $('#frmDetail').hide();
    }

    btnInsertOnClick() {
        //Validate
        var employeeCode = $('#EmployeeCode').val();
        var fullName = $('#FullName').val();
        var positionName = $('#PositionName').val();
        var dateOfBirth = $('#DateOfBirth').val();
        var identityNumber = $('#IdentityNumber').val();
        var departmentName = $('#DepartmentName').val();
        var genders = document.getElementsByName('gender');
        var gender = '';
        for (let i = 0; i < genders.length; i++) {
            if (genders[i].checked == true) {
                gender = genders[i].value;
            }
        }

        var inpurRequireds = $('.check-required');
        var isValid = true; 
        $.each(inpurRequireds, function (index, input) {
            var valid = $(input).trigger('blur');
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })

        if (isValid) {
            //Thu thập thông ti form
            var employee = {};
            employee.EmployeeCode = employeeCode;
            employee.FullName = fullName;
            employee.GenderName = gender;
            employee.DateOfBirth = dateOfBirth;
            employee.IdentityNumber = identityNumber;
            employee.PositionName = positionName;
            employee.DepartmentName = departmentName;

            employees.push(employee);

            //Load lại dữ liệu
            this.loadData();
            this.btnCancelOnClick();
        }

    }

    checkRequired() {
        var val = this.value;
        if (!val) {
            $(this).addClass('required-error');
            $(this).attr("title", "Bạn phải nhập thông tin này");
        }
        else {
            $(this).removeClass('required-error');
        }
    }

    btnOptionOnClick() {
        $('#m-fix-options-id').show();
    }
}


var employees = [
    {
        EmployeeCode: "NV001",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "28/04/2003",
        IdentityNumber: "9238129083912",
        PositionName: "Nhân viên",
        DepartmentName: "Phòng nhân sự"
    },
    {
        EmployeeCode: "NV002",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "28/04/2003",
        IdentityNumber: "9238129083912",
        PositionName: "Nhân viên",
        DepartmentName: "Phòng nhân sự"
    },
]