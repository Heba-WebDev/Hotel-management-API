# Hotel Management API Documentation

NOTE: While migrating to typescript I faced an issue that I failed to debug even after hours of investigating. Whenever I try to import the routers to the app.ts file, the server shuts down with an import issue. However, I couldn't find any import issue (kept removing and adding but issue is still there). I did change all files to typescript, I hope that counts for something. Sorry!

## _Introduction_

This is a Hotel Management API! It allows to manage rooms and room types of a hotel.

## _Routes_

### Users

## Endpoint: /api/v1/users

---

--
`    POST /api/v1/users/register
   `

- User signs up with username, email and password.

--
`    POST /api/v1/users/login
   `

- User logs in with email and password.

--
`    DELETE /api/v1/users/
   `

- User deletes their account or an admin can delete a user account. An user id is required. Protected route (ONLY ADMIN)

### Rooms

## Endpoint: /api/v1/rooms

---

--
`    GET /api/v1/rooms
   `

- Fetches all rooms | Optional query parameters to filter the rooms by name, roomType and price.

--
`    GET /api/v1/rooms/:id
   `

- Fetches a single room by ID.

--
`    POST /api/v1/rooms/
   `

- Creates a new room. Required: name, roomType and price. Protected route (ONLY ADMIN)

--
`    PATCH /api/v1/rooms/
   `

- Updates a room. Required: id. Optional: name, roomType or price. Protected route (ONLY ADMIN)

--
`    DELETE /api/v1/rooms/
   `

- Deletes a room. Required: id.

## Endpoint: /api/v1/roomsTypes

---

--
`    GET /api/v1/roomsTypes
   `

- Fetches all types of rooms.

--
`    POST /api/v1/roomsTypes
   `

- Creates a new type of room. Only possible options to create are: ["Single", "Double", "Triple", "Studio", "Suite", "Presidential Suite"]. Protected route (ONLY ADMIN)

## License

MIT
