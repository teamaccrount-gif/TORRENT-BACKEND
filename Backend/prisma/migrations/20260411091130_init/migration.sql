-- CreateTable
CREATE TABLE "Alarm" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "alarm" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "timestamp1" TIMESTAMP(3) NOT NULL,
    "timestamp2" TIMESTAMP(3),
    "acknowledgment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelemetryData" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "compressor" TEXT NOT NULL,
    "point" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "TelemetryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,
    "avg_shi" DOUBLE PRECISION,
    "online_stations" INTEGER,
    "fault_stations" INTEGER,
    "sales_today" DOUBLE PRECISION,
    "revenue_today" DOUBLE PRECISION,
    "total_stations" INTEGER,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,
    "avg_shi" DOUBLE PRECISION,
    "online_stations" INTEGER,
    "fault_stations" INTEGER,
    "sales_today" DOUBLE PRECISION,
    "revenue_today" DOUBLE PRECISION,
    "total_stations" INTEGER,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,
    "avg_shi" DOUBLE PRECISION,
    "online_stations" INTEGER,
    "fault_stations" INTEGER,
    "sales_today" DOUBLE PRECISION,
    "revenue_today" DOUBLE PRECISION,
    "total_stations" INTEGER,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cgs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,
    "avg_shi" DOUBLE PRECISION,
    "online_stations" INTEGER,
    "fault_stations" INTEGER,
    "sales_today" DOUBLE PRECISION,
    "revenue_today" DOUBLE PRECISION,
    "total_stations" INTEGER,

    CONSTRAINT "cgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compressor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "compressor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispenser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "dispenser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "png" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "png_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lcng" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "lcng_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "png" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "drs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industrial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "drs" TEXT NOT NULL,
    "png" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "industrial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commercial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "drs" TEXT NOT NULL,
    "png" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "commercial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domestic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "drs" TEXT NOT NULL,
    "png" TEXT NOT NULL,
    "cgs" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gas_in" DOUBLE PRECISION,
    "gas_out" DOUBLE PRECISION,

    CONSTRAINT "domestic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_access" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "regions" TEXT[],
    "areas" TEXT[],
    "stations" TEXT[],

    CONSTRAINT "user_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "failure_reason" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "device_type" TEXT,
    "login_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "request_id" TEXT,

    CONSTRAINT "login_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "email" TEXT,
    "role" TEXT,
    "endpoint" TEXT,
    "method" TEXT,
    "params" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "request_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "email" TEXT,
    "role" TEXT,
    "endpoint" TEXT,
    "method" TEXT,
    "ip_address" TEXT,
    "request_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "email" TEXT,
    "role" TEXT,
    "endpoint" TEXT,
    "method" TEXT,
    "error" TEXT,
    "ip_address" TEXT,
    "request_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Alarm_tag_timestamp2_idx" ON "Alarm"("tag", "timestamp2");

-- CreateIndex
CREATE INDEX "Alarm_timestamp1_idx" ON "Alarm"("timestamp1");

-- CreateIndex
CREATE UNIQUE INDEX "TelemetryData_tag_key" ON "TelemetryData"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "country_name_key" ON "country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "region_name_country_key" ON "region"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "area_name_region_key" ON "area"("name", "region");

-- CreateIndex
CREATE UNIQUE INDEX "cgs_name_area_key" ON "cgs"("name", "area");

-- CreateIndex
CREATE UNIQUE INDEX "station_name_cgs_key" ON "station"("name", "cgs");

-- CreateIndex
CREATE UNIQUE INDEX "compressor_name_station_key" ON "compressor"("name", "station");

-- CreateIndex
CREATE UNIQUE INDEX "dispenser_name_station_key" ON "dispenser"("name", "station");

-- CreateIndex
CREATE UNIQUE INDEX "device_name_station_key" ON "device"("name", "station");

-- CreateIndex
CREATE UNIQUE INDEX "png_name_cgs_key" ON "png"("name", "cgs");

-- CreateIndex
CREATE UNIQUE INDEX "lcng_name_cgs_key" ON "lcng"("name", "cgs");

-- CreateIndex
CREATE UNIQUE INDEX "drs_name_png_key" ON "drs"("name", "png");

-- CreateIndex
CREATE UNIQUE INDEX "industrial_name_drs_key" ON "industrial"("name", "drs");

-- CreateIndex
CREATE UNIQUE INDEX "commercial_name_drs_key" ON "commercial"("name", "drs");

-- CreateIndex
CREATE UNIQUE INDEX "domestic_name_drs_key" ON "domestic"("name", "drs");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_role_id_permission_id_key" ON "role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_access_user_id_key" ON "user_access"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "login_logs_email_idx" ON "login_logs"("email");

-- CreateIndex
CREATE INDEX "login_logs_login_at_idx" ON "login_logs"("login_at");

-- CreateIndex
CREATE INDEX "login_logs_ip_address_idx" ON "login_logs"("ip_address");

-- CreateIndex
CREATE INDEX "event_logs_email_idx" ON "event_logs"("email");

-- CreateIndex
CREATE INDEX "event_logs_created_at_idx" ON "event_logs"("created_at");

-- CreateIndex
CREATE INDEX "transaction_logs_email_idx" ON "transaction_logs"("email");

-- CreateIndex
CREATE INDEX "transaction_logs_created_at_idx" ON "transaction_logs"("created_at");

-- CreateIndex
CREATE INDEX "error_logs_email_idx" ON "error_logs"("email");

-- CreateIndex
CREATE INDEX "error_logs_created_at_idx" ON "error_logs"("created_at");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_access" ADD CONSTRAINT "user_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
