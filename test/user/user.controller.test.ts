import { asserts, Bson, Rhum, sinon, testing } from "../dev_deps.ts";
import userController from "../../src/user/user.controller.ts";
import userService from "../../src/user/user.service.ts";
import { User } from "../../src/typing.ts";
import { HttpError } from "../../src/deps.ts";

Rhum.testPlan("user controller", () => {
  Rhum.testSuite("#get", () => {
    const sandbox = sinon.createSandbox();

    Rhum.afterEach(() => {
      sandbox.restore();
    });

    Rhum.testCase("should pass validation anc call service", async () => {
      const user: User = {
        _id: new Bson.ObjectId(),
        name: "Yury",
        role: "user",
        email: "yury@example.com",
      };
      sandbox.stub(userService, "getById").returns(Promise.resolve(user));
      const ctx: any = testing.createMockContext({
        path: "/users",
        params: { id: user._id.toHexString() },
      });

      await userController.get(ctx);
      asserts.assertEquals(ctx.response.body, user);
    });

    Rhum.testCase("should throw an error when user not found", async () => {
      sandbox.stub(userService, "getById").returns(Promise.resolve(undefined));
      const ctx: any = testing.createMockContext({
        path: "/users",
        params: { id: new Bson.ObjectId().toHexString() },
      });

      await asserts.assertRejects(
        () => userController.get(ctx),
        HttpError,
        "User not found",
      );
    });
  });

  Rhum.testSuite("#getAll", () => {
    const sandbox = sinon.createSandbox();

    Rhum.afterEach(() => {
      sandbox.restore();
    });

    Rhum.testCase("should return data from service", async () => {
      const user: User = {
        _id: new Bson.ObjectId(),
        name: "Yury",
        role: "user",
        email: "yury@example.com",
      };
      sandbox.stub(userService, "getAll").returns(Promise.resolve([user]));
      const ctx: any = testing.createMockContext({ path: "/users" });

      await userController.getAll(ctx);
      asserts.assertEquals(ctx.response.body, [user]);
    });
  });

  // Rhum.testSuite("#add", () => {
  //   const sandbox = sinon.createSandbox()

  //   Rhum.afterEach(() => {
  //     sandbox.restore()
  //   })

  //   Rhum.testCase('should pass validation', async () => {
  //     const user: InsertableUser = { name: 'Yury', role: 'user', email: 'yury@example.com' }
  //     const userId = new Bson.ObjectId()

  //     sandbox.stub(userService, 'add').returns(Promise.resolve({ ...user, _id: userId, params: user as any }))
  //     const ctx: any = testing.createMockContext({ path: '/users', method: 'POST', params: { user: '123' } })
  //     ctx.request = new Request('http://localhost/users', {
  //       method: 'POST',
  //       body: JSON.stringify({ message: "Hello world!" }),
  //       headers: {
  //         "content-type": "application/json",
  //       }
  //     })

  //     await userController.add(ctx)
  //     // Rhum.asserts.assertEquals(ctx.response.body, [user])
  //   })
  // })
});

Rhum.run();
