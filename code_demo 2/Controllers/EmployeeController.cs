using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using code_demo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace code_demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;


        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select EmployeeId as ""EmployeeId"",
                EmployeeName as ""EmployeeName"",  Email as ""EmployeeEmail"",
                Age as ""EmployeeAge""
                from Employee
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DemoConn");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @"
                insert into Employee(EmployeeName, Age, Email)
                values (@EmployeeName, @Age, @Email)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DemoConn");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
  
                    myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName); ;
                    myCommand.Parameters.AddWithValue("@Age", emp.Age);
                    myCommand.Parameters.AddWithValue("@Email", emp.Email);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }



        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @"
                update Employee
                set EmployeeName = @EmployeeName,
                Email = @Email,
                Age = @Age
                where EmployeeId=@EmployeeId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DemoConn");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);
                    myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName); ;
                    myCommand.Parameters.AddWithValue("@Age", emp.Age);
                    myCommand.Parameters.AddWithValue("@Email", emp.Email);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Employee Records");

        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Employee
                where EmployeeId=@EmployeeId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DemoConn");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);
        
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Emplpoyee successfully deleted.");

        }
    }
}
