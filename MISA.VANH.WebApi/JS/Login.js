$(document).ready(function () {
    var login = new Login();
})

class Login{
    constructor() {
        this.initEvent();
    }

    initEvent() {
        var err = 0;
        $('#btnLg').click(function () {
            if (err > 3) {
                alert("Bạn nhập sai nhiều lần");
                return;
            }
            var tk = $('#txtTk').val();
            var mk = $('#txtMK').val();
            if (tk == 'Vanh' && mk == 'va') {
                $('#login').attr("href='Employee.html'");
            }
            else {
                err += 1;
            }
        })
    }
}