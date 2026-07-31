import { IsInt, IsObject, IsOptional, IsString, Min } from "class-validator";

export class CreateJobDto {
  @IsString()
  handler: string;

  @IsString()
  type: string;

  @IsObject()
  payload: Record<string, string>;

  @IsOptional()
  @IsString()
  idempotencyKey?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  delaySeconds?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;
}
