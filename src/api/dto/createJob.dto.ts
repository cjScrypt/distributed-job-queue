import { IsEnum, IsInt, IsObject, IsOptional, IsString, Min } from "class-validator";
import { JobHandler } from "../../worker/enums";

export class CreateJobDto {
  @IsEnum(JobHandler)
  type: JobHandler;

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
