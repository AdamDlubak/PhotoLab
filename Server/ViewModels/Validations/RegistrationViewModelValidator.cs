using FluentValidation;

namespace Server.ViewModels.Validations
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Pole email nie mo�e by� puste.");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Pole has�o nie mo�e by� puste.");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("Pole imi� nie mo�e by� puste.");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("Pole nazwisko nie mo�e by� puste.");       
        }
    }
}

