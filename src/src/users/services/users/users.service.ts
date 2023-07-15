import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  CreateVehicleParams,
  UpdateUserParams,
  CreateScheduleParams,
  CreateOrderParams,
  CreateMngOrderParams,
  UpdateProfileParams
} from '../../../utils/types';
import { Vehicle } from '../../../typeorm/entities/Vehicle';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { Order } from 'src/typeorm/entities/Order';
import { Mngorder } from 'src/typeorm/entities/ManagementOrder';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfile.dto';
import { SignInDto } from 'src/users/dtos/CreateSignIn.dto';



@Injectable()
export class UsersService {
  updateOrderStatus(orderId: number, status: string) {
    throw new Error('Method not implemented.');
  }
  updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    throw new Error('Method not implemented.');
  }
  trigger(arg0: string, arg1: string, arg2: { username: string; message: string; }) {
    throw new Error('Method not implemented.');
  }
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Vehicle) private  vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Mngorder) private mngorderRepository: Repository<Mngorder>,
    
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts', 'vehicles', 'schedules', 'orders', 'mngorders'] });
  }
//get user by id

async getUserById(id: number): Promise<User> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  return  user;
}




//get order by id

async getOrderById(id: number): Promise<Order> {
  const order = await this.orderRepository.findOneBy({id});

  if (!order) {
    throw new NotFoundException(`Order with ID ${id} not found.`);
  }

  return  order;
}

//get manage order by id


async getmngOrderById(id: number): Promise<Mngorder> {
  const mngorder = await this.mngorderRepository.findOneBy({id});

  if (!mngorder) {
    throw new NotFoundException(`Mang Order with ID ${id} not found.`);
  }

  return  mngorder;
}






  //signin
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  
async updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<void> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.userRepository.update(id, { ...updateUserDetails });
}

 

async updateUserProfile(id: number, updateProfileDetails: UpdateProfileParams): Promise<Profile> {
  const userProfile = await this.profileRepository.findOneBy({id});

  if (!userProfile) {
    throw new NotFoundException(`User profile with ID ${id} not found.`);
  }

  await this.profileRepository.update(id, { ...updateProfileDetails });

  return this.profileRepository.findOneBy({id});
}

//delete user
async deleteUser(id: number): Promise<void> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.userRepository.delete(id);
}



  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

//creating vehicle info
async createUserVehicle(
  id: number,
  createUserVehicleDetails: CreateVehicleParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'User not found. Cannot Add Vehicle Information',
      HttpStatus.BAD_REQUEST,
    );
  const newVehicle = this.vehicleRepository.create({
    ...createUserVehicleDetails,
    user,
  });
  return this.vehicleRepository.save(newVehicle);
}
  
//creatingSchedule
async createUserSchedule(
  id: number,
  createUserScheduleDetails:  CreateScheduleParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'User not found. Cannot Add Schedule',
      HttpStatus.BAD_REQUEST,
    );
  const newSchedule = this.scheduleRepository.create({
    ...createUserScheduleDetails,
    user,
  });
  return this.scheduleRepository.save(newSchedule);
}


//creating order to Show_Order -_-  
async createUserOrder(
  id: number,
  createUserOrderDetails:  CreateOrderParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'Deliveryman not found. Cannot Assign Order',
      HttpStatus.BAD_REQUEST,
    );
  const newOrder = this.orderRepository.create({
    ...createUserOrderDetails,
    user,
  });
  return this.orderRepository.save(newOrder);
}

//creating managementorder to show


async createMngOrder(
  id: number,
  createMngOrderDetails:  CreateMngOrderParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'Deliveryman not found. Cannot Assign Management Order',
      HttpStatus.BAD_REQUEST,
    );
  const newmngOrder = this.mngorderRepository.create({
    ...createMngOrderDetails,
    user,
  });
  return this.mngorderRepository.save(newmngOrder);
}





//signup

async signIn(signInDto: SignInDto): Promise<User> {
  const { email, password } = signInDto;

  const user = await this.userRepository.findOneBy({ email });

  if (!user || user.password !== password) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return user;
}


}



//out of constructor
//order status
@Injectable()
export class OrderStatusService {
  private orderStatuses: Record<number, string> = {};

  updateOrderStatus(orderId: number, status: string): void {
    if (!this.orderStatuses[orderId]) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    this.orderStatuses[orderId] = status;
  }
}