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

        $('#btnSearch').click(this.btnSearchOnClick.bind(this));
        $('#btnRefresh').click(function () { location.reload() });

        $('#btn-insert-employee').click(this.btnInsertOnClick.bind(this));

        //$('#btnFix').click(this.btnOptionOnClick.bind(this));

        $('.check-required').blur(this.checkRequired);

        $('#table-list').on('dblclick', 'tbody tr', this.rowOnDbClick);

    }

    loadData() {
        $('#table-list tbody').empty();

        $.ajax({
            url: "https://localhost:44358/employees",
            method: "GET",
            data: "",
            contentType: "application/json",
            dataType: ""
        }).done(function (response) {
            let soBanGhi = 0;
            $.each(response, function (index, item) {
                if (item) {
                    var trHTML = $(`<tr class="">
                            <td class="text-align-center checkbox-sticky">
                                <input type="checkbox" class="input-checkbox">
                            </td>
                            <td style="display: none">`+ item.EmployeeID + `</td>
                            <td >`+ item.EmployeeCode + `</td>
                            <td >`+ item.FullName + `</td>
                            <td >`+ item.GenderName + `</td>
                            <td >`+ (new Date(item.DateOfBirth)).toISOString().substring(0, 10) + `</td>
                            <td >`+ item.IdentityNumber + `</td>
                            <td >`+ item.PositionName + `</td>
                            <td >`+ item.DepartmentName + `</td>
                            <td >
                                    <button id="btnAn" value="`+ item.EmployeeID +`">Ẩn</button>
                                </td>
                            <td ></td>
                            <td ></td>
                            <td >
                                <div class="m-dropdown" id="btnDelete">
                                    <span style="color: #3395FF;">Xóa</span>
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

                    soBanGhi += 1;
                }

            })

            $('#btnAn').click(function () {
                $.ajax({
                    url: "https://localhost:44358/employees/" + this.value,
                    method: "DELETE",
                    contentType: "application/json",
                }).done(function (response) {
                    $('#dialog-describe').empty();
                    if (response) {
                        console.log("Xóa thành công");
                    }
                    $('#frmDetail').hide();
                    $('#dialog-show').hide();
                    $('#dialog-Delete').hide();

                    $('button').remove("#btnCancel");

                    //loadData();
                    $('#table-list tbody').empty();

                    $.ajax({
                        url: "https://localhost:44358/employees",
                        method: "GET",
                        data: "",
                        contentType: "application/json",
                        dataType: ""
                    }).done(function (response) {
                        let soBanGhi = 0;
                        $.each(response, function (index, item) {
                            if (item) {
                                var trHTML = $(`<tr class="">
                            <td class="text-align-center checkbox-sticky">
                                <input type="checkbox" class="input-checkbox">
                            </td>
                            <td style="display: none">`+ item.EmployeeID + `</td>
                            <td >`+ item.EmployeeCode + `</td>
                            <td >`+ item.FullName + `</td>
                            <td >`+ item.GenderName + `</td>
                            <td >`+ (new Date(item.DateOfBirth)).toISOString().substring(0, 10) + `</td>
                            <td >`+ item.IdentityNumber + `</td>
                            <td >`+ item.PositionName + `</td>
                            <td >`+ item.DepartmentName + `</td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td >
                                <div class="m-dropdown" id="btnDelete">
                                    <span style="color: #3395FF;">Xóa</span>
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
                            }
                        })
                        //$('#soBanGhi').text(" " + soBanGhi + " ");
                    }).fail(function (response) {

                    });
                })
            });
            
            //$('#soBanGhi').text(" " + soBanGhi + " ");
        }).fail(function (response) {

        });

    }

    rowOnDbClick() {

        //hiện nút xóa
        $('button').remove("#btnCancel");
        var btnXoaHTML = $(`<button class="btn" id="btnCancel">Xóa</button>`);
        $('.footer_left').append(btnXoaHTML);

        

        var employeeID = $(this).find('td:eq(1)').text();
        var employeeCode = $(this).find('td:eq(2)').text();
        var fullName = $(this).find('td:eq(3)').text();
        var dateOfBirth = $(this).find('td:eq(5)').text();
        var identityNumber = $(this).find('td:eq(6)').text();
        var positionName = $(this).find('td:eq(7)').text();
        var departmentName = $(this).find('td:eq(8)').text();

        var genders = document.getElementsByName('gender');
        var gender = $(this).find('td:eq(4)').text();

        if (gender == "Nam") {
            genders[0].checked = true;
        }
        else if (gender == "Nữ") {
            genders[1].checked = true;
        }
        else {
            genders[2].checked = true;
        }

        var formatDate = (new Date(dateOfBirth)).toISOString().substring(0, 10);

        $('#EmployeeCode').val(employeeCode);
        $('#FullName').val(fullName);
        $('#PositionName').val(positionName);
        $('#DateOfBirth').val(formatDate);
        $('#IdentityNumber').val(identityNumber);
        $('#DepartmentName').val(departmentName);

        $('#frmDetail').show();

        //Xử lý xóa
        $('#btnCancel').click(function () {
            $('#dialog-show').show();
            $('#dialog-Delete').show();



            var ToastHTMl = $(`<p>Bạn có muốn xóa nhân viên ` + employeeCode + ` không !!!</p>`);
            $('#dialog-describe').append(ToastHTMl);

            $('#btnNo').click(function () {
                $('#dialog-show').hide();
                $('#dialog-Delete').hide();

            });


            $('#btnYes').click(function () {

                $.ajax({
                    url: "https://localhost:44358/employees/" + employeeID,
                    method: "DELETE",
                    contentType: "application/json",
                }).done(function (response) {
                    $('#dialog-describe').empty();
                    if (response) {
                        console.log("Xóa thành công");
                    }
                    $('#frmDetail').hide();
                    $('#dialog-show').hide();
                    $('#dialog-Delete').hide();

                    $('button').remove("#btnCancel");

                    //loadData();
                    $('#table-list tbody').empty();

                    $.ajax({
                        url: "https://localhost:44358/employees",
                        method: "GET",
                        data: "",
                        contentType: "application/json",
                        dataType: ""
                    }).done(function (response) {
                        let soBanGhi = 0;
                        $.each(response, function (index, item) {
                            if (item) {
                                var trHTML = $(`<tr class="">
                            <td class="text-align-center checkbox-sticky">
                                <input type="checkbox" class="input-checkbox">
                            </td>
                            <td style="display: none">`+ item.EmployeeID + `</td>
                            <td >`+ item.EmployeeCode + `</td>
                            <td >`+ item.FullName + `</td>
                            <td >`+ item.GenderName + `</td>
                            <td >`+ (new Date(item.DateOfBirth)).toISOString().substring(0, 10) + `</td>
                            <td >`+ item.IdentityNumber + `</td>
                            <td >`+ item.PositionName + `</td>
                            <td >`+ item.DepartmentName + `</td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td >
                                <div class="m-dropdown" id="btnDelete">
                                    <span style="color: #3395FF;">Xóa</span>
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
                                soBanGhi += 1;                            }
                        })
                        //$('#soBanGhi').text(" " + soBanGhi + " ");
                    }).fail(function (response) {

                    });
                })




            });

        });




        //Xử lý edit
        $('#btnEdit-employee').click(function () {
            for (let i = 0; i < genders.length; i++) {
                if (genders[i].checked == true) {
                    gender = genders[i].value;
                }
            }


            //$.ajax({
            //    url: "https://localhost:44358/employees/" + $('#EmployeeCode').val(),
            //    method: "GET",
            //    data: "",
            //    contentType: "application/json",
            //    dataType: ""
            //}).done(function (response) {
            //    if (response) {
            //        $('#EmployeeCode').val(response["EmployeeCode"]);
            //    }
            //})

            var employeEdit = {};
            employeEdit["EmployeeID"] = employeeID;
            employeEdit["EmployeeCode"] = $('#EmployeeCode').val();
            employeEdit["FullName"] = $('#FullName').val();
            employeEdit["DateOfBirth"] = $('#DateOfBirth').val();
            employeEdit["IdentityNumber"] = $('#IdentityNumber').val();
            employeEdit["PositionName"] = $('#PositionName').val();
            employeEdit["DepartmentName"] = $('#DepartmentName').val();
            employeEdit["GenderName"] = gender;

            $.ajax({
                url: "https://localhost:44358/employees/",
                method: "PUT",
                data: JSON.stringify(employeEdit),
                contentType: "application/json",
                dataType: "json"
            }).done(function (response) {

                $('#frmDetail').hide();



                $('button').remove("#btnCancel");

                //loadData();



                $.ajax({
                    url: "https://localhost:44358/employees",
                    method: "GET",
                    data: "",
                    contentType: "application/json",
                    dataType: ""
                }).done(function (response) {
                    let soBanGhi = 0;
                    $('#table-list tbody').empty();
                    $.each(response, function (index, item) {
                        if (item) {
                            var trHTML = $(`<tr class="">
                    <td class="text-align-center checkbox-sticky">
                        <input type="checkbox" class="input-checkbox">
                    </td>
                    <td style="display: none">`+ item.EmployeeID + `</td>
                    <td >`+ item.EmployeeCode + `</td>
                    <td >`+ item.FullName + `</td>
                    <td >`+ item.GenderName + `</td>
                    <td >`+ (new Date(item.DateOfBirth)).toISOString().substring(0, 10) + `</td>
                    <td >`+ item.IdentityNumber + `</td>
                    <td >`+ item.PositionName + `</td>
                    <td >`+ item.DepartmentName + `</td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td >
                        <div class="m-dropdown" id="btnDelete">
                            <span style="color: #3395FF;">Xóa</span>
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
                            soBanGhi += 1;
                        }
                    })
                    //$('#soBanGhi').text(" " + soBanGhi + " ");
                }).fail(function (response) {

                });

            }).fail(function (response) {

            })

        });
    }


    btnADDOnclick() {
        $('#frmDetail').show();
    }

    btnCancelOnClick() {
        $('#EmployeeCode').val("");
        $('#FullName').val("");
        $('#PositionName').val("");
        $('#DateOfBirth').val("");
        $('#IdentityNumber').val("");
        $('#DepartmentName').val("");
        $('#GenderNam').prop('checked', false);
        $('#GenderNu').prop('checked', false);
        $('#GenderKhac').prop('checked', false);
        $('#frmDetail').hide();
        $('button').remove("#btnCancel");
    }

    btnInsertOnClick() {
        $('button').remove("#btnCancel");
        //Validate
        var employeeControl = this;
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
            $.ajax({
                url: "https://localhost:44358/Employees",
                method: "POST",
                data: JSON.stringify(employee),
                contentType: "application/json",
                dataType: "json"
            }).done(function (response) {
                //Load lại dữ liệu
                employeeControl.loadData();

                employeeControl.btnCancelOnClick();
            }).fail(function (response) {

            })

            //employees.push(employee);


        }

    }

    btnSearchOnClick() {
        var txtSearch = $('#inputSearch').val().toLowerCase();
        if (txtSearch) {
            $.ajax({
                url: "https://localhost:44358/employees",
                method: "GET",
                data: "",
                contentType: "application/json",
                dataType: ""
            }).done(function (response) {
                $('#table-list tbody').empty();
                let soBanGhi = 0;
                $.each(response, function (index, item) {
                    
                    if (item) {
                        let fullname = item.FullName.toLowerCase();
                        if (fullname.includes(txtSearch)) {
                            var trHTML = $(`<tr class="">
                            <td class="text-align-center checkbox-sticky">
                                <input type="checkbox" class="input-checkbox">
                            </td>
                            <td >`+ item.EmployeeCode + `</td>
                            <td >`+ item.FullName + `</td>
                            <td >`+ item.GenderName + `</td>
                            <td >`+ (new Date(item.DateOfBirth)).toISOString().substring(0, 10) + `</td>
                            <td >`+ item.IdentityNumber + `</td>
                            <td >`+ item.PositionName + `</td>
                            <td >`+ item.DepartmentName + `</td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td >
                            <td style="display: none">`+ item.EmployeeID + `</td>
                                <div class="m-dropdown" id="btnDelete">
                                    <span style="color: #3395FF;">Xóa</span>
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
                            soBanGhi += 1;
                        }
                    }
                })
                //$('#soBanGhi').text(" " + soBanGhi + " ");

            }).fail(function (response) {

            });
        }

    }

    btnDeleteOnClick() {
        $('#dialog-show').show();
        $('#dialog-Delete').show();


    }

    checkRequired() {
        var val = this.value;
        if (!val) {
            //$(this).addClass('required-error');
            //$(this).attr("title", "Bạn phải nhập thông tin này");
            //$(this).next('span').remove();
            //var erHTML = "<span class='form-message' >Bạn phải nhập thông tin này</span>";
            //$(this).after(erHTML);
        }
        else {
            $(this).removeClass('required-error');
        }
    }

    //btnOptionOnClick() {
    //    $('#m-fix-options-id').show();
    //}
}


var employees = [
    {
        EmployeeCode: "NV001",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "2023-05-08",
        IdentityNumber: "9238129083912",
        PositionName: "Nhân viên",
        DepartmentName: "Phòng nhân sự"
    },
    {
        EmployeeCode: "NV002",
        FullName: "Viet Anh",
        GenderName: "Nam",
        DateOfBirth: "2003-04-28",
        IdentityNumber: "9238129083912",
        PositionName: "Nhân viên",
        DepartmentName: "Phòng nhân sự"
    },
]