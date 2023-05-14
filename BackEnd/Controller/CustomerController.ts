import { ok } from "assert";
import Customer from "../Model/Customer";
import db from "../src/db";

interface CustomerItem {
  name: string,
  id: number,
  mail: string,
  password: string,
  address: string,
  creditNumber: string,
  wallet: number,
  isAdmin: boolean,
}

interface CustomerController {
  getCustomers(req: any, res: any): Promise<void>;
  getCustomerById(req: any, res: any): Promise<void>;
  addCustomer(req: any, res: any): Promise<void>;
  updateCustomer(req: any, res: any): Promise<void>;
  deleteCustomer(req: any, res: any): Promise<void>;
}

const mapRowToCustomerItem = (rows: any[]):CustomerItem =>{
  return{
    name: rows[0],
    id: rows[1],
    mail: rows[2],
    password: rows[3],
    address: rows[4],
    creditNumber: rows[5],
    wallet: rows[6],
    isAdmin: rows[7],
  };
}

const handleDatabaseError = (error: any, res: any) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
};


  const customerControllerActions: CustomerController = {
    async getCustomers(req: any, res: any): Promise<void> {
      try {
        const selectAllQuery = "SELECT * FROM customer;";
        const customersResult = await db.query({
          rowMode: "array",
          text: selectAllQuery,
        });
        const customersList = customersResult.rows.map(mapRowToCustomerItem);
        res.status(200).send(customersList);
      } catch (error) {
        handleDatabaseError(error,res);
      }
    },
    async getCustomerById(req: any, res: any): Promise<void> {
      try {
        const selectByIdQuery = "SELECT * FROM customer WHERE c_id = $1;";
        const getSinglecustomerResult= await db.query({
          rowMode: "array",
          text: selectByIdQuery,
          values: [req.params.customerId],
        });
        const customer = getSinglecustomerResult.rows.map(mapRowToCustomerItem);
        res.status(200).send(customer);
      } catch (error) {
        handleDatabaseError(error,res);
      }
    },
    async addCustomer(req: any, res: any): Promise<void> {
      try {
        const insertQuery = "INSERT INTO customer (c_name,c_mail,c_password,c_address,c_creditnumber,c_wallet,c_isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7);";
        const customer: Customer = req.body;
        const addCustomerPromise = db.query({
          rowMode: "array",
          text: insertQuery,
          values: [
            customer.Name,
            customer.mail,
            customer.password,
            customer.address,
            customer.creditNumber,
            customer.wallet,
            customer.isAdmin,
          ],
        });
        await addCustomerPromise;
        res.status(200).send("Customer added successfully");
      } catch (error) {
        handleDatabaseError(error,res);
      }
    },
    async updateCustomer(req: any, res: any): Promise<void> {
      try {
        const updateQuery =  "UPDATE customer SET c_name = $1, c_mail = $2, c_password = $3, c_address = $4, c_creditnumber = $5, c_wallet = $6, c_isadmin = $7 WHERE c_id = $8;";
        const customer: Customer = req.body;
        const updateCustomerPromise = db.query({
          rowMode: "array",
          text: updateQuery,
          values: [
            customer.Name,
            customer.mail,
            customer.password,
            customer.address,
            customer.creditNumber,
            customer.wallet,
            customer.isAdmin,
            req.params.customerId,
          ],
        });
        await updateCustomerPromise;
        res.status(200).send("Customer updated successfully");
      } catch (error) {
        handleDatabaseError(error,res);
      }
    },
    async deleteCustomer(req: any, res: any): Promise<void> {
      try {
        const deleteQuery = "DELETE FROM customer WHERE c_id = $1;";
        const deleteCustomerPromise = db.query({
          rowMode: "array",
          text: deleteQuery,
          values: [req.params.customerId],
        });
        await deleteCustomerPromise;

        res.status(200).send("Customer deleted successfully");
      } catch (error) {
        handleDatabaseError(error,res);
      }
    },
  };

export default customerControllerActions;
