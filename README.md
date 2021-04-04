## Receipt backend API
Backend API server for receipt service

### Document
Check api details in [Receipt REST API](https://receipt-backend-api.herokuapp.com/)

### Spec
#### Authentication
- Authenticated by JWT
- Registration
- Login
  - Using username and password
  - Once successful, token will be sent as response
#### Tag
Login needed
- Get all tags of the current user
- Get single tag
- Create a tag
- Update the title of a tag
- Delete a tag (cascadingly delete all receipts of this tag)
#### Receipt
Login needed
- Get all receipts of the current user
  - Filter with tag
- Get single receipt
- Create a receipt
  - Upload a formatted file and create a new receipt
- Update the tag of a receipt
- Delete a receipt 