CREATE TABLE IF NOT EXISTS "Consumo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consumoForaPontaEmKWH" numeric NOT NULL,
	"mesDoConsumo" timestamp NOT NULL,
	"unidadeId" uuid NOT NULL,
	CONSTRAINT "Consumo_unidadeId_mesDoConsumo_unique" UNIQUE("unidadeId","mesDoConsumo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lead" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nomeCompleto" text NOT NULL,
	"email" text NOT NULL,
	"telefone" text NOT NULL,
	CONSTRAINT "Lead_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Unidade" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"codigoDaUnidadeConsumidora" text NOT NULL,
	"modeloFasico" text NOT NULL,
	"enquadramento" text NOT NULL,
	"leadId" uuid NOT NULL,
	CONSTRAINT "Unidade_codigoDaUnidadeConsumidora_unique" UNIQUE("codigoDaUnidadeConsumidora")
);
