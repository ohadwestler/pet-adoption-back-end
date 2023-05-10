const userLoginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const UserDetailsSchema = {
  type: "object",
  properties: {
    loginEmail: { type: "string", format: "email" },
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
    firstname: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    phone: { type: "string", minLength: 2 },
    confirmPasswad: { type: ["string", "integer"], minLength: 6 },
    bio: { type: ["string", "integer"] },
  },

  required: [
    "email",
    "password",
    "firstname",
    "lastName",
    "phone",
    "confirmPasswad",
  ],
  additionalProperties: false,
};

export {userLoginSchema, UserDetailsSchema};
