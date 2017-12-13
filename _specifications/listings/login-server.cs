// Post api/auth/login
[HttpPost("login")]
public async Task<IActionResult> Post([FromBody] CredVM cred)
{
  if (!ModelState.IsValid) { return BadRequest(ModelState); }
  var identity = await GetClaimsIdentity(cred.Email,
  cred.Password);

  if (identity == null) { 
  return BadRequest(Errors.AddErrorToModelState("login_failure", 
  "Wrong mail or password", ModelState)); }

  // Serialize and return the response
  var user = _context.Users.SingleOrDefault(x => x.Email == cred.Email);
  var response = new
  {
    auth_token=await jwtFactory.GenerateEncodedToken(cred.Email, identity),
    expires_in=(int)jwtOptions.ValidFor.TotalSeconds,
    user_id=user.Id
  };
  return new OkObjectResult(response);
}