using MISA.VANH.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;

namespace MISA.VANH.WebApi.Controllers
{
    [RoutePrefix("employees")]
    public class EmployeeController : ApiController
    {
        // GET: api/Employee
        [Route("")]
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            var employees = new List<Employee>();
            string connectionString = "Server=VANHHOANG\\SQLEXPRESS01;Database=MISA.WEB;User Id=sa;Password=vietanh2804;";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "pr_Selectmployee";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                var employee = new Employee();
                for(int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var col = sqlDataReader.GetName(i);
                    var val = sqlDataReader.GetValue(i);

                    var property = employee.GetType().GetProperty(col);
                    if (property != null && val != DBNull.Value)
                    {
                        property.SetValue(employee, val);
                    }
                }
                employees.Add(employee);
            }
            sqlConnection.Close();

            return employees;
        }

        // GET: api/Employee/5  
        [Route("{employeeID}")]
        [HttpGet]
        public Employee Get(Guid employeeID)
        {
            //var employee = Employee.Employees.Where(e => e.EmployeeCode == employeeCode).FirstOrDefault();

            var employees = new List<Employee>();
            string connectionString = "Server=VANHHOANG\\SQLEXPRESS01;Database=MISA.WEB;User Id=sa;Password=vietanh2804;";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "pr_GetEmployeeByID";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            sqlCommand.Parameters.Clear();
            sqlCommand.Parameters.AddWithValue("@EmployeeID", employeeID);

            sqlConnection.Open();

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                var employee = new Employee();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var col = sqlDataReader.GetName(i);
                    var val = sqlDataReader.GetValue(i);

                    var property = employee.GetType().GetProperty(col);
                    if (property != null && val != DBNull.Value)
                    {
                        property.SetValue(employee, val);
                    }
                }
                return employee;
            }
            sqlConnection.Close();
            return null;
        }

        // POST: api/Employee
        [Route("")]
        [HttpPost]
        public bool Post([FromBody]Employee employee)
        {
            //var date = employee.DateOfBirth;
            //if (date == null)
            //{
            //    date = DateTime.Now;
            //}

            string connectionString = "Server=VANHHOANG\\SQLEXPRESS01;Database=MISA.WEB;User Id=sa;Password=vietanh2804;";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "pr_InSertEmployee";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            sqlCommand.Parameters.Clear();
            sqlCommand.Parameters.AddWithValue("@EmployeeID", Guid.NewGuid());
            sqlCommand.Parameters.AddWithValue("@EmployeeCode", employee.EmployeeCode);
            sqlCommand.Parameters.AddWithValue("@FullName", employee.FullName);
            sqlCommand.Parameters.AddWithValue("@GenderName", employee.GenderName);
            sqlCommand.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
            sqlCommand.Parameters.AddWithValue("@IdentityNumber", employee.IdentityNumber);
            sqlCommand.Parameters.AddWithValue("@PositionName", employee.PositionName);
            sqlCommand.Parameters.AddWithValue("@DepartmentName", employee.DepartmentName);

            sqlConnection.Open();

            var row = sqlCommand.ExecuteNonQuery();

            sqlConnection.Close();

            //Employee.Employees.Add(employee);

            return row > 0;
        }

        // PUT: api/Employee/5
        [Route("")]
        [HttpPut]
        public bool Put([FromBody]Employee employee)
        {
            //Xác định đối tượng chỉnh sửa
            //var employeeEdit = Employee.Employees.Where(e => e.EmployeeCode == employee.EmployeeCode).FirstOrDefault();
            //Employee.Employees.Remove(employeeEdit);
            //Employee.Employees.Add(employee);

            string connectionString = "Server=VANHHOANG\\SQLEXPRESS01;Database=MISA.WEB;User Id=sa;Password=vietanh2804;";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "pr_UpdateEmployee";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            sqlCommand.Parameters.Clear();
            sqlCommand.Parameters.AddWithValue("@EmployeeID", employee.EmployeeID);
            sqlCommand.Parameters.AddWithValue("@EmployeeCode", employee.EmployeeCode);
            sqlCommand.Parameters.AddWithValue("@FullName", employee.FullName);
            sqlCommand.Parameters.AddWithValue("@GenderName", employee.GenderName);
            sqlCommand.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
            sqlCommand.Parameters.AddWithValue("@IdentityNumber", employee.IdentityNumber);
            sqlCommand.Parameters.AddWithValue("@PositionName", employee.PositionName);
            sqlCommand.Parameters.AddWithValue("@DepartmentName", employee.DepartmentName);

            sqlConnection.Open();

            var row = sqlCommand.ExecuteNonQuery();

            sqlConnection.Close();

            //Employee.Employees.Add(employee);

            return row > 0;
        }

        // DELETE: api/Employee/5
        [Route("{employeeID}")]
        [HttpDelete]
        public bool Delete(Guid employeeID)
        {
            //var employeeEdit = Employee.Employees.Where(e => e.EmployeeCode == employeeCode).FirstOrDefault();
            //Employee.Employees.Remove(employeeEdit);

            string connectionString = "Server=VANHHOANG\\SQLEXPRESS01;Database=MISA.WEB;User Id=sa;Password=vietanh2804;";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "pr_DeleteEmployee";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            sqlCommand.Parameters.Clear();
            sqlCommand.Parameters.AddWithValue("@EmployeeID", employeeID);
            

            sqlConnection.Open();

            var row = sqlCommand.ExecuteNonQuery();

            sqlConnection.Close();

            //Employee.Employees.Add(employee);

            return row > 0;
        }
    }
}
