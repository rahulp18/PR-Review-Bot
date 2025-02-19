import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  openAiApiKey: string;
}
