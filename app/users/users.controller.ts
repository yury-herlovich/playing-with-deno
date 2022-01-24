import { Context } from "https://deno.land/x/oak/mod.ts";

// GET /users
export function getAll(context: Context) {
  context.response.body = "List of users";
}

// GET /users/:id
export function get(context: Context) {
  context.response.body = "Find user";
}

// POST /users
export function add(context: Context) {
  context.response.body = "Add user";
}

// DELETE /users/:id
export function remove(context: Context) {
  context.response.body = "Remove user";
}

// PATCH /users/:id
export function update(context: Context) {
  context.response.body = "Update user";
}

// PUT /users/:id
export function replace(context: Context) {
  context.response.body = "Replace user";
}