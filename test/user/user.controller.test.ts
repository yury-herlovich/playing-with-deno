import { ObjectId, Rhum, testing, asserts } from '../dev_deps.ts'
import { sinon } from '../dev_deps.ts'
import userController from '../../app/user/user.controller.ts'
import userService from '../../app/user/user.service.ts'
import { ContextWithIdParam, User } from "../../app/typing.ts";
import { HttpError, httpErrors } from "../../app/deps.ts";

Rhum.testPlan('user controller', () => {
  Rhum.testSuite("#get", () => {
    let sandbox = sinon.createSandbox()

    Rhum.afterEach(() => {
      sandbox.restore()
    })

    Rhum.testCase('should pass validation anc call service', async () => {
      const user: User = { _id: new ObjectId(), name: 'Yury', role: 'user', age: 30 }
      sandbox.stub(userService, 'getById').returns(Promise.resolve(user))
      const ctx: ContextWithIdParam = testing.createMockContext({ path: '/users', params: { id: user._id.toHexString() }})

      await userController.get(ctx)
      Rhum.asserts.assertEquals(ctx.response.body, user)
    })

    Rhum.testCase('should throw an error when user not found', async () => {
      sandbox.stub(userService, 'getById').returns(Promise.resolve(undefined))
      const ctx: ContextWithIdParam = testing.createMockContext({ path: '/users', params: { id: new ObjectId().toHexString() }})

      await asserts.assertRejects(() => userController.get(ctx), HttpError, 'User not found')
    })
  })
})

Rhum.run()
