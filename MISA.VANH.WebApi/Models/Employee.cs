using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace MISA.VANH.WebApi.Models
{
    public class Employee
    {
        public static List<Employee> Employees = new List<Employee>() { 
            new Employee() {
            EmployeeID = Guid.NewGuid(),
            EmployeeCode= "NV001",
            FullName = "Viet Anh",
            GenderName = "Nam",
            DateOfBirth = DateTime.Parse("2023-05-08"),
            IdentityNumber = "9238129083912",
            PositionName = "Nhân viên",
            DepartmentName = "Phòng nhân sự"},

            new Employee() {
                EmployeeID = Guid.NewGuid(),EmployeeCode= "NV002",
            FullName = "Viet Anh",
            GenderName = "Nam",
            DateOfBirth = DateTime.Parse("2023-05-08"),
            IdentityNumber = "9238129083912",
            PositionName = "Nhân viên",
            DepartmentName = "Phòng nhân sự"},

            new Employee() {EmployeeID = Guid.NewGuid(),EmployeeCode= "NV003",
            FullName = "Viet Anh",
            GenderName = "Nam",
            DateOfBirth = DateTime.Parse("2023-05-08"),
            IdentityNumber = "9238129083912",
            PositionName = "Nhân viên",
            DepartmentName = "Phòng nhân sự"}
        };

        public Guid EmployeeID { get; set; }

        public string EmployeeCode { get; set; }

        public string FullName { get; set; }

        public string GenderName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string IdentityNumber { get; set; }

        public string PositionName { get; set; }

        public string DepartmentName { get; set; }
    }
}