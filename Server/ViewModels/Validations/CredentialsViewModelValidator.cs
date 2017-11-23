using FluentValidation;

namespace Server.ViewModels.Validations
{
    public class CredentialsViewModelValidator : AbstractValidator<CredentialsViewModel>
    {
        public CredentialsViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Adres email nie mo¿e byæ pusty.");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Pole has³o nie mo¿e byæ puste.");
            RuleFor(vm => vm.Password).Length(6, 12).WithMessage("Has³o musi mieæ od 6 do 12 znaków.");        
        }
    }
}

