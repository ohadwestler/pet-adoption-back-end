const userSchema = {
  type: "object",
  properties: {
    email: { type: "string" , format: "email"},
    password: { type: ["string", "integer" ], minLength: 6},
    name: { type: "string" },
    lastname: { type: "string" },
    phone: { type: "integer" },
    
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default userSchema;



 
 
    