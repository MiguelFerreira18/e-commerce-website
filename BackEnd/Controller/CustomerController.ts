import { ok } from "assert";
import Customer from "../Model/Customer";
import db from "../src/db";

interface CustomerController {
  getCustomers(req: any, res: any): Promise<void>;
  getCustomerById(req: any, res: any): Promise<void>;
  addCustomer(req: any, res: any): Promise<void>;
  updateCustomer(req: any, res: any): Promise<void>;
  deleteCustomer(req: any, res: any): Promise<void>;
}

const customerControllerActions: CustomerController = {
  async getCustomers(req: any, res: any): Promise<void> {
    try {
      const customersPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM customer;",
      });
      const customersResult = await customersPromise;
      console.log("aqui");
      const customersList = customersResult.rows.map((row) => {
        console.log("aqui2");
        console.log(row);
        return {
          c_name: row[0],
          c_id: row[1],
          c_mail: row[2],
          c_password: row[3],
          c_address: row[4],
          c_creditnumber: row[5],
          c_wallet: row[6],
          c_isadmin: row[7],
        };
      });
      res.status(200).send(customersList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getCustomerById(req: any, res: any): Promise<void> {
    try {
      const getSinglecustomerPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM customer WHERE c_id = $1;",
        values: [req.params.customerId],
      });
      const customersResult = await getSinglecustomerPromise;
      const customer = customersResult.rows.map((row) => {
        return {
          c_name: row[0],
          c_id: row[1],
          c_mail: row[2],
          c_password: row[3],
          c_address: row[4],
          c_creditnumber: row[5],
          c_wallet: row[6],
          c_isadmin: row[7],
        };
      });
      res.status(200).send(customer);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addCustomer(req: any, res: any): Promise<void> {
    try {
      const customer: Customer = req.body;
      const addCustomerPromise = db.query({
        rowMode: "array",
        text: "INSERT INTO customer (c_name,c_mail,c_password,c_address,c_creditnumber,c_wallet,c_isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7);",
        values: [
          customer.c_name,
          customer.c_mail,
          customer.c_password,
          customer.c_address,
          customer.c_creditnumber,
          customer.c_wallet,
          customer.c_isadmin,
        ],
      });
      await addCustomerPromise;
      res.status(200).send("Customer added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async updateCustomer(req: any, res: any): Promise<void> {
    try {
      const customer: Customer = req.body;
      const updateCustomerPromise = db.query({
        rowMode: "array",
        text: "UPDATE customer SET c_name = $1, c_mail = $2, c_password = $3, c_address = $4, c_creditnumber = $5, c_wallet = $6, c_isadmin = $7 WHERE c_id = $8;",
        values: [
          customer.c_name,
          customer.c_mail,
          customer.c_password,
          customer.c_address,
          customer.c_creditnumber,
          customer.c_wallet,
          customer.c_isadmin,
          req.params.customerId,
        ],
      });
      await updateCustomerPromise;
      res.status(200).send("Customer updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteCustomer(req: any, res: any): Promise<void> {
    try {
      const deleteCustomerPromise = db.query({
        rowMode: "array",
        text: "DELETE FROM customer WHERE c_id = $1;",
        values: [req.params.customerId],
      });
      await deleteCustomerPromise;

      res.status(200).send("Customer deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default customerControllerActions;
