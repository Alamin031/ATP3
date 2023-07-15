import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { CreateVehicleDto } from 'src/users/dtos/create-vehicle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CreateScheduleDto } from 'src/users/dtos/CreateSchedule.dto';
import { CreateOrderDto } from 'src/users/dtos/CreateOrder.dto';
import { CreateMngOrderDto } from 'src/users/dtos/CreateMngOrder.Dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfile.dto';
import { OrderStatusUpdateDto } from 'src/users/dtos/OrderStatusUpdate.dto';
import { SignInDto } from 'src/users/dtos/CreateSignIn.dto';



@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
//get user by id

@Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }


//get order by id
@Get(':id/order')
  async getOrderById(@Param('id') id: number) {
    return this.userService.getOrderById(id);
  }

//get mng order by id
@Get(':id/mngorder')
  async getmngOrderById(@Param('id') id: number) {
    return this.userService.getmngOrderById(id);
  }

//create user
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
//update username pass email by id
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

//updateUserProfile By Id
@Put(':id/profiles')
@UsePipes(ValidationPipe)
async updateProfileById(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProfileDto: UpdateProfileDto,
) {
  await this.userService.updateUserProfile(id, updateProfileDto);
}


//delete user by id
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
//create profile
  @Post(':id/profiles')
  @UsePipes(ValidationPipe)
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }
//users post by id
  @Post(':id/posts')
  @UsePipes(ValidationPipe)
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }



  
//create vehicle by id



  @Post(':id/vehicles')
  @UsePipes(ValidationPipe)
  createUserVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserVehicleDto: CreateVehicleDto,
  ) {
    return this.userService.createUserVehicle(id, createUserVehicleDto);
  }


//file upload



@Post(('/upload'))
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 30000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

//schedule


@Post(':id/schedules')
@UsePipes(ValidationPipe)
createUserSchedule(
  @Param('id', ParseIntPipe) id: number,
  @Body() createScheduleDto: CreateScheduleDto,
) {
  return this.userService.createUserSchedule(id, createScheduleDto);
}

//create order
@Post(':id/orders')
@UsePipes(ValidationPipe)
createUserOrder(
  @Param('id', ParseIntPipe) id: number,
  @Body() createOrderDto: CreateOrderDto,
) {
  return this.userService.createUserOrder(id, createOrderDto);
}

//management_order
@Post(':id/mngorders')
@UsePipes(ValidationPipe)
createMngOrder(
  @Param('id', ParseIntPipe) id: number,
  @Body() createMngOrderDto: CreateMngOrderDto,
) {
  return this.userService.createMngOrder(id, createMngOrderDto);
}


//order status

@Put(':id/status')
  updateOrderStatus(
    @Param('id') id: number,
    @Body() orderStatusUpdateDto: OrderStatusUpdateDto,
  ) {
    return this.userService.updateOrderStatus(id, orderStatusUpdateDto.status);
  }


//signin
@Post('signin')
@UsePipes(ValidationPipe)
async signIn(@Body() signInDto: SignInDto) {
  return this.userService.signIn(signInDto);
}


}
