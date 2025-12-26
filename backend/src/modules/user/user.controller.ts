import { Body, Controller, Put } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthUser } from "decorator/auth-user.decorator";
import { RequireLoggedIn } from "guards/role-container";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserRequestDto } from "./dto/request/update-user.request.dto";
import { CommandBus } from "@nestjs/cqrs";
import { UpdateUser } from "./domain/update-user";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put("update-profile")
  @ApiOperation({ summary: "Update user profile information" })
  @ApiResponse({ status: 200, description: "Profile updated successfully." })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  @RequireLoggedIn()
  @ApiBearerAuth()
  async updateProfile(
    @AuthUser() userEntity: UserEntity,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    await this.commandBus.execute(
      UpdateUser.fromUpdateUserRequestDto(userEntity, updateUserRequestDto),
    );
  }
}
