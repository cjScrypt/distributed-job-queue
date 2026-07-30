import { IsObject, IsString } from "class-validator";

export class CreateJobDto {
  @IsString()
  handler: string;

  @IsObject()
  payload: Record<string, string>;
}
