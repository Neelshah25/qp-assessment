# Project Setup and Testing Instructions

## Steps to Run the Project:

1. **Run the Migrations**
2. **Create `.env` file from `.env-example`**
3. **Install dependencies**:  
   Run `npm install`
4. **To Run the server**:  
   Run `npm run dev`

---

## Testing:

Run the below commands in **PowerShell**:

### 1. Create Users:

- **Admin User**:

```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body '{ "username": "Neel", "password":"password123" , "role":"admin"}'
```

- **Normal User**:

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body '{ "username": "QuestionPro", "password":"password123" , "role":"user"}'
```

### 2. Login and Note down the Tokens

- **Admin Login**:

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body '{ "username": "Neel", "password":"password123" }'
```

- **Normal User Login**:

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body '{ "username": "QuestionPro", "password":"password123"}'
```

### 3. Add a New Grocery Item

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json"; "Authorization" = "admin-token" } `
     -Body '{ "name": "Milk", "price":1.2 , "quantity":50}'
```

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json"; "Authorization" = "admin-token" } `
     -Body '{ "name": "Cheese", "price":2 , "quantity":50}'
```

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json"; "Authorization" = "admin-token" } `
     -Body '{ "name": "Ice Cream", "price":1.8 , "quantity":50}'
```

### 4. Get All Grocery Item

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries" `
     -Method Get `
     -Headers @{ "Authorization" = "admin-token" }
```

### 5. Get Grocery Item By Id

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries/1" `
     -Method Get `
     -Headers @{ "Authorization" = "admin-token" }
```

### 6. Update a Grocery Item

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries/1" `
     -Method Put `
     -Headers @{ "Content-Type" = "application/json"; "Authorization" = "admin-token" } `
     -Body '{ "name": "Milk", "price":1.5 , "quantity":50}'
```

### 7. Delete a Grocery Item

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/admin/groceries/1" `
     -Method Delete `
     -Headers @{ "Authorization" = "admin-token" }
```

## User Routes

### 8. Get All Available Grocery Item

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/groceries" `
     -Method Get `
     -Headers @{ "Authorization" = "user-token" }
```

### 9. Place an Order

```powershell
 Invoke-RestMethod -Uri "http://localhost:3000/api/orders" `
     -Method Post `
     -Headers @{ "Content-Type" = "application/json"; "Authorization" = "user-token" } `
     -Body '{ "userId":2, "items": [{ "groceryId" : 1, "quantity" : 5 }, { "groceryId" : 1, "quantity" : 10 }] }'
```

### Key points:
- Each section is clearly separated by a title and relevant commands.
- Instructions to run the commands are given along with placeholders for the token.
- The format is Markdown-friendly, with proper use of code blocks for PowerShell commands.

