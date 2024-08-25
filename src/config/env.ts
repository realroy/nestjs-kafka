import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const environmentVariablesSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .optional()
    .default('development'),

  PORT: z.coerce.number().optional().default(3000),

  KAFKA_BROKERS: z.string().transform((value) => value.split(',')),

  KAFKA_CLIENT_ID: z.string(),

  KAFKA_CONSUMER_GROUP_ID: z.string(),

  SWAGGER_DOC_VERSION: z.string().optional().default('1.0.0'),

  SWAGGER_PATH: z.string().optional().default('/docs'),
});

export class EnvirontmentVariables extends createZodDto(
  environmentVariablesSchema,
) {}

export type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>;

export const validate = environmentVariablesSchema.parse;
