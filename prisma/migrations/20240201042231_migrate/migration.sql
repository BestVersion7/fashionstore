-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "id_token" TEXT,
    "provider" TEXT NOT NULL,
    "refresh_token" TEXT,
    "scope" TEXT,
    "session_state" TEXT,
    "token_type" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,

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
CREATE TABLE "CartInfo" (
    "cart_id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DECIMAL NOT NULL,
    "product_price" DECIMAL NOT NULL,
    "cookie_id" UUID NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "product_id" BIGINT NOT NULL,
    "price_id" BIGINT NOT NULL,

    CONSTRAINT "CartInfo_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "CookieInfo" (
    "cookie_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "payment_intent" TEXT,

    CONSTRAINT "CookieInfo_pkey" PRIMARY KEY ("cookie_id")
);

-- CreateTable
CREATE TABLE "OrderInfo" (
    "order_number" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_total" DECIMAL,
    "payment_intent" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cookie_id" UUID NOT NULL,
    "tracking_id" TEXT,

    CONSTRAINT "OrderInfo_pkey" PRIMARY KEY ("order_number")
);

-- CreateTable
CREATE TABLE "PriceInfo" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unit_amount" DECIMAL,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "price_id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,

    CONSTRAINT "PriceInfo_pkey" PRIMARY KEY ("price_id")
);

-- CreateTable
CREATE TABLE "ProductAvailabilityInfo" (
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "available_quantity" DECIMAL NOT NULL DEFAULT 0,
    "product_id" BIGINT NOT NULL,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "ProductAvailabilityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInfo" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "images" TEXT[],
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT true,
    "category" TEXT,
    "product_id" BIGSERIAL NOT NULL,
    "default_price" BIGINT,

    CONSTRAINT "ProductInfo_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductReviewInfo" (
    "review_id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_message" TEXT,
    "review_star" DECIMAL NOT NULL DEFAULT 5,
    "user_email" TEXT,
    "product_id" BIGINT,

    CONSTRAINT "ProductReviewInfo_pkey" PRIMARY KEY ("review_id")
);

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
CREATE UNIQUE INDEX "CookieInfo_cookie_id_key" ON "CookieInfo"("cookie_id");

-- CreateIndex
CREATE UNIQUE INDEX "CookieInfo_payment_intent_key" ON "CookieInfo"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "OrderInfo_cookie_id_key" ON "OrderInfo"("cookie_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAvailabilityInfo_product_id_key" ON "ProductAvailabilityInfo"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductInfo_name_key" ON "ProductInfo"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartInfo" ADD CONSTRAINT "CartInfo_cookie_id_fkey" FOREIGN KEY ("cookie_id") REFERENCES "CookieInfo"("cookie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartInfo" ADD CONSTRAINT "CartInfo_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "PriceInfo"("price_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartInfo" ADD CONSTRAINT "CartInfo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductInfo"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_cookie_id_fkey" FOREIGN KEY ("cookie_id") REFERENCES "CookieInfo"("cookie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceInfo" ADD CONSTRAINT "PriceInfo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductInfo"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAvailabilityInfo" ADD CONSTRAINT "ProductAvailabilityInfo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductInfo"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_default_price_fkey" FOREIGN KEY ("default_price") REFERENCES "PriceInfo"("price_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviewInfo" ADD CONSTRAINT "ProductReviewInfo_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
