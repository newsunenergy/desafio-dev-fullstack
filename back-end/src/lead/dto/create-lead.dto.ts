import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString
} from "class-validator";

export class CreateLeadDto {
	@IsNotEmpty()
	@IsString()
	fullName: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsPhoneNumber('BR')
	phoneNumber: string;
}
