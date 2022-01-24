import { Router } from "https://deno.land/x/oak/mod.ts";
import * as users from "./users/users.controller.ts"

const router = new Router();
router
  .get("/users", users.getAll)
  .post("/users", users.add)
  .get("/users/:id", users.get)
  .delete("/users/:id", users.remove)
  .patch("/users/:id", users.update)
  .put("/users/:id", users.replace)

export default router
