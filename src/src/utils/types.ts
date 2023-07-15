export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};



export type UpdateProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};


export type CreateUserPostParams = {
  title: string;
  description: string;
};

export type CreateVehicleParams = {
  make: string;
  model: string;
  year: number;
  // Additional properties can be added as needed
};


export type CreateScheduleParams = {
  Day: string;
  Time: string;
};

export type CreateOrderParams = {
  Pickup_Point: string;
  Delivery_Point: string;
  Product_Type: string;
  PickUp_Time: string;
  Delivery_Time: string;
  Order_Status: string;
};

export type CreateMngOrderParams = {
  Title: string;
  Description: string;
  
};


