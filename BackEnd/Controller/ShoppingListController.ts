import ShoppingList from "../Model/ShoppingList";
import db from "../src/db";

interface ShoppingListItem {
    id: number;
    price: number;
    shoppingId: number;
    productId: number;
    quantity: number;
}

interface ShoppingListController {
    getShoppingList(req: any, res: any): Promise<void>;
    getShoppingListById(req: any, res: any): Promise<void>;
    addShoppingList(req: any, res: any): Promise<void>;
    updateShoppingList(req: any, res: any): Promise<void>;
    deleteShoppingList(req: any, res: any): Promise<void>;
}

const mapRowToShoppingListItem = (row: any[]): ShoppingListItem => {
    return {
        id: row[0],
        price: row[1],
        shoppingId: row[2],
        productId: row[3],
        quantity: row[4],
    };
};

const handleDatabaseError = (error: any, res: any) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
};

const ShoppingListControllerActions: ShoppingListController = {
    async getShoppingList(req: any, res: any): Promise<void> {
        try {
            const selectAllQuery = "SELECT * FROM shopping_list;"
            const shoppingListResult = await db.query({
                rowMode: "array",
                text: selectAllQuery,
            });
            const shoppingListResultList: ShoppingListItem[] =
                shoppingListResult.rows.map(mapRowToShoppingListItem);
            res.status(200).send(shoppingListResultList);
        } catch (error) {
            handleDatabaseError(error, res);
        }
    },
    async getShoppingListById(req: any, res: any): Promise<void> {
        try {
            const selectByIdQuery = "SELECT * FROM shopping_list WHERE shl_id = $1;";
            const shoppingListResult = await db.query({
                rowMode: "array",
                text: selectByIdQuery,
                values: [req.params.shoppingListId],
            });
            const shoppingList: ShoppingListItem[] = shoppingListResult.rows.map(mapRowToShoppingListItem);
            res.status(200).send(shoppingList);
        } catch (error) {
            handleDatabaseError(error, res);
        }
    },
    async addShoppingList(req: any, res: any): Promise<void> {
        try {
            const insertQuery = "INSERT INTO shopping_list(shl_price,shl_sh_id,shl_p_id,shl_quantity) VALUES($1,$2,$3,$4) RETURNING *;";
            const shoppingListResult = await db.query({
                rowMode: "array",
                text: insertQuery,
                values: [
                    req.body.price,
                    req.body.shoppingId,
                    req.body.productId,
                    req.body.quantity,

                ],
            });
            const shoppingList: ShoppingListItem[] = shoppingListResult.rows.map(mapRowToShoppingListItem);
            res.status(200).send(shoppingList);
        } catch (error) {
            handleDatabaseError(error, res);
        }
    },
    async updateShoppingList(req: any, res: any): Promise<void> {
        try {
            const updateQuery = "UPDATE shopping_list SET shl_price = $1,shl_sh_id = $2,shl_p_id = $3,shl_quantity = $4 WHERE shl_id = $5 RETURNING *;";
            const shoppingListResult = await db.query({
                rowMode: "array",
                text: updateQuery,
                values: [
                    req.body.price,
                    req.body.shoppingId,
                    req.body.productId,
                    req.body.quantity,
                    req.params.shoppingListId,
                ],
            });
            const shoppingList: ShoppingListItem[] = shoppingListResult.rows.map(mapRowToShoppingListItem);
            res.status(200).send(shoppingList);
        } catch (error) {
            handleDatabaseError(error, res);
        }
    },

    async deleteShoppingList(req: any, res: any): Promise<void> {
        try {
            const deleteQuery = "DELETE FROM shopping_list WHERE shl_id = $1 RETURNING shl_id;";
            const shoppingDeletetion = await db.query({
                rowMode: "array",
                text: deleteQuery,
                values: [req.params.shoppingListId],
            });
            res.status(200).send({
                Message: "ShoppingList deleted",
                shl_id: shoppingDeletetion.rows[0],
            });
        } catch (error) {
            handleDatabaseError(error, res);
        }
    },
};

export default ShoppingListControllerActions;
