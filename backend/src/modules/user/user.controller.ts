import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRequestDto } from "./dto/user-request.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  create(@Body() createUserDto: UserRequestDto) {
    return this.userService.create(UserRequestDto.toUserRequest(createUserDto));
  }
}
