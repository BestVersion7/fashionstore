-- CreateTable
CREATE TABLE "CartInfo" (
    "cart_id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DECIMAL NOT NULL,
    "price_id" TEXT NOT NULL,
    "product_id" TEXT,
    "product_price" DECIMAL NOT NULL,
    "cookie_id" UUID NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CartInfo_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "CookieInfo" (
    "cookie_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" BIGINT,
    "payment_intent" TEXT,

    CONSTRAINT "CookieInfo_pkey" PRIMARY KEY ("cookie_id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR DEFAULT 'ciao',
    "password" VARCHAR DEFAULT 'ster',

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "article_id" SERIAL NOT NULL,
    "article_date" DATE DEFAULT CURRENT_TIMESTAMP,
    "article_image_small" VARCHAR(300),
    "article_image" VARCHAR(300),
    "article_title" VARCHAR(100),
    "article_post" TEXT,
    "article_public" BOOLEAN,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "booking_date" TIMESTAMPTZ(6) NOT NULL,
    "booking_time" SMALLINT,
    "doctor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "comment_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "comment_user_name" VARCHAR(100),
    "comment_body" VARCHAR(500),
    "comment_user_image" VARCHAR(150),
    "article_id" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "commenttb" (
    "comment_id" SERIAL NOT NULL,
    "comment_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "comment_user_name" VARCHAR(100),
    "comment_body" VARCHAR(250),
    "drink_id" INTEGER,

    CONSTRAINT "commenttb_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "doctor_id" SERIAL NOT NULL,
    "doctor_first_name" VARCHAR(30),
    "doctor_last_name" VARCHAR(30),
    "doctor_email" VARCHAR(100) NOT NULL,
    "doctor_description" VARCHAR(10000),
    "doctor_image" VARCHAR(500),
    "doctor_phone" INTEGER,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "drinkdb" (
    "drink_id" SERIAL NOT NULL,
    "drink_name" VARCHAR(50),
    "drink_group" VARCHAR(30) DEFAULT 'margaritas',
    "drink_url" VARCHAR(500),
    "drink_ingredients" TEXT,
    "drink_directions" TEXT,
    "drink_price" INTEGER DEFAULT 20,

    CONSTRAINT "drinkdb_pkey" PRIMARY KEY ("drink_id")
);

-- CreateTable
CREATE TABLE "ordertb" (
    "orderid" SERIAL NOT NULL,
    "productid" INTEGER NOT NULL,
    "quantity" SMALLINT,

    CONSTRAINT "ordertb_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "patient" (
    "patient_id" SERIAL NOT NULL,
    "patient_first_name" VARCHAR(30),
    "patient_last_name" VARCHAR(30),
    "patient_email" VARCHAR(100) NOT NULL,
    "patient_phone" INTEGER,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "reel" (
    "reel_id" SERIAL NOT NULL,
    "reel_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "reel_image" VARCHAR(300),
    "reel_category" VARCHAR(80) DEFAULT 'Outdoor',
    "reel_public" BOOLEAN,
    "reel_video" BOOLEAN,
    "reel_video_thumbnail" VARCHAR(150),

    CONSTRAINT "reel_pkey" PRIMARY KEY ("reel_id")
);

-- CreateTable
CREATE TABLE "storedb" (
    "id" SERIAL NOT NULL,
    "pname" VARCHAR(50),
    "price" VARCHAR(4),
    "pictureurl" VARCHAR(500),

    CONSTRAINT "storedb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey" (
    "survey_id" SERIAL NOT NULL,
    "survey_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "survey_name" VARCHAR(100),
    "survey_email" VARCHAR(200),
    "survey_choice" VARCHAR(100) NOT NULL,

    CONSTRAINT "survey_pkey" PRIMARY KEY ("survey_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ScrapeProductName" (
    "product_id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_name" TEXT NOT NULL,

    CONSTRAINT "scraptable_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ScrapeProductPrice" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_name" TEXT,
    "product_price" DECIMAL,

    CONSTRAINT "ScrapeProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CookieInfo_cookie_id_key" ON "CookieInfo"("cookie_id");

-- CreateIndex
CREATE UNIQUE INDEX "CookieInfo_payment_intent_key" ON "CookieInfo"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_username_key" ON "UserInfo"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ordertb_productid_key" ON "ordertb"("productid");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "scraptable_product_name_key" ON "ScrapeProductName"("product_name");

-- AddForeignKey
ALTER TABLE "CartInfo" ADD CONSTRAINT "CartInfo_cookie_id_fkey" FOREIGN KEY ("cookie_id") REFERENCES "CookieInfo"("cookie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_1" FOREIGN KEY ("article_id") REFERENCES "blog"("article_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commenttb" ADD CONSTRAINT "fk_1" FOREIGN KEY ("drink_id") REFERENCES "drinkdb"("drink_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordertb" ADD CONSTRAINT "ordertb_productid_fkey" FOREIGN KEY ("productid") REFERENCES "storedb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapeProductPrice" ADD CONSTRAINT "ScrapeProductPrice_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "ScrapeProductName"("product_name") ON DELETE CASCADE ON UPDATE CASCADE;
