const petsSchema = {
  type: "object",
  properties: {
      name: { type: "string", minLength: 2 },
      elergy: { type: "string"},
      type: { type: "string", minLength: 2 },
      color: { type: "string", minLength: 2 },
      diet: { type: "string", minLength: 2 },
      weight: { type: ["string", "integer"], minLength: 1 },
      height: { type: ["string", "integer"], minLength: 1 },
      status: { type: "string", minLength: 2 },
      bread: { type: "string", minLength: 2 },
      bio: { type: "string", minLength: 2 },
      uploadResult: { type: "string", minLength: 2 }
  },

  required: [
    
    "name",
    "type",
    "color",
    "diet",
    "weight",
    "height",
    "status",
    "bread",
    "bio",
    "uploadResult"
  ],
  additionalProperties: true,
};

  const searchPetSchema = {
    type: "object",
    properties: {

      type: { type: "string"},
       name: { type: "string"},
        weight:{ type: "string"},
       height:{ type: "string"},
        status:{ type: "string"}
    },
  
    additionalProperties: false,
  };
  

  
  
  export {searchPetSchema, petsSchema};
  