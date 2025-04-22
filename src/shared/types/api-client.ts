/**
 * Base API Response Type
 * @template T - The type of the response data
 */
export interface ApiResponse<T = unknown> {
    status: number; // HTTP status code
    success: boolean; // Indicates if the request was successful
    data?: T; // Response data (if any)
    error?: ApiError; // Error details (if any)
  }
  
  /**
   * API Error Response Type
   */
  export interface ApiError {
    code: number | null; // Error code (if applicable)
    message: string; // Description of the error
    errors?: Record<string, string>; // Validation errors (if applicable)
    exception?: ExceptionDetails; // Detailed exception information (if applicable)
  }
  
  /**
   * Exception Details Type
   * Contains detailed information about an internal server error.
   */
  export interface ExceptionDetails {
    exception: string; // Exception type
    message: string; // Exception message
    file: string; // File where the exception occurred
    line: number; // Line number where the exception occurred
    code: number; // Exception error code
  }
  
  /**
   * Unauthenticated Response Type
   * Represents a response when the user is not authenticated.
   */
  export type UnauthenticatedResponse = ApiResponse<null>;
  
  /**
   * Validation Error Response Type
   * Represents a response when request validation fails.
   */
  export type ValidationErrorResponse = ApiResponse<null>;
  
  /**
   * Pagination Information Type
   * Provides metadata about paginated results.
   */
  export interface Pagination<T> {
    data: T[]; // Array of items
    count: number; // Number of items on the current page
    total: number; // Total number of items
    perPage: number; // Items per page
    currentPage: number; // Current page number
    totalPages?: number; // Total number of pages
    links?: string[]; // Pagination links (if applicable)
  }
