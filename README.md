# Hotel Management API Documentation
## _Introduction_
This is a Hotel Management API! It allows to manage rooms and room types of a hotel.

## _Routes_

### Rooms 
## Endpoint: /api/v1/rooms
---
--
    ```
    GET /api/v1/rooms
    ```

- Fetches all rooms | Optional query parameters to filter the rooms by name, roomType and price.

--
    ```
    GET /api/v1/rooms/:id
    ```

- Fetches a single room by ID.

--
    ```
    POST /api/v1/rooms/
    ```

- Creates a new room. Required: name, roomType and price.

--
    ```
    PATCH /api/v1/rooms/
    ```

- Updates a room. Required: id. Optional: name, roomType or price.

--
    ```
    DELETE /api/v1/rooms/
    ```

- Deletes a room. Required: id.


## Endpoint: /api/v1/roomsTypes
---
--
    ```
    GET /api/v1/roomsTypes
    ```

- Fetches all types of rooms.

--
    ```
    POST /api/v1/roomsTypes
    ```

- Creates a new type of room. Only possible options to create are: ["Single", "Double", "Triple", "Studio", "Suite", "Presidential Suite"].




## License

MIT



