import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  MYSQL_HOST: string;

  @IsString()
  MYSQL_USER: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;

  @IsString()
  MAGIC_PDF_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(`Config validation error:\n${errors.join('\n')}`);
  }

  return validatedConfig;
}
