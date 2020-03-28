#  API


Simple reponse schema.

{
  ok: true // false
  error:
}


1 - I need to connect to mongodb

-- user creation
1 - I need to create the user with the encrypted password
2 - Send email for verification
3 - 


-- user login
1- I take the email and password and verify match - make sure the email is verify
2- if match I set cookies and return basic user information
3 -if no match I send the appropriate error


-- user signout
1 - clean the cookie
