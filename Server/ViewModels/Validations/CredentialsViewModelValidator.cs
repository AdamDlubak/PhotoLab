using FluentValidation;

namespace Server.ViewModels.Validations
{
    public class CredentialsViewModelValidator : AbstractValidator<CredentialsViewModel>
    {
        public CredentialsViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Adres email nie mo�e by� pusty.");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Pole has�o nie mo�e by� puste.");
            RuleFor(vm => vm.Password).Length(6, 12).WithMessage("Has�o musi mie� od 6 do 12 znak�w.");        
        }
    }
}

