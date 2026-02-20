import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface UpiPaymentRequest {
    customerName: string;
    description: string;
    upiId: string;
    amount: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ServiceLocation {
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
export interface Booking {
    bookingId: string;
    owner?: Principal;
    name: string;
    description: string;
    isPaid: boolean;
    dateRequired: string;
    phoneNumber: string;
    typeOfWork: string;
    location: string;
}
export interface UserProfile {
    name: string;
    phoneNumber: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addServiceLocation(name: string, latitude: number, longitude: number): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(bookingId: string, name: string, phoneNumber: string, location: string, typeOfWork: string, dateRequired: string, description: string): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createUpiOrder(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllServiceLocations(): Promise<Array<ServiceLocation>>;
    getBooking(bookingId: string): Promise<Booking | null>;
    getBookingMetrics(): Promise<{
        pendingPayments: bigint;
        totalBookings: bigint;
        totalRevenue: bigint;
        paidBookings: bigint;
    }>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getSuperAdmin(): Promise<Principal | null>;
    getUpiBookingsCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    processUpiPayment(request: UpiPaymentRequest, successUrl: string, cancelUrl: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setSuperAdmin(newSuperAdmin: Principal): Promise<void>;
    submitContactForm(name: string, email: string, phoneNumber: string, message: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateBookingPaymentStatus(bookingId: string): Promise<void>;
}
