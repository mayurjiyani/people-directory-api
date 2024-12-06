# People directory API

A NestJS-based REST API for managing people and their contact information, including emails, phone numbers, and addresses.

## Features

-   CRUD operations for people directory
-   Support for multiple email addresses per person
-   Support for multiple phone numbers per person
-   Support for multiple addresses per person
-   Soft delete functionality
-   Bulk delete/restore operations
-   Search functionality
-   Swagger API documentation

### Available Endpoints

-   `POST /people` - Create a new person
-   `GET /people` - Get all people (with optional search parameter)
-   `GET /people/:id` - Get a specific person by ID
-   `PUT /people/:id` - Update a person
-   `DELETE /people/:id` - Soft delete a person
-   `DELETE /people/bulk-delete` - Bulk delete/restore people

## Prerequisites

-   Node.js (v14 or higher)
-   MySQL database
-   npm or yarn package manager

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables (e.g., `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`).
4. Start the server: `npm start`.

## License

This project is licensed under the MIT License.
