
using FluentValidation.Attributes;
using Server.ViewModels.Validations;

 [Validator(typeof(CredentialsViewModelValidator))]
public class CredentialsViewModel  
{
        public string Email { get; set; }
        public string Password { get; set; }        
}