using FluentValidation.Attributes;
using Server.ViewModels.Validations;

namespace Server.ViewModels
{
  [Validator(typeof(RegistrationViewModelValidator))]
  public class RegistrationViewModel
  {
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Level { get; set; }
  }
}
