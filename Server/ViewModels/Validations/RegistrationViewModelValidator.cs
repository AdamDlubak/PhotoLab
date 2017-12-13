using FluentValidation;

namespace Server.ViewModels.Validations
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Pole email nie mo¿e byæ puste.");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Pole has³o nie mo¿e byæ puste.");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("Pole imiê nie mo¿e byæ puste.");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("Pole nazwisko nie mo¿e byæ puste.");       
        }
    }
}

