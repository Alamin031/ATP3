import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AdminDTO, AdminLoginDTO, ProductDTO, adminCustomerDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity, ProductReview } from "src/customer/customer.entity";
import { Order } from "src/order/Order.entity";
import { Repository } from "typeorm";
import { ProductEntity, AdminEntity } from "./admin.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";
import { CustomerDTO, CustomerPicDTO, CustomerUpdateDTO } from "src/customer/customer.dto";
import * as bcrypt from 'bcrypt';




@Injectable()
export class AdminService{

    constructor(@InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>, 

    @InjectRepository(Order)
        private orderRepo: Repository<Order>,

    @InjectRepository(ProductReview)
    private ProductReviewRepo: Repository<ProductReview>,
    
    @InjectRepository(ProductEntity)
    private ProductsRepo: Repository<ProductEntity>,

    @InjectRepository(SupplierEntity)
    private SupplierRepo: Repository<SupplierEntity>,

    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>
    ){}

// * Feature 2 : Login admin profile

    async login(query:AdminLoginDTO){
        const email = query.email;
        const password = query.password;
        const CustomerDetails = await this.AdminRepo.findOneBy({ email : email });
        
        if (CustomerDetails === null) {
            throw new NotFoundException
            ({
            status: HttpStatus.NOT_FOUND,
            message: "Member not found"
        })}
        else {
            if (await bcrypt.compare(password, CustomerDetails.password)) {
            return CustomerDetails;
        } 
        else {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Password does not match"
            })
        }
    }
}
async showProfileDetails(AdminID) {
    return await this.AdminRepo.findOneBy({ email : AdminID });
}


// * Feature 3 : Update admin profile

async updateprofile(data: AdminDTO): Promise<AdminEntity> {
    const { email, ...updateData } = data;
    // Find the admin profile that we want to update
    const admin = await this.AdminRepo.findOneBy({ email });
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    // Update the admin's profile with the provided data
    Object.assign(admin, updateData);
    // Save the updated admin entity
    const updatedadmin = await this.AdminRepo.save(admin);
    return admin;
  }
  // * Feature 4 : Update customer profile by id
   
  async UpdateProfileInfo(id: number, updated_data: CustomerUpdateDTO): Promise<CustomerEntity> {
    await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.customerRepo.findOneBy({customerid: id});
}

// * Feature 5 : Delete customer profile by id
DeleteAccount(id: number): any {
    this.customerRepo.delete(id);
    return {"Success":"Account Deleted Successfully"};
}

// * Feature 6: View Customer Profile
async getCustomerById(customerid) {
    const customer = await this.customerRepo.findOneBy( { customerid: customerid } );
                return (`
                *******-Hello Admin Welcome To My Profile-*******
                Customer ID: ${customer.customerid}
                First Name: ${customer.firstName}
                Last Name: ${customer.lastName}
                UserName: ${customer.username}
                UserName: ${customer.username}
                Date Of Birth: ${customer.dateOfBirth}
                Telephone Number: ${customer.PhoneNumber}
                Email: ${customer.email}
                Profile Picture: ${customer.profilePic}
                ###########--Thank You--##########
                `);

} 

                // House No: ${customer.address.Street}
                // Building No: ${customer.address.Building}
                // City: ${customer.address.City}
                // Postal Code: ${customer.address.ZIP}
                // Country: ${customer.address.Country}


async getAllOrders(): Promise<Order[]> {
    return this.orderRepo.find();
}
 // kon order ta kon customer er tar jonno
async getallOrders(OrderId):Promise<any> {
    return this.orderRepo.find({
        where:{customer:OrderId},
        relations: {
            customer: true,
            products: true,
        },
    });                 
}
// ekta product koto jon order korche ta dekhabe
async onePdoductAllOrders(ProductId):Promise<any> {
    return this.ProductsRepo.find({
        where:{id:ProductId},
        relations: {
            orders: true,
        },
    });                 
}

// ekta order kon customer er tar jonno
async customerorderss(id):Promise<Order[]>
{
    return this.orderRepo.find({
        where:{id:id},
        relations: {
            customer: true,
        },
    });                 
} 




// async ViewCustomerProfile(id: number): Promise<adminCustomerDTO> {
//     return this.customerRepo.findOneBy({customerid: id});
// }

   // Feature 2 : Search Customer by id

    //    getCustomerById(id:CustomerEntity, mydata:adminCustomerDTO): object {
    //     if(mydata != null)
    //         if(mydata.customerid == id.customerid)
            
    //             return mydata;
    //         else 
    //         console.log(id);
    //             return ({message: "Customer not found"})
    // }


    
    // geCustomerId(id:number): Promise<adminCustomerDTO> 
    //  {
    //     console.log(id);
    //    return this.customerRepo.findOneBy({customerid:id});
    // }

// * Feature 7 : View Customer Images
//Now Run this Query in Postman
async getimagebycustomerid(customerId:number) {
    const mydata:CustomerPicDTO =await this.customerRepo.findOneBy({ customerid:customerId});
    return  mydata.profilePic;
}

    // Feature 5 : Add Product
    addProduct(data: ProductEntity): object
    {
        return data;
    }

    // Feature 6 : Update Product
    updateProduct(data: ProductEntity): object
    {
        return data;
    }

    // Feature 7 : Delete Product
    deleteProduct(data: ProductEntity): object
    {
        return data;
    }
    // Feature 8 : Add Supplier
    addSupplier(data: SupplierEntity): object
    {
        return data;
    }
    // Feature 9 : Update Supplier
    updateSupplier(data: SupplierEntity): object
    {
        return data;
    }
    // Feature 10 : Delete Supplier
    deleteSupplier(data: SupplierEntity): object
    {
        return data;
    }



    // Feature 7 : Add Product

    async productadd(data: ProductDTO): Promise<ProductEntity> {
        const salt = await bcrypt.genSalt();
       return this.ProductsRepo.save(data);
    }
   
    // Feature 8 : Update Product
    async productupdate(id: number, updated_data: ProductDTO): Promise<ProductEntity> {
        await this.ProductsRepo.update(id, updated_data); // Where to Update , Updated Data
        return this.ProductsRepo.findOneBy({id: id});
    }

    // Feature 9 : Delete Product
    async productdelete(id: number): Promise<ProductEntity> {
        await this.ProductsRepo.delete(id);
        return this.ProductsRepo.findOneBy({id: id});
    }

    // Feature 10 : Add Supplier
    async supplieradd(data: SupplierEntity): Promise<SupplierEntity> {
        return this.SupplierRepo.save(data);
    }
    // * Feature 11 : Search a Product by id
    async getProductById(id: number): Promise<ProductEntity> {
        return this.ProductsRepo.findOneBy({id: id});
    }

    // * Feature 12 : Delete a Products by id
    async productdeletebyid(id: number): Promise<ProductEntity> {
        await this.ProductsRepo.delete(id);
        return this.ProductsRepo.findOneBy({id: id});
    }
        // // * Feature 3 : Update a Products by id
        // async productupdatebyid(id: number, updated_data: ProductDTO): Promise<ProductEntity> {


    
}